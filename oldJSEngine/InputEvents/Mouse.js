export default class Mouse {
    constructor() {
        this.x = -1;
        this.y = -1;
        this.prevX = -1;
        this.prevY = -1;
        this.deltaX = 0;
        this.deltaY = 0;
        this.isClicked = false;
    }

    updatePosition(x, y) {
        this.x = x;
        this.y = y;

        if (this.isClicked) {
            this.deltaX = x - this.prevX;
            this.deltaY = y - this.prevY;
        }

        this.prevX = x;
        this.prevY = y;
    }

    updateDelta(deltaX, deltaY) {
        this.deltaX = deltaX;
        this.deltaY = deltaY;
    }

    update(x, y, deltaX, deltaY) {
        this.x = x;
        this.y = y;
        this.deltaX = deltaX;
        this.deltaY = deltaY;
    }
    
    setClicked(state) {
        this.isClicked = state;
    }
}