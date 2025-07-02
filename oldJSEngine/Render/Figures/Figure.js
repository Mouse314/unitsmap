export default class Figure {
    constructor(center) {
        this.center = center;
    }

    draw() {
        throw new Error("Метод не реализован в подклассах");
    }
}