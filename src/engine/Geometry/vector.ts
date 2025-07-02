export default class Vector {
    x : number;
    y : number;

    public constructor(x : number, y : number) {
        this.x = x;
        this.y = y;
    }

    public lenght() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public distance(point : Vector) {
        return Math.sqrt(Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2));
    }

    public getOpposite() {
        return new Vector(-this.x, -this.y);
    }

    public add(vector : Vector) {
        return new Vector(this.x + vector.x, this.y + vector.y);
    }

    public sub(vector : Vector) {
        return new Vector(this.x - vector.x, this.y - vector.y);
    }

    public mul(number : number) {
        return new Vector(this.x * number, this.y * number);
    }

    public lerp(vector : Vector, t : number) {
        return this.add(vector.sub(this).mul(t))
    }

    copy() {
        return new Vector(this.x, this.y);
    }
}