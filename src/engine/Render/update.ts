import Geometry from "../Geometry/geometry";
import Ruler from "./ruler";

export default function update(geometry : Geometry, ruler : Ruler, isZooming : boolean = false) {
    const {canvas, ctx, proj, objects} = geometry;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    objects.drawAll(ctx, proj);
    if(isZooming) ruler.draw(isZooming);
    else ruler.draw();
}