import Vector from "../Geometry/Vector.js";
import update from "../Render/update.js";
import drag from "../../State/mapDrag.js";
import TransformGeometry from "../../State/transform.js";
import Mouse from "./Mouse.js";

export default function addMouseListeners(geometry, ruler) {
    const [canvas, ctx, proj, objects] = geometry.destruct();

    const mouse = new Mouse();
    const transform = new TransformGeometry(100, ruler);

    canvas.addEventListener("mousedown", (e) => {
        mouse.updatePosition(e.offsetX, e.offsetY);

        mouse.setClicked(true);
    });

    canvas.addEventListener("mousemove", (e) => {
        mouse.updatePosition(e.offsetX, e.offsetY);

        // Перетаскивание карты
        drag(geometry, mouse, ruler);
    });

    canvas.addEventListener("mouseup", (e) => {
        mouse.setClicked(false);
    });

    // Зуммирование
    const zoomIntencity = 0.1;
    canvas.addEventListener("wheel",  (e) => {
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

        proj.setBackgroundPos(canvas);
        update(geometry, ruler);
    });
}