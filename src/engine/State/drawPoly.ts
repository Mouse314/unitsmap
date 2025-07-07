import Geometry from "../Geometry/geometry";
import Vector from "../Geometry/vector";
import Cursor from "../InputEvents/cursor";
import Mouse from "../InputEvents/mouse";

export default class DrawPoly {
    points : Vector[] = [];
    cursor : Cursor;
    geometry : Geometry;
    mouse : Mouse;

    constructor(geometry : Geometry, mouse : Mouse, cursor : Cursor) {
        this.geometry = geometry;
        this.mouse = mouse;
        this.cursor = cursor;
    }

    public mouseMove() {
        
    }

    public mouseClick() {

    }
}