import Geometry from "../Geometry/geometry";
import Cursor from "../InputEvents/cursor";
import Ruler from "../Render/ruler";
import update from "../Render/update";

export default class TransformGeometry {
    startTime : number | null;
    duration : number;
    oldGeometry : Geometry | null;
    newGeometry : Geometry | null;
    ruler : Ruler | null;
    currentGeometry : Geometry | null;
    isAnimating : boolean;

    constructor(duration : number, ruler : Ruler) {
        this.startTime = null;
        this.duration = duration;
        this.oldGeometry = null;
        this.newGeometry = null;
        this.ruler = ruler;
        this.currentGeometry = null;

        this.isAnimating = false;
    }

    public animate(oldGeometry : Geometry, newGeometry : Geometry) : void {
        if (this.isAnimating) {
            // this.oldGeometry = oldGeometry;
            this.newGeometry = newGeometry;
            // this.startTime = null;
        }
        else {
            this.oldGeometry = oldGeometry;
            this.newGeometry = newGeometry;
            this.currentGeometry = oldGeometry.copy();
            this.isAnimating = true;
            requestAnimationFrame(this.animateGeometry.bind(this));
        }
    }

    animateGeometry(currentTime : number) {
        if (!this.startTime) this.startTime = currentTime;
        const elapsedTime = currentTime - this.startTime;
        const progress = Math.min(elapsedTime / this.duration, 1); // t ∈ [0, 1]

        // Линейная интерполяция (LERP)
        const deltaTime = progress;

        if (this.currentGeometry && this.oldGeometry && this.newGeometry) {
            this.currentGeometry.proj.centerPoint = this.oldGeometry.proj.centerPoint.lerp(this.newGeometry.proj.centerPoint, deltaTime);
            this.currentGeometry.proj.horizontalRange = this.lerp(this.oldGeometry.proj.horizontalRange, this.newGeometry.proj.horizontalRange, deltaTime);
            this.currentGeometry.proj.verticalRange = this.lerp(this.oldGeometry.proj.verticalRange, this.newGeometry.proj.verticalRange, deltaTime);
        }

        if (this.currentGeometry && this.ruler) {
            this.ruler.geometry = this.currentGeometry;
        }

        // Делаем дела
        if (this.currentGeometry && this.ruler) {
            update(this.currentGeometry, this.ruler, true, null, new Cursor());
        }

        if (progress < 1) {
            requestAnimationFrame(this.animateGeometry.bind(this));
        } else {
            console.log('Анимация завершена!');
            this.isAnimating = false;
            this.startTime = null;
            return this.newGeometry;
        }
    }

    public lerp(start : number, end : number, t : number) : number {
        return start + (end - start) * t;
    }
}