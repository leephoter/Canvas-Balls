/** @format */

import { randomRangeInteger } from '../../util/index';

interface coordinate {
  x: number;
  y: number;
}

export default class Circle {
  radius: number;
  point: coordinate;
  direction: coordinate;

  constructor(canvas: HTMLCanvasElement) {
    this.radius = randomRangeInteger(10, 20);
    this.point = {
      x: randomRangeInteger(this.radius, canvas.width - this.radius),
      y: randomRangeInteger(this.radius, canvas.height - this.radius),
    };
    this.direction = {
      x: Math.cos((Math.PI / 180) * randomRangeInteger(0, 360)),
      y: Math.sin((Math.PI / 180) * randomRangeInteger(0, 360)),
    };
  }

  move() {
    this.point.x += this.direction.x;
    this.point.y += this.direction.y;
  }
}
