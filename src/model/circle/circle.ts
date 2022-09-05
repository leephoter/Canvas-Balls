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

  unitDirection() {
    return {
      x: this.unitVector(this.randomDirection().x, this.randomDirection().y).x,
      y: this.unitVector(this.randomDirection().x, this.randomDirection().y).y,
    };
  }

  randomDirection() {
    return {
      x: Math.cos((Math.PI / 180) * randomRangeRealNumber(0, 360)),
      y: Math.sin((Math.PI / 180) * randomRangeRealNumber(0, 360)),
    };
  }

  move() {
    this.point.x += this.direction.x * this.speed;
    this.point.y += this.direction.y * this.speed;
  }

  bouncingWall() {
    if (this.collisionHorizontalWall()) {
      this.direction.x = -this.direction.x;
    }
    if (this.collisionVerticalWall()) {
      this.direction.y = -this.direction.y;
    }
  }

  collisionHorizontalWall() {
    return (
      this.point.x >= this.canvas.width - this.radius ||
      this.point.x <= this.radius
    );
  }

  collisionVerticalWall() {
    return (
      this.point.y >= this.canvas.height - this.radius ||
      this.point.y <= this.radius
    );
  }

  bouncingCircle(circles: Circle[]) {
    circles.forEach((circle: Circle) => {
      const distance = this.distanceCircles(circle);
      const minDistance = this.radius + circle.radius;
      if (this.id !== circle.id && distance <= minDistance) {
        console.log(`충돌`);
      }
    });
  }

  distanceCircles(circle: Circle) {
    return Math.sqrt(
      (this.point.x - circle.point.x) ** 2 +
        (this.point.y - circle.point.y) ** 2
    );
  }

  unitVector(x: number, y: number): { x: number; y: number } {
    const ratio = Math.sqrt(1 / (x ** 2 + y ** 2));
    return {
      x: x * ratio,
      y: y * ratio,
    };
  }
}
