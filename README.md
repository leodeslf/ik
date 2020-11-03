# IK

Inverse kinematics.

## Example

```JavaScript
import { Vec2 } from "./vec.min.js";
import { IKModule } from './IK.js';

let module = new IKModule(
  joints, // (number)
  jointsLenght, // (number)
  target, // target (Vec2)
  anchor // anchor (Vec2, optional)
);

window.onload = () => {  
  ctx = document.getElementById('canvas').getContext('2d');
  draw();
}

function draw() {
  ctx.crearRect(0, 0, ctx.width, ctx.height);
  module.update();
  requestAnimationFrame(draw);
}
```
