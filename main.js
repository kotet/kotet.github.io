"use strict";
window.addEventListener("load", function () {
    let Light = function (p, i) {
        this.position = p;
        this.intensity = i;
    }
    let Material = function (r, a, c, s) {
        this.refractive_index = r;
        this.albedo = a;
        this.diffuse_color = c;
        this.specular_exponent = s;
    }
    let Sphere = function (c, r, m) {
        this.center = c;
        this.radius = r;
        this.material = m;
    }
    let canvas = document.querySelector("#canvas");
    let state = {};
    let ctx = canvas.getContext("2d");
    function init() {
        state.drawlist = [];
        for (let y = 0; y < 10; y++)
            for (let x = 0; x < 10; x++)
                for (let color = 0; color < 3; color++) {
                    if ((y < 1 || 3 < y) || (4 < x) || true) {
                        state.drawlist.push(y * 30 + x * 3 + color);
                    }
                }
        ctx = canvas.getContext("2d")
        ctx.fillStyle = "rgba(0,0,0,1.0)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        state.progress = 0;
        state.block_height = Math.ceil(canvas.height * 0.1);
        state.block_width = Math.ceil(canvas.width * 0.1);
        state.spheres = [];
        for (let i = 0; i < 100; i++) {
            let z = Math.random() * -150 - 20;
            let x = (Math.random() * 2 - 1) * z;
            let y = (Math.random() * 2 - 1) * z * 0.5;
            let r = Math.random() * -z / 20;
            let type = Math.random();
            if (type < 0.05) {
                let albedo = [0, Math.random(), 0.8, 0];
                state.spheres.push(new Sphere([x, y, z], r, new Material(1.0, albedo, [1.0, 1.0, 1.0], 1425.0)));
            } else if (type < 0.1) {
                let albedo = [0, Math.random(), Math.random() * 0.1, 0.8];
                state.spheres.push(new Sphere([x, y, z], r, new Material(1.5, albedo, [0.6, 0.7, 0.8], 125.0)));
            } else {
                let color = hsl(Math.random() * 360, 0.8, 0.3);
                let albedo = [Math.random() * 0.1 + 0.55, Math.random() * 0.2 + 0.2, Math.random() * 0.1, 0];
                state.spheres.push(new Sphere([x, y, z], r, new Material(1.0, albedo, color, 50.0)));
            }
        }
        state.lights = [];
        for (let i = 0; i < 3; i++) {
            let x = (Math.random() * 2 - 1) * 100;
            let y = (Math.random() * 2 - 1) * 100;
            state.lights.push(new Light([x, y, 20], 1.5));
        }
    }
    function draw() {
        let b = choice_block();
        if (b == -1) {
            window.setTimeout(draw, 5000);
            return;
        }

        let color = b % 3;
        let bx = ((b / 3) | 0) % 10;
        let by = (b / 30) | 0;
        let y = (by * state.block_height) + state.progress;
        let data = ctx.getImageData(bx * state.block_width, by * state.block_height, state.block_width, state.block_height);
        for (let j = 0; j < state.block_height; j++)
            for (let i = 0; i < state.block_width; i++) {
                let x = i + bx * state.block_width;
                let y = j + by * state.block_height;
                if (x < canvas.width && y < canvas.height) {
                    data.data[(state.block_width * j + i) * 4 + color] = raytracing(x, y, color);
                }
            }
        ctx.putImageData(data, bx * state.block_width, by * state.block_height);

        // requestAnimationFrame(draw);
        window.setTimeout(draw, 100);
    }
    function choice_block() {
        if (state.drawlist.length == 0) {
            return -1;
        }
        let i = (Math.random() * state.drawlist.length) | 0;
        let block = state.drawlist[i];
        state.drawlist.splice(i, 1);
        return block;
    }
    function resize_canvas() {
        if (canvas.width != window.innerWidth * devicePixelRatio || canvas.height != window.innerHeight * devicePixelRatio) {
            canvas.width = window.innerWidth * devicePixelRatio;
            canvas.height = window.innerHeight * devicePixelRatio;
            init();
        }
    }
    resize_canvas();
    window.setInterval(resize_canvas, 2000);
    init();
    requestAnimationFrame(draw);

    function hsl(h, s, l) {
        let h360 = h % 360;

        let c = (1 - Math.abs(2 * l - 1)) * s;
        let hp = h360 / 60;
        let x = c * (1 - Math.abs((hp % 2) - 1));

        let r1;
        let g1;
        let b1;

        if (hp >= 0 && hp <= 1) {
            r1 = c;
            g1 = x;
            b1 = 0;
        } else if (hp >= 1 && hp <= 2) {
            r1 = x;
            g1 = c;
            b1 = 0;
        } else if (hp >= 2 && hp <= 3) {
            r1 = 0;
            g1 = c;
            b1 = x;
        } else if (hp >= 3 && hp <= 4) {
            r1 = 0;
            g1 = x;
            b1 = c;
        } else if (hp >= 4 && hp <= 5) {
            r1 = x;
            g1 = 0;
            b1 = c;
        } else if (hp >= 5 && hp < 6) {
            r1 = c;
            g1 = 0;
            b1 = x;
        } else {
            r1 = 0;
            g1 = 0;
            b1 = 0;
        }

        let m = l - 0.5 * c;
        let r = r1 + m;
        let g = g1 + m;
        let b = b1 + m;
        return [r, g, b];
    }

    function vadd(a, b) {
        return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
    }
    function vsub(a, b) {
        return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
    }
    function dotp(a, b) {
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    }
    function normalize(v) {
        let n = Math.sqrt(dotp(v, v));
        return [v[0] / n, v[1] / n, v[2] / n];
    }
    function norm(v) {
        return Math.sqrt(dotp(v, v));
    }
    function neg(v) {
        return [-v[0], -v[1], -v[2]];
    }
    function reflect(I, N) {
        let IN = dotp(I, N);
        let n = [N[0] * 2 * IN, N[1] * 2 * IN, N[2] * 2 * IN]
        return vsub(I, n);
    }
    function refract(I, N, refractive_index) {
        let cosi = -Math.max(-1.0, Math.min(1.0, dotp(I, N)));
        let etai = 1;
        let etat = refractive_index;
        let n = N;
        if (cosi < 0) {
            cosi = -cosi;
            etai = refractive_index;
            etat = 1;
            n = neg(N);
        }
        let eta = etai / etat;
        let k = 1 - eta * eta * (1 - cosi * cosi);
        if (k < 0) {
            return [0, 0, 0];
        }
        else {
            let x = eta * cosi - Math.sqrt(k);
            return vadd([I[0] * eta, I[1] * eta, I[2] * eta], [n[0] * x, n[1] * x, n[2] * x]);
        }
    }
    Sphere.prototype.ray_intersect = function (orig, dir) {
        let L = vsub(this.center, orig);
        let tca = dotp(L, dir);
        let d2 = dotp(L, L) - tca * tca;
        if (this.radius * this.radius < d2) return { success: false };
        let thc = Math.sqrt(this.radius * this.radius - d2);
        let t0 = tca - thc;
        if (t0 < 0) t0 = tca + thc;
        if (t0 < 0) return { success: false };
        return { success: true, distance: t0 };
    }
    function cast_ray(orig, dir, color, depth) {
        const background = [0.2, 0.7, 0.8];
        if (4 < depth) {
            return background[color];
        }
        let intersect = scene_intersect(orig, dir);
        if (!intersect.success) {
            return background[color];
        }
        let epsN = [intersect.N[0] * 1e-3, intersect.N[1] * 1e-3, intersect.N[2] * 1e-3];
        let reflect_dir = normalize(reflect(dir, intersect.N));
        let reflect_orig = dotp(reflect_dir, intersect.N) < 0 ? vsub(intersect.hit, epsN) : vadd(intersect.hit, epsN);
        let reflect_color = cast_ray(reflect_orig, reflect_dir, color, depth + 1);

        let refract_dir = normalize(refract(dir, intersect.N, intersect.material.refractive_index));
        let refract_orig = dotp(refract_dir, intersect.N) < 0 ? vsub(intersect.hit, epsN) : vadd(intersect.hit, epsN);
        let refract_color = cast_ray(refract_orig, refract_dir, color, depth + 1);

        let diffuse_light_intensity = 0;
        let specular_light_intensity = 0;
        for (let i = 0; i < state.lights.length; i++) {
            let light_dir = normalize(vsub(state.lights[i].position, intersect.hit));
            let light_distance = norm(vsub(state.lights[i].position, intersect.hit));


            let shadow_orig = dotp(light_dir, intersect.N) < 0 ? vsub(intersect.hit, epsN) : vadd(intersect.hit, epsN);
            let shadow_intersect = scene_intersect(shadow_orig, light_dir);
            if (shadow_intersect.success && norm(vsub(shadow_intersect.hit, shadow_orig)) < light_distance) {
                continue;
            }

            diffuse_light_intensity += state.lights[i].intensity * Math.max(0, dotp(light_dir, intersect.N));
            specular_light_intensity += Math.pow(Math.max(0, dotp(neg(reflect(neg(light_dir), intersect.N)), dir)), intersect.material.specular_exponent) * state.lights[i].intensity;
        }
        let a = intersect.material.diffuse_color[color] * Math.max(diffuse_light_intensity, 0.1) * intersect.material.albedo[0];
        let b = specular_light_intensity * intersect.material.albedo[1];
        let c = reflect_color * intersect.material.albedo[2];
        let d = refract_color * intersect.material.albedo[3];

        return a + b + c + d;
    }
    function scene_intersect(orig, dir) {
        let hit;
        let N;
        let material;

        let spheres_dist = Number.POSITIVE_INFINITY;
        for (let i = 0; i < state.spheres.length; i++) {
            let intersect = state.spheres[i].ray_intersect(orig, dir);
            if (intersect.success && intersect.distance < spheres_dist) {
                spheres_dist = intersect.distance;
                hit = vadd(orig, [dir[0] * intersect.distance, dir[1] * intersect.distance, dir[2] * intersect.distance]);
                N = normalize(vsub(hit, state.spheres[i].center));
                material = state.spheres[i].material;
            }
        }

        return {
            success: spheres_dist < 1000,
            hit: hit,
            N: N,
            material: material
        };
    }
    function raytracing(x, y, color) {
        let wx = (2 * (x + 0.5) / canvas.width - 1) * Math.tan(Math.PI / 6) * canvas.width / canvas.height;
        let wy = -(2 * (y + 0.5) / canvas.height - 1) * Math.tan(Math.PI / 6);
        let dir = normalize([wx, wy, -1]);
        let c = cast_ray([0, 0, 0], dir, color, 0);
        return (c * 255) | 0;
    }
});