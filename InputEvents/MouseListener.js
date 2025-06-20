import Vector from "../Geometry/Vector.js";
import update from "../Render/update.js";
import drag from "../State/mapDrag.js";
import Mouse from "./Mouse.js";

export default function addMouseListeners(geometry) {
    const [canvas, ctx, proj, objects] = geometry.destruct();

    let isClicked = false;

    const mouse = new Mouse();

    canvas.addEventListener("mousedown", (e) => {
        mouse.updatePosition(e.offsetX, e.offsetY);

        isClicked = true;
    });

    canvas.addEventListener("mousemove", (e) => {
        mouse.updatePosition(e.offsetX, e.offsetY);

        // Перетаскивание карты
        if(isClicked) drag(geometry, mouse);
    });

    canvas.addEventListener("mouseup", (e) => {
        isClicked = false;
    });

    const zoomIntencity = 0.1;
    canvas.addEventListener("wheel",  (e) => {
        e.preventDefault();

        const cursorWorld = proj.screenToWorldPoint(new Vector(e.offsetX, e.offsetY));

        let deltaX = (cursorWorld.x - proj.centerPoint.x) * zoomIntencity;
        let deltaY = (cursorWorld.y - proj.centerPoint.y) * zoomIntencity;


        if (e.deltaY < 0){
            // Вниз
            proj.horizontalRange -= proj.horizontalRange * zoomIntencity;
            proj.verticalRange -= proj.verticalRange * zoomIntencity;
            proj.centerPoint.x += deltaX;
            proj.centerPoint.y += deltaY;

        } else {
            // Вверх
            proj.horizontalRange += proj.horizontalRange * zoomIntencity;
            proj.verticalRange += proj.verticalRange * zoomIntencity;
            proj.centerPoint.x -= deltaX;
            proj.centerPoint.y -= deltaY;
        }

        proj.setBackgroundPos(canvas);
        update(geometry);
    });
}