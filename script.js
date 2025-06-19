import Projection from "./Geometry/projection.js";
import Vector from "./Geometry/Vector.js";
import { drawFigures } from "./Render/drawFigures.js";
import Rect from "./Render/Figures/Rect.js";

const canvas = document.getElementById('drawingField');
const ctx = canvas.getContext("2d");
const container = canvas.parentElement;

const figures = [
    new Rect(new Vector(.1, .2), 1, 1),
    new Rect(new Vector(.3, .4), 1, 1),
];

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

window.addEventListener('resize', resizeCanvas);

function update() {
    drawFigures(figures, ctx, projection);
}

update();