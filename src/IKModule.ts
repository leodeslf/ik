"use strict";

import IKJoint from "./IKJoint";
import Vec2 from "./vec";

export default class IKModule {
  body: IKJoint[];

  constructor(joints: number, length: number, target: Vec2, anchor: Vec2) {
    this.body = [];
    // Add joints to module body.
    // Targets.
    for (let i = 0; i < joints; i++) {
      // Set target as the first joint's target (module "head").
      if (i === 0) this.body[i] = new IKJoint(length, target);
      // Set each joint as the next one target.
      else this.body[i] = new IKJoint(length, this.body[i - 1].base);
    }

    // Anchors.
    for (let i = 0; i < joints; i++) {
      // Set anchor as the last joint's anchor (module "base").
      if (i === joints - 1) this.body[i].anchor = anchor;
      // Set each joint end as the previouse's one anchor.
      else this.body[i].anchor = this.body[i + 1].end;
    }
  }

  update() {
    // Move and point each joint to it's target.
    for (let i = 0; i < this.body.length; i++) {
      this.body[i].reach();
    }
    // Point each joint's base to it's anchor.
    for (let i = this.body.length - 1; i >= 0; i--) {
      if (this.body[i].anchor) {
        this.body[i].fix();
      }
    }
  }

  set target(target: Vec2) {
    this.body[0].target = target;
  }

  set anchor(anchor: Vec2) {
    this.body[this.body.length - 1].anchor = anchor
  }
}
