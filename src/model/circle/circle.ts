/** @format */

import { randomRangeRealNumber } from '../../util/index';

interface coordinate {
  x: number;
  y: number;
}

export default class Circle {
  canvas: HTMLCanvasElement;
  id: number;
  radius: number;
  speed: number;
  point: coordinate;
  direction: coordinate;

  constructor(id: number, canvas: HTMLCanvasElement) {
    this.id = id;
    this.canvas = canvas;
    this.radius = randomRangeRealNumber(10, 20);
    this.speed = randomRangeRealNumber(200, 400) / 60;
    this.point = {
      x: randomRangeRealNumber(this.radius, canvas.width - this.radius),
      y: randomRangeRealNumber(this.radius, canvas.height - this.radius),
    };
    const direction = {
      x: Math.cos((Math.PI / 180) * randomRangeRealNumber(0, 360)),
      y: Math.sin((Math.PI / 180) * randomRangeRealNumber(0, 360)),
    };
    this.direction = {
      x: this.unitVector(direction.x, direction.y).x,
      y: this.unitVector(direction.x, direction.y).y,
    };
  }

  move() {
    this.point.x += this.direction.x * this.speed;
    this.point.y += this.direction.y * this.speed;
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

  bouncingCircle(circles: Circle[]) {
    circles.forEach((circle: Circle) => {
      const distance = Math.sqrt(
        (this.point.x - circle.point.x) ** 2 +
          (this.point.y - circle.point.y) ** 2
      );
      const minDistance = this.radius + circle.radius;
      if (this.id !== circle.id && distance <= minDistance) {
        console.log(`충돌`);
      }
    });
  }

  unitVector(x: number, y: number): { x: number; y: number } {
    const ratio = Math.sqrt(1 / (x ** 2 + y ** 2));
    return {
      x: x * ratio,
      y: y * ratio,
    };
  }
}
