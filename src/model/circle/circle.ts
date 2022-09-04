/** @format */

import { randomRangeInteger } from '../../util/index';

interface coordinate {
  x: number;
  y: number;
}

export default class Circle {
  canvas: HTMLCanvasElement;
  radius: number;
  point: coordinate;
  direction: coordinate;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
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

  bouncingWall() {
    if (
      this.point.x >= this.canvas.width - this.radius ||
      this.point.x <= this.radius
    )
      this.direction.x = -this.direction.x; // 가로 튕기기
    if (
      this.point.y >= this.canvas.height - this.radius ||
      this.point.y <= this.radius
    )
      this.direction.y = -this.direction.y; // 새로 튕기기
  }
}
