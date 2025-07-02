import Objects from "../Render/objects";
import Projection from "./projection";

export default class Geometry {
    canvas : HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    proj: Projection;
    objects: Objects;

    constructor(canvas : HTMLCanvasElement, ctx : CanvasRenderingContext2D, proj : Projection, objects : any) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.proj = proj;
        this.objects = objects;
    }

    public destruct() {
        return [this.canvas, this.ctx, this.proj, this.objects];
    }

    public copy() {
        return new Geometry(
            this.canvas,
            this.ctx,
            this.proj.copy(),
            this.objects
        );
    }
}