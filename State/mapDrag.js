import update from "../Render/update.js";

export default function drag(geometry, mouse) {
    const [canvas, ctx, proj, objects] = geometry.destruct();

    proj.centerPoint.x -= mouse.deltaX / canvas.width * proj.horizontalRange;
    proj.centerPoint.y += mouse.deltaY / canvas.height * proj.verticalRange;

    proj.setBackgroundPos(canvas);
    update(geometry);
}