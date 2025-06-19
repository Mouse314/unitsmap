import Vector from "./Vector.js";

export default class Projection {
    constructor(centerPoint, horizontalRange, verticalRange, canvasWidth, canvasHeight, backgroundSize) {
        this.centerPoint = centerPoint;
        this.horizontalRange = horizontalRange; 
        this.verticalRange = verticalRange;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.backgroundSize = backgroundSize;
    }

    worldToScreenPoint(worldPoint) {
        const x = (worldPoint.x - (this.centerPoint.x - this.horizontalRange / 2)) / this.horizontalRange * this.canvasWidth;
        const y = this.canvasHeight - (worldPoint.y - (this.centerPoint.y - this.verticalRange / 2)) / this.verticalRange * this.canvasHeight;
        return new Vector(x, y);
    }
    
    screenToWorldPoint(screenPoint) {
        const x = (screenPoint.x / this.canvasWidth) * this.horizontalRange + this.centerPoint.x - this.horizontalRange / 2;
        const y = (1 - screenPoint.y / this.canvasHeight) * this.verticalRange + this.centerPoint.y - this.verticalRange / 2;
        return [x, y];
    }
    
    setBackgroundPos(canvas) {
        canvas.style.backgroundSize = this.backgroundSize * 2 / this.horizontalRange + "px";
    
        picture_center = worldToScreenPoint(new Vector(0, 0));
    
        canvas.style.backgroundPositionX = picture_center.x + "px";
        canvas.style.backgroundPositionY = picture_center.y + "px";
    }
}
