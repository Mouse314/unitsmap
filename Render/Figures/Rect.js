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
        const startWorldPoint = new Vector(this.center.x - this.width / 2, this.center.y - this.height / 2);

        const screenPointStart = proj.worldToScreenPoint(startWorldPoint);
        const screenPoint1 = proj.worldToScreenPoint(startWorldPoint.add(new Vector(this.width, 0)));
        const screenPoint2 = proj.worldToScreenPoint(startWorldPoint.add(new Vector(this.width, -this.height)));
        const screenPoint3 = proj.worldToScreenPoint(startWorldPoint.sub(new Vector(0, this.height)));

        ctx.fillStyle = this.fillColor;
        ctx.strokeStyle = this.borderColor;
        ctx.lineWidth = this.borderWidth;

        ctx.beginPath();
        ctx.moveTo(screenPointStart.x, screenPointStart.y);
        ctx.lineTo(screenPoint1.x, screenPoint1.y);
        ctx.lineTo(screenPoint2.x, screenPoint2.y);
        ctx.lineTo(screenPoint3.x, screenPoint3.y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
}