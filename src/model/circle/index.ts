/** @format */

/** @format */

import { randomRangeInteger } from '../../util/index';

export default class Circle {
  radius: number;
  point: {
    x: number;
    y: number;
  };

  constructor(canvas: HTMLCanvasElement) {
    this.radius = randomRangeInteger(10, 20);
    this.point = {
      x: randomRangeInteger(this.radius, canvas.width - this.radius),
      y: randomRangeInteger(this.radius, canvas.height - this.radius),
    };
  }
}
