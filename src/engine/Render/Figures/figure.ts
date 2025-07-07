import Projection from "../../Geometry/projection";
import Vector from "../../Geometry/vector";

export default class Figure {
    public center : Vector;
    public isSelected : boolean = false;

    constructor(center : Vector) {
        this.center = center;
    }

    public draw(ctx : CanvasRenderingContext2D, proj : Projection) {
        throw new Error("Метод не реализован в подклассах");
    }

    public checkSelected(mousePosition : Vector, proj : Projection) : boolean {
        throw new Error("Метод не реализован в подклассах");
    }

    public checkEdgeBound(proj : Projection, mousePos : Vector, boundRadius : number) : [Vector, string] | null {
        throw new Error("Метод не реализован в подклассах");
    }
}