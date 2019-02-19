class Triangle {
    constructor(vectors, dimension, side, canvas) {
        this.vectors = vectors,
            this.canvas = canvas;
        this.dimension = dimension,
            this.side = side;
    }
    generateTriangle() {
        var side1 = this.vectors[1].substract(this.vectors[0]);
        var side2 = this.vectors[2].substract(this.vectors[0]);
        var orientationVector = side1.cross(side2);
        if (Math.sign(orientationVector[this.dimension]) == Math.sign(this.side)) {
            return new Triangle(this.vectors, this.dimension, this.side, this.canvas);
        }
        return new Triangle([this.vectors[0], this.vectors[2], this.vectors[1]], this.dimension, this.side, this.canvas);
    }
    renderTriangle(color) {
        var ctx = this.canvas.getContext('2d');
        var a = this.vectors[0];
        var b = this.vectors[1];
        var c = this.vectors[2];
        var side1 = b.substract(a);
        var side2 = c.substract(a);
        if (side1.ccw(side2)) {
            ctx.beginPath();
            ctx.moveTo(a[0], a[1]);
            ctx.lineTo(b[0], b[1]);
            ctx.lineTo(c[0], c[1]);
            ctx.lineTo(a[0], a[1]);
            ctx.strokeStyle = color;
            ctx.fillStyle = color;
            ctx.stroke();
            ctx.fill();
        }
    }
    rotateTriangle(theta) {
        var rotatedVectors = this.vectors.map((vector) => {
            vector = vector.rotateY(theta).rotateX(0.4 * theta);
            return vector;
        });
        return new Triangle(rotatedVectors, this.dimension, this.side, this.canvas);
    }
}
