import Projection from "../../Geometry/projection";
import Vector from "../../Geometry/vector";
import Color from "../color";
import Figure from "./figure";

export default class Rect extends Figure {
    width : number;
    height : number;
    borderColor : string;
    borderWidth : number;
    fillColor : Color;

    constructor (centerWorld : Vector, width : number, height : number, borderColor : string, borderWidth : number, fillColor : Color) {
        super(centerWorld);
        this.width = width;
        this.height = height;
        this.borderColor = borderColor;
        this.borderWidth = borderWidth;
        this.fillColor = fillColor;
    }

    draw (ctx : CanvasRenderingContext2D, proj : Projection) {
        const startWorldPoint = new Vector(this.center.x - this.width / 2, this.center.y + this.height / 2);

        const screenPointStart = proj.worldToScreenPoint(startWorldPoint);
        const screenPoint1 = proj.worldToScreenPoint(startWorldPoint.add(new Vector(this.width, 0)));
        const screenPoint2 = proj.worldToScreenPoint(startWorldPoint.add(new Vector(this.width, -this.height)));
        const screenPoint3 = proj.worldToScreenPoint(startWorldPoint.sub(new Vector(0, this.height)));
        
        ctx.strokeStyle = this.borderColor;
        ctx.fillStyle = this.isSelected ? this.fillColor.getOpaque().getName() : this.fillColor.getName();
        ctx.lineWidth = this.isSelected ? this.borderWidth * 2 : this.borderWidth;

        ctx.beginPath();
        ctx.moveTo(screenPointStart.x, screenPointStart.y);
        ctx.lineTo(screenPoint1.x, screenPoint1.y);
        ctx.lineTo(screenPoint2.x, screenPoint2.y);
        ctx.lineTo(screenPoint3.x, screenPoint3.y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    public checkSelected(mousePosition: Vector, proj : Projection): boolean {

        const mouseWorld = proj.screenToWorldPoint(mousePosition);

        if ((mouseWorld.x >= (this.center.x - this.width / 2) && mouseWorld.x <= (this.center.x + this.width / 2)) && 
            (mouseWorld.y >= (this.center.y - this.height / 2) && mouseWorld.y <= (this.center.y + this.height / 2))) {

                this.isSelected = true;
                return true;
            }
        else this.isSelected = false;
        return false;
    }

    public checkEdgeBound(proj : Projection, mousePos : Vector, boundRadius : number): [Vector, string] | null {

        // Привязка к углам
        const startWorldPoint = new Vector(this.center.x - this.width / 2, this.center.y + this.height / 2);
        const points = [
            proj.worldToScreenPoint(startWorldPoint),
            proj.worldToScreenPoint(startWorldPoint.add(new Vector(this.width, 0))),
            proj.worldToScreenPoint(startWorldPoint.add(new Vector(this.width, -this.height))),
            proj.worldToScreenPoint(startWorldPoint.sub(new Vector(0, this.height)))
        ];

        for (let point of points) {
            if (point.distance(mousePos) <= boundRadius) return [point, "corner"];
        }

        // Привязка к рёбрам
        for (let i = 0; i < 4; i++) {
            const projPoint = Projection.getProjectionPoint(points[i], points[(i + 1) % 4], mousePos);
            if (projPoint.distance(mousePos) <= boundRadius) return [projPoint, "edge"];
        }

        return null;
    }
}