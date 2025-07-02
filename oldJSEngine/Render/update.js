export default function update(geometry, ruler, isZooming = false) {
    const [canvas, ctx, proj, objects] = geometry.destruct();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    objects.drawAll(ctx, proj);
    if(isZooming) ruler.draw(isZooming);
    else ruler.draw();
}