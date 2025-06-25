import update from "../Render/update.js";


export default class TransformGeometry {
    constructor(duration, ruler) {
        this.startTime = null;
        this.duration = duration;
        this.oldGeometry = null;
        this.newGeometry = null;
        this.ruler = ruler;
        this.currentGeometry = null;

        this.isAnimating = false;
    }

    animate(oldGeometry, newGeometry) {
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

    animateGeometry(currentTime) {
        if (!this.startTime) this.startTime = currentTime;
        const elapsedTime = currentTime - this.startTime;
        const progress = Math.min(elapsedTime / this.duration, 1); // t ∈ [0, 1]

        // Линейная интерполяция (LERP)
        const deltaTime = progress;

        this.currentGeometry.proj.centerPoint = this.oldGeometry.proj.centerPoint.lerp(this.newGeometry.proj.centerPoint, deltaTime);
        this.currentGeometry.proj.horizontalRange = this.lerp(this.oldGeometry.proj.horizontalRange, this.newGeometry.proj.horizontalRange, deltaTime);
        this.currentGeometry.proj.verticalRange = this.lerp(this.oldGeometry.proj.verticalRange, this.newGeometry.proj.verticalRange, deltaTime);

        this.ruler.geometry = this.currentGeometry;

        // Делаем дела
        update(this.currentGeometry, this.ruler, true);

        if (progress < 1) {
            requestAnimationFrame(this.animateGeometry.bind(this));
        } else {
            console.log('Анимация завершена!');
            this.isAnimating = false;
            this.startTime = null;
            return this.newGeometry;
        }
    }

    lerp(start, end, t) {
        return start + (end - start) * t;
    }
}