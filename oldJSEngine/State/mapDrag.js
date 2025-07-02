import update from "../oldJSEngine/Render/update.js";

export default function drag(geometry, mouse, ruler) {
    if (!mouse.isClicked) {
        return;
    }

    const [canvas, ctx, proj, objects] = geometry.destruct();

    // Перемещение карты
    proj.centerPoint.x -= mouse.deltaX / canvas.width * proj.horizontalRange;
    proj.centerPoint.y += mouse.deltaY / canvas.height * proj.verticalRange;

    proj.setBackgroundPos(canvas);
    update(geometry, ruler);
}