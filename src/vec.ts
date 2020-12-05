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
   * Returns the angle between A and B.
   * @param {Vec2} a A vector.
   * @param {Vec2} b A vector.
   * @returns {number} The angle between A and B (in radians).
   */
  static angleBetween(a: Vec2, b: Vec2): number {
    const MAG_A = a.magnitude;
    const MAG_B = b.magnitude;
    if (MAG_A === 0 || MAG_B === 0) {
      console.error("Cannot divide by zero.");
      return NaN;
    }
    return Math.acos(Vec2.dot(a, b) / (MAG_A * MAG_B));
  }

  /**
   * @param {Vec2} a A vector.
   * @param {Vec2} b A vector.
   * @returns {number} The (Euclidian) distance from A to B.
   */
  static distance(a: Vec2, b: Vec2): number {
    const S = (a.x - b.x);
    const T = (a.y - b.y);
    return Math.sqrt((S * S) + (T * T));
  }

  /**
   * "Also known as the Chessboard distance, it is somewhat similar
   * to the Manhattan distance, but with 45 degrees rotation."
   * @param {Vec2} a A vector.
   * @param {Vec2} b A vector.
   * @returns {number} Chebyshev distance from A to B.
   */
  static distanceChebyshev(a: Vec2, b: Vec2): number {
    return Math.max(
      Math.abs(a.x - b.x),
      Math.abs(a.y - b.y));
  }

  /**
   * "Inspired by the grid-like organization of Manhattan, this
   * is distance to the nearest points when you can only travel
   * around the boundaries."
   * 
   * In other words: 
   * Only horizontal, vertical and diagonal (45 deg.) movements.
   * @param {Vec2} a A vector.
   * @param {Vec2} b A vector.
   * @returns {number} Manhattan distance from A to B.
   */
  static distanceManhattan(a: Vec2, b: Vec2): number {
    return Math.sqrt(
      Math.abs(a.x - b.x) +
      Math.abs(a.y - b.y));
  }

  /**
   * It takes an exponent parameter (e), and the results can be similar
   * or even equivalent to Chebyshev, Euclidian and Manhattan metrics.
   * 
   * - If { p = 1 }: It'll be equivalent to Manhattan distance.
   * 
   * - If { p = 2 }: It'll be equivalent to Euclidian distance.
   * 
   * - If { p = infinite }: It'll be equivalent to Chebyshev distance.
   * @param {Vec2} a A vector.
   * @param {Vec2} b A vector.
   * @param {number} e A numeric expression.
   * @returns {number} Minkowski distance from A to B.
   */
  static distanceMinkowski(a: Vec2, b: Vec2, e: number): number {
    if (e === 0) {
      console.error("Cannot divide by zero.");
      return NaN;
    }
    return ((
      Math.abs(a.x - b.x) ** e +
      Math.abs(a.y - b.y) ** e
    ) ** (1 / e));
  }

  /**
   * The sum of the product of each component.
   * @param {Vec2} a A vector.
   * @param {Vec2} b A vector.
   * @returns {number} The dot product of these two vectors.
   */
  static dot(a: Vec2, b: Vec2): number {
    return (
      a.x * b.x +
      a.y * b.y);
  }

  /**
   * @param {Vec2} a A vector.
   * @returns {Vec2} A new vector identical to A.
   */
  static fromCopy(a: Vec2): Vec2 {
    return new Vec2(
      { ...a }.x,
      { ...a }.y);
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
   * Orthogonal projection of A onto B.
   * @param {Vec2} a A vector.
   * @param {Vec2} b A vector.
   * @returns {Vec2} The component of A projected on B (in direction of B).
   */
  static project(a: Vec2, b: Vec2): Vec2 {
    const P_MAG = a.magnitude * Math.cos(Vec2.angleBetween(a, b));
    const P = Vec2.fromCopy(b);
    P.normalize();
    P.scale(P_MAG);
    return P;
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
   * Values between PI and -PI.
   * @returns {number} Angle relative to the positive y-axis (in radians).
   */
  get angleY(): number {
    return Math.atan2(this.x, this.y);
  }

  /**
   * @returns {number} The magnitude of this vector.
   */
  get magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * Limits the maximum length of this vector.
   * @param {number} max A numeric expression.
   */
  set limit(max: number) {
    if (this.magnitude > max) {
      this.normalize();
      this.scale(max);
    }
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
   * Keeps the vector's magnitude between the given values, minimum
   * and maximum (inclusive).
   * @param {number} max A numeric expression.
   * @param {number} min A numeric expression.
   */
  clamp(max: number, min: number) {
    const M = this.magnitude;
    if (M > max) {
      this.magnitude = max;
      return;
    } else if (M < min) {
      this.magnitude = min;
    }
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
    let mag = this.magnitude;
    if (mag === 0) mag = 1;
    else mag = 1 / mag;
    this.x = this.x * mag;
    this.y = this.y * mag;
  }

  /**
   * Scales this vector by A.
   * @param {number} val A numeric expression.
   */
  scale(val: number) {
    this.x = this.x * val;
    this.y = this.y * val;
  }

  /**
   * Subtracts A from this vector.
   * @param {Vec2} a A vector.
   */
  subtract(a: Vec2) {
    this.x = this.x - a.x;
    this.y = this.y - a.y;
  }
}
