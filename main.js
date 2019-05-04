"use strict";

let canvas, ctx, brush, angle, prev_w, prev_h;
const CANVASID = "back-canvas";
const BRUSHPATH = "brush.png";
const STROKEEPS = 1;

function drawImage(x, y, size) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.drawImage(brush, -(size / 2), -(size / 2), size, size);
    ctx.restore();
}

function stroke(f, g, h, begin, end) {
    let b = f(begin);
    let e = f(end);
    let dist = Math.pow(b.x - e.x, 2) + Math.pow(b.y - e.y, 2);
    if (STROKEEPS * STROKEEPS < dist) {
        stroke(f, g, h, begin, (begin + end) / 2);
        stroke(f, g, h, (begin + end) / 2, end);
    } else {
        ctx.globalAlpha = g(begin);
        drawImage(b.x, b.y, brush.width * h(begin));
        drawImage(e.x, e.y, brush.width * h(begin));
    }
}

function draw() {
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let x = [];
    let y = [];
    for (let i = 0; i < 4; i++) {
        x.push(Math.random() * canvas.width);
        y.push(Math.random() * canvas.height);

    }
    let pos = function (t) {
        return { x: bezier(x[0], x[1], x[2], x[3], t), y: bezier(y[0], y[1], y[2], y[3], t) };
    }
    angle = Math.random() * Math.PI * 2;
    stroke(pos, alpha, size, 0, 1);
}

function resize() {
    if (canvas.width != window.innerWidth * devicePixelRatio || canvas.height != window.innerHeight * devicePixelRatio)
        draw();
}

window.addEventListener("load", function () {
    canvas = document.getElementById(CANVASID);
    ctx = canvas.getContext("2d");
    ctx.globalCompositeOperation = "destination-atop";
    brush = new Image();
    brush.src = BRUSHPATH + "?" + new Date().getTime();
    brush.onload = (() => { setTimeout(draw, 100); setInterval(resize, 1000); })();
});

function bezier(a, b, c, d, t) {
    return Math.pow(1 - t, 3) * a + 3 * Math.pow(1 - t, 2) * t * b + 3 * (1 - t) * Math.pow(t, 2) * c + Math.pow(t, 3) * d;
}

function alpha(t) {
    return 1 - Math.pow(t * 2 - 1, 32);
    // return 1;
}

function size(t) {
    return 1;
    // return 1 - Math.pow(t * 2 - 1, 8);
    // return 1.1 - Math.pow(t, 16);
}