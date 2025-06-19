import Vector from "../../Geometry/Vector.js";
import Figure from "./Figure.js";

export default class Rect extends Figure {
    constructor (centerWorld, width, height) {
        super(centerWorld);
        this.width = width;
        this.height = height;
    }

    draw (ctx, color, proj) {
        const startX = this.center.x - this.width / 2;
        const startY = this.center.y - this.height / 2;

        const screenPoint = proj.worldToScreenPoint(new Vector(startX, startY));
        console.log(screenPoint);

        ctx.fillStyle = color;
        
        ctx.fillRect(screenPoint.x, screenPoint.y, this.width, this.height);
    }
}