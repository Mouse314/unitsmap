import Geometry from "../Geometry/geometry";
import Mouse from "../InputEvents/mouse";
import Ruler from "../Render/ruler";
import update from "../Render/update";

export default function drag(geometry : Geometry, mouse : Mouse, ruler : Ruler) : void {
    if (!mouse.isClicked) {
        return;
    }

    const {canvas, ctx, proj, objects} = geometry;

    // Перемещение карты
    proj.centerPoint.x -= mouse.deltaX / canvas.width * proj.horizontalRange;
    proj.centerPoint.y += mouse.deltaY / canvas.height * proj.verticalRange;

    proj.setBackgroundPos();
    update(geometry, ruler);
}