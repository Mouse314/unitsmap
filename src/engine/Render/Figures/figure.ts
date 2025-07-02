import Projection from "../../Geometry/projection";
import Vector from "../../Geometry/vector";

export default class Figure {
    public center : Vector;

    constructor(center : Vector) {
        this.center = center;
    }

    public draw(ctx : CanvasRenderingContext2D, proj : Projection) {
        throw new Error("Метод не реализован в подклассах");
    }
}