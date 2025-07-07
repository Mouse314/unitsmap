import Projection from "../../Geometry/projection";
import Vector from "../../Geometry/vector";
import Figure from "./figure";

export default class Polygon extends Figure {
    vertices : Array<Vector>;
    borderColor : string;
    borderWidth : number;
    fillColor : string;

    constructor (vertices : Array<Vector>, borderColor : string, borderWidth : number, fillColor : string) {
        super(new Vector(1, 1));
        this.vertices = vertices;
        this.borderColor = borderColor;
        this.borderWidth = borderWidth;
        this.fillColor = fillColor;
    }

    draw (ctx : CanvasRenderingContext2D, proj : Projection) {
        if (this.vertices.length == 0) return null; 

        ctx.beginPath();

        const screenPoint = proj.worldToScreenPoint(this.vertices[0]);
        ctx.moveTo(screenPoint.x, screenPoint.y);

        this.vertices.forEach((vertex, ind) => {
            const screenPoint = proj.worldToScreenPoint(vertex);
            ctx.lineTo(screenPoint.x, screenPoint.y);
        });

        ctx.closePath();

        ctx.fillStyle = this.fillColor;
        ctx.fill();

        ctx.strokeStyle = this.borderColor;
        ctx.lineWidth = this.borderWidth;
        ctx.stroke();
    }

    public checkSelected(mousePosition: Vector, proj: Projection): boolean {
        this.isSelected = false;
        return false;
    }

    public checkEdgeBound(proj: Projection, mousePos: Vector, boundRadius: number): [Vector, string] | null {
        const points = this.vertices.map(v => proj.worldToScreenPoint(v));

        // Привязка к углам
        for (let point of points) {
            if (point.distance(mousePos) <= boundRadius) return [point, "corner"];
        }

        // Привязка к рёбрам
        for (let i = 0; i < points.length; i++) {
            const projPoint = Projection.getProjectionPoint(points[i], points[(i + 1) % points.length], mousePos);
            if (projPoint.distance(mousePos) <= boundRadius) return [projPoint, "edge"];
        }

        return null;
    }
}