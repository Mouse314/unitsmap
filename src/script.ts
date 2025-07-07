import Geometry from "./engine/Geometry/geometry";
import Projection from "./engine/Geometry/projection";
import Vector from "./engine/Geometry/vector";
import Cursor from "./engine/InputEvents/cursor";
import addMouseListeners from "./engine/InputEvents/mouseListener";
import Color from "./engine/Render/color";
import Polygon from "./engine/Render/Figures/polygon";
import Rect from "./engine/Render/Figures/rect";
import Objects from "./engine/Render/objects";
import Ruler from "./engine/Render/ruler";
import update from "./engine/Render/update";

function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const canvas = document.getElementById('drawingField') as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
const container = canvas.parentElement as Element;
const objects = new Objects();

const figures = [
    new Rect(new Vector(0, 0), .1, .1, "blue", 2, new Color("rgba(125, 153, 24, 0.5)")),
    new Rect(new Vector(.31, .41), .1, .1, "green", 1, new Color("rgba(10, 49, 133, 0.5)")),
    new Polygon([new Vector(.2, .2),
                 new Vector(.2, .3),
                 new Vector(.3, .4),], "rose", 3, "magenta"),
];

// for(let i = 0; i < 10; i++) {
//     for (let j = 0; j < 10; j++) {
//         figures.push(new Rect(new Vector(i / 10, j / 10), .1, .1, "white", 2, 
//         new Color(`rgba(${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${Math.random()})`)));
//     }
// }

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

update(appGeometry, ruler, false, null, new Cursor());

addMouseListeners(appGeometry, ruler);