import Projection from "../Geometry/projection";
import Vector from "../Geometry/vector";
import Mouse from "../InputEvents/mouse";
import Figure from "./Figures/figure";
import update from "./update";

export default class Objects {
    figures : Figure[];
    prevSelected : boolean = false;

    constructor() {
        this.figures = [];
    }

    addFigures(figures : Array<Figure>) {
        this.figures = [...this.figures, ...figures];
    }

    checkSelections(proj : Projection, mouse : Mouse | null) : boolean {
        let anySelections : boolean = false;
        if(mouse) for (let figure of this.figures) {
            if (figure.checkSelected(new Vector(mouse.x, mouse.y), proj)) {
                anySelections = true;
                break;
            }
        }
        
        anySelections = anySelections || (anySelections !== this.prevSelected);
        this.prevSelected = anySelections;

        return anySelections;
    }

    drawAll(ctx : CanvasRenderingContext2D, proj : Projection, mouse : Mouse | null) {
        this.figures.forEach(figure => {
            if(mouse) figure.checkSelected(new Vector(mouse.x, mouse.y), proj);
            figure.draw(ctx, proj);
        });
    }
}