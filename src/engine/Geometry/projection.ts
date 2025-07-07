import Vector from "./vector";

export default class Projection {
    centerPoint : Vector;
    horizontalRange: number;
    verticalRange: number;
    canvas: HTMLCanvasElement;
    backgroundSize : number;


    constructor(centerPoint : Vector, horizontalRange : number, verticalRange : number, canvas : HTMLCanvasElement, backgroundSize : number) {

        this.centerPoint = centerPoint;
        this.horizontalRange = horizontalRange; 
        this.verticalRange = verticalRange;
        this.canvas = canvas;
        this.backgroundSize = backgroundSize;
    }

    public worldToScreenPoint(worldPoint : Vector) : Vector {
        const x = (worldPoint.x - (this.centerPoint.x - this.horizontalRange / 2)) / this.horizontalRange * this.canvas.width;
        const y = this.canvas.height - (worldPoint.y - (this.centerPoint.y - this.verticalRange / 2)) / this.verticalRange * this.canvas.height;
        return new Vector(x, y);
    }
    
    public screenToWorldPoint(screenPoint : Vector) : Vector {
        const x = (screenPoint.x / this.canvas.width) * this.horizontalRange + this.centerPoint.x - this.horizontalRange / 2;
        const y = (1 - screenPoint.y / this.canvas.height) * this.verticalRange + this.centerPoint.y - this.verticalRange / 2;
        return new Vector(x, y);
    }
    
    setBackgroundPos() : void {
        this.canvas.style.backgroundSize = this.backgroundSize * 2 / this.horizontalRange + "px";
    
        const pictureCenter = this.worldToScreenPoint(new Vector(0, 0));
    
        this.canvas.style.backgroundPositionX = pictureCenter.x + "px";
        this.canvas.style.backgroundPositionY = pictureCenter.y + "px";
    }

    public copy() : Projection {
        return new Projection(
            this.centerPoint.copy(),
            this.horizontalRange,
            this.verticalRange,
            this.canvas,
            this.backgroundSize
        );
    }

    static getProjectionPoint(segmentStart : Vector, segmentEnd : Vector, point : Vector) : Vector {
        const x1 = segmentStart.x, y1 = segmentStart.y;
        const x2 = segmentEnd.x, y2 = segmentEnd.y;

        const px = point.x, py = point.y;

        const dx = x2 - x1;
        const dy = y2 - y1;

        const tdx = px - x1;
        const tdy = py - y1;

        const lenSquared = dx * dx + dy * dy;

        if (lenSquared === 0) {
            return new Vector(x1, y1);
        }

        const t = (tdx * dx + tdy * dy) / lenSquared;

        const clampedT = Math.max(0, Math.min(1, t));

        const projX = x1 + clampedT * dx;
        const projY = y1 + clampedT * dy;

        return new Vector(projX, projY);
    }
}