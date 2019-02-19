var W = 600;
var H = 600;
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 600;
var MODEL_MIN_X = -2;
var MODEL_MAX_X = 2;
var MODEL_MIN_Y = -2;
var MODEL_MAX_Y = 2;
var vectors = [];
var triangles = [];
var colors = [
    'red', 'yellow', 'green', 'blue',
    'cyan', 'white'
];
function initGeometry() {
    for (var x = -1; x <= 1; x += 2) {
        for (var y = -1; y <= 1; y += 2) {
            for (var z = -1; z <= 1; z += 2) {
                vectors.push(new Vector3(x, y, z));
            }
        }
    }
    for (var dimension = 0; dimension <= 2; ++dimension) {
        for (var side = -1; side <= 1; side += 2) {
            var sideVectors = vectors.filter((vector) => {
                return vector[dimension] == side;
            });
            var a = sideVectors[0];
            var b = sideVectors[1];
            var c = sideVectors[2];
            var d = sideVectors[3];
            triangles.push(new Triangle([a, b, c], dimension, side, canvas).generateTriangle());
            triangles.push(new Triangle([d, b, c], dimension, side, canvas).generateTriangle());
        }
    }
}
function perspectiveProjection(vector) {
    let x = vector[0];
    let y = vector[1];
    let z = vector[2];
    return new Vector3(x / (z + 4), y / (z + 4), z);
}
function project(vector) {
    let perpectivePoint = perspectiveProjection(vector);
    let x = perpectivePoint[0];
    let y = perpectivePoint[1];
    let z = perpectivePoint[2];
    return new Vector3(W * (x - MODEL_MIN_X) / (MODEL_MAX_X - MODEL_MIN_X), H * (1 - (y - MODEL_MIN_Y) / (MODEL_MAX_Y - MODEL_MIN_Y)), z);
}
var theta = 0;
var dtheta = 0.015;
function render() {
    ctx.clearRect(0, 0, W, H);
    theta += dtheta;
    triangles.forEach((triangle, idx) => {
        var triangle = triangle.rotateTriangle(theta);
        var projectedVectors = triangle.vectors.map(project);
        triangle.vectors = projectedVectors;
        var color = colors[Math.floor(idx / 2)];
        triangle.renderTriangle(color);
    });
    requestAnimationFrame(render);
}
initGeometry();
render();
