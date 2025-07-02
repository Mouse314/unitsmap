import Geometry from "./engine/Geometry/geometry";
import Projection from "./engine/Geometry/projection";
import Vector from "./engine/Geometry/vector";
import addMouseListeners from "./engine/InputEvents/mouseListener";
import Polygon from "./engine/Render/Figures/polygon";
import Rect from "./engine/Render/Figures/rect";
import Objects from "./engine/Render/objects";
import Ruler from "./engine/Render/ruler";
import update from "./engine/Render/update";

const canvas = document.getElementById('drawingField') as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
const container = canvas.parentElement as Element;
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

const projection = new Projection(center, horizontalRange, verticalRange, canvas, backgroundSize);

const appGeometry = new Geometry(canvas, ctx, projection, objects);

const ruler = new Ruler(appGeometry, 10);

window.addEventListener('resize', resizeCanvas);

update(appGeometry, ruler);

addMouseListeners(appGeometry, ruler);