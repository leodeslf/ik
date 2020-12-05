"use strict";
export default class Vec2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    static add(a, b) {
        return new Vec2(a.x + b.x, a.y + b.y);
    }
    static angleBetween(a, b) {
        const MAG_A = a.magnitude;
        const MAG_B = b.magnitude;
        if (MAG_A === 0 || MAG_B === 0) {
            console.error("Cannot divide by zero.");
            return NaN;
        }
        return Math.acos(Vec2.dot(a, b) / (MAG_A * MAG_B));
    }
    static distance(a, b) {
        const S = (a.x - b.x);
        const T = (a.y - b.y);
        return Math.sqrt((S * S) + (T * T));
    }
    static distanceChebyshev(a, b) {
        return Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
    }
    static distanceManhattan(a, b) {
        return Math.sqrt(Math.abs(a.x - b.x) +
            Math.abs(a.y - b.y));
    }
    static distanceMinkowski(a, b, e) {
        if (e === 0) {
            console.error("Cannot divide by zero.");
            return NaN;
        }
        return (Math.pow((Math.pow(Math.abs(a.x - b.x), e) +
            Math.pow(Math.abs(a.y - b.y), e)), (1 / e)));
    }
    static dot(a, b) {
        return (a.x * b.x +
            a.y * b.y);
    }
    static fromCopy(a) {
        return new Vec2(Object.assign({}, a).x, Object.assign({}, a).y);
    }
    static fromPolarCoords(radius, phi) {
        return new Vec2(radius * Math.cos(phi), radius * Math.sin(phi));
    }
    static project(a, b) {
        const P_MAG = a.magnitude * Math.cos(Vec2.angleBetween(a, b));
        const P = Vec2.fromCopy(b);
        P.normalize();
        P.scale(P_MAG);
        return P;
    }
    static subtract(a, b) {
        return new Vec2(a.x - b.x, a.y - b.y);
    }
    get angleX() {
        return Math.atan2(this.y, this.x);
    }
    get angleY() {
        return Math.atan2(this.x, this.y);
    }
    get magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    set limit(max) {
        if (this.magnitude > max) {
            this.normalize();
            this.scale(max);
        }
    }
    set magnitude(m) {
        this.normalize();
        this.scale(m);
    }
    add(a) {
        this.x = this.x + a.x;
        this.y = this.y + a.y;
    }
    clamp(max, min) {
        const M = this.magnitude;
        if (M > max) {
            this.magnitude = max;
            return;
        }
        else if (M < min) {
            this.magnitude = min;
        }
    }
    copy(a) {
        this.x = Object.assign({}, a).x;
        this.y = Object.assign({}, a).y;
    }
    normalize() {
        let mag = this.magnitude;
        if (mag === 0)
            mag = 1;
        else
            mag = 1 / mag;
        this.x = this.x * mag;
        this.y = this.y * mag;
    }
    scale(val) {
        this.x = this.x * val;
        this.y = this.y * val;
    }
    subtract(a) {
        this.x = this.x - a.x;
        this.y = this.y - a.y;
    }
}
