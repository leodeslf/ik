# IK

Inverse kinematic module and joints.

## Example

Taking mouse position as module target, live [demo here](https://codepen.io/leodeslf/project/full/XYnBQg).

`index.html`

```HTML
<!DOCTYPE html>
<html>
  <head>
    <script src="vec.js" type="module"></script>
    <script src="index.js" type="module"></script>
  </head>
  <body style="margin: 0; display: flex;">
    <canvas id="canvas"></canvas>
  </body>
</html>
```

`index.js`

```JavaScript
import IKModule from './IKModule.js';
import Vec2 from "./vec.js";

const JOINTS = 300;
const JOINTS_LENGHT = 1;

let target = new Vec2(0, 0);
let anchor = new Vec2(0, 0);
let canvas, width, height, ctx, module;

window.onload = () => {
  // Defining canvas, it's context and boundaries.
  canvas = document.getElementById('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;  
  width = canvas.width;
  height = canvas.height;
  ctx = canvas.getContext('2d');
  
  // Defining the anchor to the bottom-center side of the canvas.
  anchor.x = width * .5;
  anchor.y = height;

  // Update target position.
  window.onmousemove = e => {
    target.x = e.x;
    target.y = e.y;
  }

  // Finally, define the actual module and draw it.
  module = new IKModule(JOINTS, JOINTS_LENGHT, target, anchor);
  draw();
}

function draw() {
  ctx.clearRect(0, 0, width, height);

  // Module updates each joint by itself.
  module.update();

  // Draw the joints.
  for (let i = 0; i < JOINTS; i++) {
    ctx.beginPath();
    ctx.moveTo(
      module.body[i].base.x,
      module.body[i].base.y);
    ctx.lineTo(
      module.body[i].end.x,
      module.body[i].end.y);
    ctx.closePath();
    ctx.stroke();
  }
  requestAnimationFrame(draw);
}
```
