export function drawFigures(figures, ctx, proj) {
    figures.forEach(figure => {
        figure.draw(ctx, "green", proj);
    });
}