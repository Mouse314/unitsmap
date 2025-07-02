export default class Mouse {
    x : number;
    y : number;
    prevX : number;
    prevY : number;
    deltaX : number;
    deltaY : number;
    isClicked : boolean;

    constructor() {
        this.x = -1;
        this.y = -1;
        this.prevX = -1;
        this.prevY = -1;
        this.deltaX = 0;
        this.deltaY = 0;
        this.isClicked = false;
    }

    public updatePosition(x : number, y : number) : void {
        this.x = x;
        this.y = y;

        if (this.isClicked) {
            this.deltaX = x - this.prevX;
            this.deltaY = y - this.prevY;
        }

        this.prevX = x;
        this.prevY = y;
    }

    public updateDelta(deltaX : number, deltaY : number) : void {
        this.deltaX = deltaX;
        this.deltaY = deltaY;
    }

    public update(x : number, y : number, deltaX : number, deltaY : number) : void {
        this.x = x;
        this.y = y;
        this.deltaX = deltaX;
        this.deltaY = deltaY;
    }
    
    public setClicked(state : boolean) : void {
        this.isClicked = state;
    }
}