import Projection from "../Geometry/projection";
import Figure from "./Figures/figure";

export default class Objects {
    figures : Array<Figure>;

    constructor() {
        this.figures = [];
    }

    addFigures(figures : Array<Figure>) {
        this.figures = [...this.figures, ...figures];
    }

    drawAll(ctx : CanvasRenderingContext2D, proj : Projection) {
        this.figures.forEach(figure => {
            figure.draw(ctx, proj);
        });
    }
}