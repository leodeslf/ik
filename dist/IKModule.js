"use strict";
import IKJoint from "./IKJoint";
export default class IKModule {
    constructor(joints, length, target, anchor) {
        this.body = [];
        this.joints = joints;
        for (let i = 0; i < joints; i++) {
            if (i === 0)
                this.body[i] = new IKJoint(length, target);
            else
                this.body[i] = new IKJoint(length, this.body[i - 1].base);
        }
        for (let i = 0; i < joints; i++) {
            if (i === joints - 1)
                this.body[i].anchor = anchor;
            else
                this.body[i].anchor = this.body[i + 1].end;
        }
    }
    update() {
        for (let i = 0; i < this.body.length; i++) {
            this.body[i].reach();
        }
        for (let i = this.body.length - 1; i >= 0; i--) {
            if (this.body[i].anchor) {
                this.body[i].fix();
            }
        }
    }
    get anchor() {
        return this.body[this.joints - 1].anchor;
    }
    set target(target) {
        this.body[0].target = target;
    }
    set anchor(anchor) {
        this.body[this.body.length - 1].anchor = anchor;
    }
}
