import update from "../Render/update.js";

export default function drag(geometry, mouse, ruler) {
    const [canvas, ctx, proj, objects] = geometry.destruct();
    if (!mouse.isClicked) {
        
    }

    // Перемещение карты
    proj.centerPoint.x -= mouse.deltaX / canvas.width * proj.horizontalRange;
    proj.centerPoint.y += mouse.deltaY / canvas.height * proj.verticalRange;

    proj.setBackgroundPos(canvas);
    update(geometry, ruler);
}