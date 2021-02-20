"use strict";

/**
 * A two-dimensional vector class.
 */
export default class Vec2 {
  x: number;
  y: number;
  /**
   * Creates a two-dimensional vector pointing to X and Y.
   * @param {number} x A numeric expression.
   * @param {number} y A numeric expression.
   */
  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  /**
   * @param {Vec2} a A vector.
   * @param {Vec2} b A vector.
   * @returns {Vec2} A new vector equals to A plus B.
   */
  static add(a: Vec2, b: Vec2): Vec2 {
    return new Vec2(a.x + b.x, a.y + b.y);
  }

  /**
   * @param {number} radius Numeric expression.
   * @param {number} phi Numeric expression (angle from x axis measured in radians).
   * @returns {Vec2} A new vector created from Polar Coordinates.
   */
  static fromPolarCoords(radius: number, phi: number): Vec2 {
    return new Vec2(
      radius * Math.cos(phi),
      radius * Math.sin(phi)
    );
  }

  /**
   * @param {Vec2} a A vector.
   * @param {Vec2} b A vector.
   * @returns {Vec2} A new vector equals to A minus B.
   */
  static subtract(a: Vec2, b: Vec2): Vec2 {
    return new Vec2(a.x - b.x, a.y - b.y);
  }

  /**
   * Values between PI and -PI.
   * @returns {number} Angle relative to the positive x-axis (in radians).
   */
  get angleX(): number {
    return Math.atan2(this.y, this.x);
  }

  /**
   * @returns {number} The magnitude of this vector.
   */
  get magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * Sets the magnitude of this vector.
   * @param {number} m A numeric expression.
   */
  set magnitude(m: number) {
    this.normalize();
    this.scale(m);
  }

  /**
   * Adds A to this vector.
   * @param {Vec2} a A vector.
   */
  add(a: Vec2) {
    this.x = this.x + a.x;
    this.y = this.y + a.y;
  }

  /**
   * Copy the coordinates of A to this vector.
   * @param {Vec2} a A vector.
   */
  copy(a: Vec2) {
    this.x = { ...a }.x;
    this.y = { ...a }.y;
  }

  /**
   * Sets the magnitude of this vector to 1 (Unit Vector).
   */
  normalize() {
    let m = this.magnitude;
    if (m === 0) m = 1;
    else m = 1 / m;
    this.x = this.x * m;
    this.y = this.y * m;
  }

  /**
   * Scales this vector by A.
   * @param {number} val A numeric expression.
   */
  scale(val: number) {
    this.x = this.x * val;
    this.y = this.y * val;
  }
}
