import Geometry from "./Geometry/Geometry.js";
import Projection from "./Geometry/projection.js";
import Vector from "./Geometry/Vector.js";
import addMouseListeners from "./InputEvents/MouseListener.js";
import Polygon from "./Render/Figures/Polygon.js";
import Rect from "./Render/Figures/Rect.js";
import Objects from "./Render/Objects.js";
import Ruler from "./Render/Ruler.js";
import update from "./Render/update.js";

const canvas = document.getElementById('drawingField');
const ctx = canvas.getContext("2d");
const container = canvas.parentElement;
const objects = new Objects();

const figures = [
    new Rect(new Vector(.1, .2), .1, .1, "pink", 2, "blue"),
    new Rect(new Vector(.3, .4), .1, .1, "green", 1, "red"),
    new Polygon([new Vector(.2, .2),
                 new Vector(.2, .3),
                 new Vector(.3, .4),], "rose", 3, "magenta"),
];

objects.addFigures(figures);

function resizeCanvas() {
    const computedStyle = getComputedStyle(container);
    const width = parseInt(computedStyle.width, 10);
    const height = parseInt(computedStyle.height, 10);

    canvas.width = width;
    canvas.height = height;
}

resizeCanvas();

const center = new Vector(0, 0);
const screen_ratio = canvas.height / canvas.width;
const horizontalRange = 2;
const verticalRange = horizontalRange * screen_ratio;
const backgroundSize = 2000;

const projection = new Projection(center, horizontalRange, verticalRange, canvas.width, canvas.height, backgroundSize);

const appGeometry = new Geometry(canvas, ctx, projection, objects);

const ruler = new Ruler(appGeometry, 10);

window.addEventListener('resize', resizeCanvas);

update(appGeometry, ruler);

addMouseListeners(appGeometry, ruler);