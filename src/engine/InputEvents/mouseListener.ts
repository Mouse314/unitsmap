import Geometry from "../Geometry/geometry";
import Vector from "../Geometry/vector";
import Ruler from "../Render/ruler";
import update from "../Render/update";
import drag from "../State/mapDrag";
import TransformGeometry from "../State/transform";
import Cursor from "./cursor";
import Mouse from "./mouse";

export default function addMouseListeners(geometry : Geometry, ruler : Ruler) {
    const {canvas, ctx, proj, objects} = geometry;

    const mouse = new Mouse();
    const transform = new TransformGeometry(100, ruler);
    const cursor = new Cursor();

    canvas.addEventListener("mousedown", (e : MouseEvent) => {
        mouse.updatePosition(e.offsetX, e.offsetY);

        mouse.setClicked(true);
    });

    canvas.addEventListener("mousemove", (e : MouseEvent) => {
        mouse.updatePosition(e.offsetX, e.offsetY);

        // Перетаскивание карты
        if (mouse.isClicked) drag(geometry, mouse, ruler, cursor);
        else update(geometry, ruler, false, mouse, cursor);
    });

    canvas.addEventListener("mouseup", (e : MouseEvent) => {
        mouse.setClicked(false);
    });

    // Зуммирование
    const zoomIntencity = 0.1;
    canvas.addEventListener("wheel",  (e : WheelEvent) => {
        e.preventDefault();

        const newGeometry = geometry.copy();

        const cursorWorld = newGeometry.proj.screenToWorldPoint(new Vector(e.offsetX, e.offsetY));

        let deltaX = (cursorWorld.x - newGeometry.proj.centerPoint.x) * zoomIntencity;
        let deltaY = (cursorWorld.y - newGeometry.proj.centerPoint.y) * zoomIntencity;

        if (e.deltaY < 0){
            // Вниз
            newGeometry.proj.horizontalRange -= newGeometry.proj.horizontalRange * zoomIntencity;
            newGeometry.proj.verticalRange -= newGeometry.proj.verticalRange * zoomIntencity;
            newGeometry.proj.centerPoint.x += deltaX;
            newGeometry.proj.centerPoint.y += deltaY;

        } else {
            // Вверх
            newGeometry.proj.horizontalRange += newGeometry.proj.horizontalRange * zoomIntencity;
            newGeometry.proj.verticalRange += newGeometry.proj.verticalRange * zoomIntencity;
            newGeometry.proj.centerPoint.x -= deltaX;
            newGeometry.proj.centerPoint.y -= deltaY;
        }

        transform.animate(geometry, newGeometry);

        geometry = newGeometry;
        ruler.geometry = newGeometry;

        proj.setBackgroundPos();
        update(geometry, ruler, false, mouse, cursor);
    });
}