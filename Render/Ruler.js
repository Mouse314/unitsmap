import Vector from "../Geometry/Vector.js";

export default class Ruler {
    constructor(geometry) {
        this.geometry = geometry;
    }

    draw() {
        const [canvas, ctx, proj, objects] = this.geometry.destruct();

        const cornerPoint = proj.screenToWorldPoint(new Vector(0, canvas.height));

        const verticalPoints = [];
        const horizontalPoints = [];

        for (let i = 1; i < 4; i++) {
            verticalPoints.push(proj.screenToWorldPoint(new Vector(0, canvas.height * i / 4)));
            horizontalPoints.push(proj.screenToWorldPoint(new Vector(canvas.width * i / 4, canvas.height)));
        }

        ctx.strokeStyle = "white";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, canvas.height);
        ctx.lineTo(canvas.width, canvas.height);
        ctx.stroke();

        ctx.font = "20px Arial";

        ctx.fillText(cornerPoint.x.toFixed(3) + ", " + cornerPoint.y.toFixed(3), 15, canvas.height - 15)

        for (let i = 1; i < 4; i++) {
            // Вертикальные
            const y = canvas.height * i / 4;
            ctx.moveTo(0, y);
            ctx.lineTo(10, y);
            ctx.stroke();
            ctx.fillText(verticalPoints[i - 1].y.toFixed(3), 15, y)

            // Горизонтальные
            const x = canvas.width * i / 4;
            ctx.moveTo(x, canvas.height);
            ctx.lineTo(x, canvas.height - 10);
            ctx.stroke();
            ctx.fillText(horizontalPoints[i - 1].x.toFixed(3), x, canvas.height - 15)
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