import Vector from "../../Geometry/Vector.js";
import Figure from "./Figure.js";

export default class Rect extends Figure {
    constructor (centerWorld, width, height, borderColor, borderWidth, fillColor) {
        super(centerWorld);
        this.width = width;
        this.height = height;
        this.borderColor = borderColor;
        this.borderWidth = borderWidth;
        this.fillColor = fillColor;
    }

    draw (ctx, proj) {
        const startX = this.center.x - this.width / 2;
        const startY = this.center.y - this.height / 2;

        const screenPoint = proj.worldToScreenPoint(new Vector(startX, startY));

        ctx.fillStyle = this.fillColor;
        ctx.fillRect(screenPoint.x, screenPoint.y, this.width, this.height);

        ctx.strokeStyle = this.borderColor;
        ctx.lineWidth = this.borderWidth;
        ctx.strokeRect(screenPoint.x, screenPoint.y, this.width, this.height);
    }
}