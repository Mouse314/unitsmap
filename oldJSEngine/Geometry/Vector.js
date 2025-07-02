export default class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    lenght() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    distance(point) {
        return Math.sqrt(Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2));
    }

    getOpposite() {
        return new Vector(-this.x, -this.y);
    }

    add(vector) {
        return new Vector(this.x + vector.x, this.y + vector.y);
    }

    sub(vector) {
        return new Vector(this.x - vector.x, this.y - vector.y);
    }

    mul(number) {
        return new Vector(this.x * number, this.y * number);
    }

    lerp(vector, t) {
        return this.add(vector.sub(this).mul(t))
    }

    copy() {
        return new Vector(this.x, this.y);
    }
}