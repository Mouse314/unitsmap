import Geometry from "../Geometry/geometry";
import Vector from "../Geometry/vector";

export default class Ruler {
    geometry : Geometry;
    pointsAmount : number;
    power: number;
    aspect : number;
    verticalPoints : Array<Vector>;
    horizontalPoints : Array<Vector>;

    constructor(geometry : Geometry, pointsAmount : number) {
        this.geometry = geometry;
        this.pointsAmount = pointsAmount;
        this.power = 0;
        this.aspect = 0;
        this.verticalPoints = [];
        this.horizontalPoints = [];
        this.recalculateAspect(pointsAmount);
    }

    public draw(isZooming = false) : void {
        const {canvas, ctx, proj, objects} = this.geometry;

        if (isZooming) {
            this.recalculateAspect(this.pointsAmount);
        }

        ctx.strokeStyle = "white";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, canvas.height);
        ctx.lineTo(canvas.width, canvas.height);
        ctx.stroke();

        ctx.font = "20px Arial";

        ctx.fillText("0", 15, canvas.height - 15)

        for (let i = this.pointsAmount; i >= 1; i--) {
            // Вертикальные
            ctx.moveTo(0, this.verticalPoints[i - 1].y);
            ctx.lineTo(10, this.verticalPoints[i - 1].y);
            ctx.stroke();
            ctx.fillText((this.aspect * i).toFixed(Math.max(this.power, 0)), 15, this.verticalPoints[i - 1].y);

            // Горизонтальные
            ctx.moveTo(this.horizontalPoints[i - 1].x, canvas.height);
            ctx.lineTo(this.horizontalPoints[i - 1].x, canvas.height - 10);
            ctx.stroke();
            ctx.fillText((this.aspect * i).toFixed(Math.max(this.power, 0)), this.horizontalPoints[i - 1].x, canvas.height - 15);
        }
    }

    public recalculateAspect(pointsAmount : number) {
        const {canvas, ctx, proj, objects} = this.geometry;

        const cornerPoint = proj.screenToWorldPoint(new Vector(0, canvas.height));

        const probeX = cornerPoint.add(new Vector(1, 0));
        const linePointX = proj.worldToScreenPoint(probeX);
        const power = Math.ceil(Math.log((linePointX.x - cornerPoint.x) / canvas.width) / Math.LN10);
        const aspect = Math.pow(10, -power);

        this.power = power;
        this.aspect = aspect;

        this.verticalPoints = [];
        this.horizontalPoints = [];

        for (let i = 1; i < pointsAmount + 1; i++) {
            this.verticalPoints.push(proj.worldToScreenPoint(cornerPoint.add(new Vector(0, aspect * i))));
            this.horizontalPoints.push(proj.worldToScreenPoint(cornerPoint.add(new Vector(aspect * i, 0))));
        }
    }

    public drawLineLenght(line : Array<Vector>) : void {
        const dx = line[0].x - line[1].x;
        const dy = line[0].y - line[1].y;

        const length = Math.sqrt(dx * dx - dy * dy);

        const screenPoint = this.geometry.proj.worldToScreenPoint(line[1]).add(new Vector(15, 15));

        this.geometry.ctx.font = "15px Arial";
        this.geometry.ctx.fillText(`Длина сегмента: ${length.toFixed(2)}`, screenPoint.x, screenPoint.y);
    }
}