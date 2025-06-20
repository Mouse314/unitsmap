export default class Geometry {
    constructor(canvas, ctx, proj, objects) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.proj = proj;
        this.objects = objects;
    }

    destruct() {
        return [this.canvas, this.ctx, this.proj, this.objects];
    }
}