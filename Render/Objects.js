export default class Objects {
    constructor() {
        this.figures = [];
    }

    addFigures(figures) {
        this.figures = [...this.figures, ...figures];
    }

    drawAll(ctx, proj) {
        this.figures.forEach(figure => {
            figure.draw(ctx, proj);
        });
    }
}