class Vector3 {
    constructor(x, y, z) {
        this[0] = x;
        this[1] = y;
        this[2] = z;
    }
    cross(vector) {
        return new Vector3(this[1] * vector[2] - this[2] * vector[1], this[2] * vector[0] - this[0] * vector[2], this[0] * vector[1] - this[1] * vector[0]);
    }
    ccw(vector) {
        return this.cross(vector)[2] > 0;
    }
    add(vector) {
        return new Vector3(this[0] + vector[0], this[1] + vector[1], this[2] + vector[2]);
    }
    scale(scalar) {
        return new Vector3(scalar * this[0], scalar * this[1], scalar * this[2]);
    }
    substract(vector) {
        return this.add(vector.scale(-1));
    }
    rotateY(theta) {
        let x = this[0];
        let y = this[1];
        let z = this[2];
        return new Vector3(Math.cos(theta) * x - Math.sin(theta) * z, y, Math.sin(theta) * x + Math.cos(theta) * z);
    }
    rotateX(theta) {
        let x = this[0];
        let y = this[1];
        let z = this[2];
        return new Vector3(x, Math.cos(theta) * y - Math.sin(theta) * z, Math.sin(theta) * y + Math.cos(theta) * z);
    }
}
