export default class Color {

    name : string;
    r : number = 255;
    g : number = 255;
    b : number = 255;
    alpha : number = 1;

    constructor (color : string) {
        this.name = color;
        this.parseColorsFromString(color);
    }

    public getName() {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.alpha})`
    };

    public getOpaque() {
        let newColor = new Color(this.getName());
        newColor.alpha = 1;
        return newColor;
    }

    public parseColorsFromString(color : string) {
        const components = color.split("(")[1].split(")")[0].split(",");

        this.r = parseInt(components[0]);
        this.g = parseInt(components[1]);
        this.b = parseInt(components[2]);
        (components.length > 3) ? this.alpha = parseFloat(components[3]) : this.alpha = 1;
    }
}