import Geometry from "../Geometry/geometry";
import Vector from "../Geometry/vector";
import Cursor from "../InputEvents/cursor";
import Mouse from "../InputEvents/mouse";
import Color from "./color";
import Ruler from "./ruler";

export default function update(geometry : Geometry, ruler : Ruler, isZooming : boolean = false, mouse : Mouse | null, cursor : Cursor) {
    const {canvas, ctx, proj, objects} = geometry;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    objects.drawAll(ctx, proj, mouse);
    if(isZooming) ruler.draw(isZooming);
    else ruler.draw();

    if (mouse) cursor.drawCursor(geometry, new Vector(mouse.x, mouse.y), objects);
}