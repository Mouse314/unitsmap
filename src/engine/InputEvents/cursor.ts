import Geometry from "../Geometry/geometry";
import Projection from "../Geometry/projection";
import Vector from "../Geometry/vector";
import Color from "../Render/color";
import Figure from "../Render/Figures/figure";
import Objects from "../Render/objects";

export default class Cursor {
    selectedObject : Figure | null;
    isAxisBinding : boolean = true;
    isEdgeBinding : boolean = true;

    color = "rgb(4, 4, 149)";

    public constructor () {
        this.selectedObject = null;
    }

    public drawCursor(geometry : Geometry, mousePosition : Vector, objects : Objects) {
        // const position = this.getPointPosition(geometry.proj, mousePosition, objects);
        const position = this.getLinePosition(geometry.proj.worldToScreenPoint(new Vector(0, 0)), mousePosition)[0];
        geometry.ctx.beginPath();
        geometry.ctx.fillStyle = this.color;
        geometry.ctx.arc(position.x, position.y, 10, 0, 2 * Math.PI);
        geometry.ctx.fill();
    }

    public setSelectedObject (object : Figure) {
        this.selectedObject = object;
    }

    public getPointPosition(proj : Projection, mousePosition : Vector, objects : Objects) : Vector {
        if (this.isEdgeBinding) {
            for (let figure of objects.figures) {
                const boundPoint = figure.checkEdgeBound(proj, mousePosition, 10);
                if(boundPoint) {
                    if (boundPoint[1] === "corner") {
                        this.color = "rgb(211, 79, 2)";
                    }
                    else {
                        this.color = "rgb(91, 189, 12)";
                    }
                    return boundPoint[0];
                }
            }
            this.color = "rgb(4, 4, 149)"
            return mousePosition;
        }
        else return mousePosition;
    }
    
    public getLinePosition(startPoint : Vector, currentPoint : Vector) : [Vector, string] {
        if (this.isAxisBinding) {
            const angle = Math.atan2(currentPoint.y - startPoint.y, currentPoint.x - startPoint.x);
            
            // Вправо
            if (Math.abs(angle) < Math.PI / 4) return [new Vector(currentPoint.x, startPoint.y), "right"];

            // Вверх
            if (Math.abs(angle + Math.PI / 2) < Math.PI / 4) return [new Vector(startPoint.x, currentPoint.y), "up"];

            // Влево
            if (Math.abs(Math.abs(angle) - Math.PI) < Math.PI / 4) return [new Vector(currentPoint.x, startPoint.y), "left"];

            // Вниз
            if (Math.abs(angle - Math.PI / 2) < Math.PI / 4) return [new Vector(startPoint.x, currentPoint.y), "down"];

            return [currentPoint, "none"];
        }
        else return [currentPoint, "none"];
    }
}