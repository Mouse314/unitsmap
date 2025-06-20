export default function update(geometry) {
    const [canvas, ctx, proj, objects] = geometry.destruct();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    objects.drawAll(ctx, proj);
}