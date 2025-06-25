import Vector from "../Geometry/Vector.js";

export default class Ruler {
    constructor(geometry, pointsAmount) {
        this.geometry = geometry;
        this.pointsAmount = pointsAmount;
        this.power = 0;
        this.aspect = 0;
        this.verticalPoints = [];
        this.horizontalPoints = [];
        this.recalculateAspect(pointsAmount);
    }

    draw(isZooming = false) {
        const [canvas, ctx, proj, objects] = this.geometry.destruct();

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

    recalculateAspect(pointsAmount) {
        const [canvas, ctx, proj, objects] = this.geometry.destruct();

        const cornerPoint = proj.screenToWorldPoint(new Vector(0, canvas.height));

        const probeX = cornerPoint.add(new Vector(1, 0));
        const linePointX = proj.worldToScreenPoint(probeX);
        const power = Math.ceil(Math.log10((linePointX.x - cornerPoint.x) / canvas.width));
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

    drawLineLenght(line) {
        const dx = line[0].x - line[1].x;
        const dy = line[0].y - line[1].y;

        const length = Math.sqrt(dx * dx - dy * dy);

        const screenPoint = proj.worldToScreenPoint(line[1]).add(new Vector(15, 15));

        ctx.font = "15px Arial";
        ctx.fillText(`Длина сегмента: ${length.toFixed(2)}`, screenPoint.x, screenPoint.y);
    }
}