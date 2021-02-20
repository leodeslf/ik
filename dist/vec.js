"use strict";
export default class Vec2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    static add(a, b) {
        return new Vec2(a.x + b.x, a.y + b.y);
    }
    static fromPolarCoords(radius, phi) {
        return new Vec2(radius * Math.cos(phi), radius * Math.sin(phi));
    }
    static subtract(a, b) {
        return new Vec2(a.x - b.x, a.y - b.y);
    }
    get angleX() {
        return Math.atan2(this.y, this.x);
    }
    get magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    set magnitude(m) {
        this.normalize();
        this.scale(m);
    }
    add(a) {
        this.x = this.x + a.x;
        this.y = this.y + a.y;
    }
    copy(a) {
        this.x = Object.assign({}, a).x;
        this.y = Object.assign({}, a).y;
    }
    normalize() {
        let m = this.magnitude;
        if (m === 0)
            m = 1;
        else
            m = 1 / m;
        this.x = this.x * m;
        this.y = this.y * m;
    }
    scale(val) {
        this.x = this.x * val;
        this.y = this.y * val;
    }
}
