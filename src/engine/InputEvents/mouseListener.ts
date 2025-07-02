import Geometry from "../Geometry/geometry";
import Vector from "../Geometry/vector";
import Ruler from "../Render/ruler";
import update from "../Render/update";
import drag from "../State/mapDrag";
import TransformGeometry from "../State/transform";
import Mouse from "./mouse";

export default function addMouseListeners(geometry : Geometry, ruler : Ruler) {
    const {canvas, ctx, proj, objects} = geometry;

    const mouse = new Mouse();
    const transform = new TransformGeometry(100, ruler);

    canvas.addEventListener("mousedown", (e : MouseEvent) => {
        mouse.updatePosition(e.offsetX, e.offsetY);

        mouse.setClicked(true);
    });

    canvas.addEventListener("mousemove", (e : MouseEvent) => {
        mouse.updatePosition(e.offsetX, e.offsetY);

        // Перетаскивание карты
        drag(geometry, mouse, ruler);
    });

    canvas.addEventListener("mouseup", (e : MouseEvent) => {
        mouse.setClicked(false);
    });

    // Зуммирование
    const zoomIntencity = 0.1;
    canvas.addEventListener("wheel",  (e : WheelEvent) => {
        e.preventDefault();

        const cursorWorld = proj.screenToWorldPoint(new Vector(e.offsetX, e.offsetY));

        let deltaX = (cursorWorld.x - proj.centerPoint.x) * zoomIntencity;
        let deltaY = (cursorWorld.y - proj.centerPoint.y) * zoomIntencity;

        const newGeometry = geometry.copy();

        if (e.deltaY < 0){
            // Вниз
            newGeometry.proj.horizontalRange -= proj.horizontalRange * zoomIntencity;
            newGeometry.proj.verticalRange -= proj.verticalRange * zoomIntencity;
            newGeometry.proj.centerPoint.x += deltaX;
            newGeometry.proj.centerPoint.y += deltaY;

        } else {
            // Вверх
            newGeometry.proj.horizontalRange += proj.horizontalRange * zoomIntencity;
            newGeometry.proj.verticalRange += proj.verticalRange * zoomIntencity;
            newGeometry.proj.centerPoint.x -= deltaX;
            newGeometry.proj.centerPoint.y -= deltaY;
        }

        transform.animate(geometry, newGeometry);

        geometry = newGeometry;
        ruler.geometry = newGeometry;

        proj.setBackgroundPos();
        update(geometry, ruler);
    });
}