/** @format */

import { randomRangeRealNumber } from '../../util/index';

interface Coordinate {
  x: number;
  y: number;
}

export default class Circle {
  canvas: HTMLCanvasElement;
  id: number;
  radius: number = randomRangeRealNumber(10, 20);
  speed: number = randomRangeRealNumber(200, 400) / 60;
  point: Coordinate;
  direction: Coordinate = {
    x: this.unitDirection().x,
    y: this.unitDirection().y,
  };

  constructor(id: number, canvas: HTMLCanvasElement) {
    this.id = id;
    this.canvas = canvas;
    this.point = {
      x: randomRangeRealNumber(this.radius, canvas.width - this.radius),
      y: randomRangeRealNumber(this.radius, canvas.height - this.radius),
    };
  }

  private unitDirection() {
    return {
      x: this.unitVector(this.randomDirection().x, this.randomDirection().y).x,
      y: this.unitVector(this.randomDirection().x, this.randomDirection().y).y,
    };
  }

  private randomDirection() {
    return {
      x: Math.cos((Math.PI / 180) * randomRangeRealNumber(0, 360)),
      y: Math.sin((Math.PI / 180) * randomRangeRealNumber(0, 360)),
    };
  }

  move() {
    this.point.x +=
      this.direction.x *
      this.speed *
      this.unitRatio(this.direction.x, this.direction.y);
    this.point.y +=
      this.direction.y *
      this.speed *
      this.unitRatio(this.direction.x, this.direction.y);
  }

  bouncingWall() {
    if (this.collisionHorizontalWall()) {
      this.direction.x = -this.direction.x;
    }
    if (this.collisionVerticalWall()) {
      this.direction.y = -this.direction.y;
    }
  }

  private collisionHorizontalWall() {
    return (
      this.point.x >= this.canvas.width - this.radius ||
      this.point.x <= this.radius
    );
  }

  private collisionVerticalWall() {
    return (
      this.point.y >= this.canvas.height - this.radius ||
      this.point.y <= this.radius
    );
  }

  bouncingCircle(circles: Circle[]) {
    circles.forEach((circle: Circle) => {
      const warnDistance = this.distanceCircles(circle);
      const minDistance = this.radius + circle.radius;
      if (this.id !== circle.id && warnDistance <= minDistance) {
        console.log(`충돌`);
      }
    });
  }

  private distanceCircles(circle: Circle) {
    return Math.sqrt(
      (this.point.x - circle.point.x) ** 2 +
        (this.point.y - circle.point.y) ** 2
    );
  }

  private unitVector(x: number, y: number): { x: number; y: number } {
    const ratio = this.unitRatio(x, y);
    return {
      x: x * ratio,
      y: y * ratio,
    };
  }

  private unitRatio(x: number, y: number) {
    return Math.sqrt(1 / (x ** 2 + y ** 2));
  }
}
