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
  direction: Coordinate;

  constructor(id: number, canvas: HTMLCanvasElement) {
    this.id = id;
    this.canvas = canvas;
    this.point = {
      x: randomRangeRealNumber(this.radius, canvas.width - this.radius),
      y: randomRangeRealNumber(this.radius, canvas.height - this.radius),
    };
    this.direction = this.unitDirection();
  }

  private unitDirection() {
    return {
      x: this.unitVector(this.randomDirection()).x,
      y: this.unitVector(this.randomDirection()).y,
    };
  }

  private randomDirection() {
    return {
      x: Math.cos((Math.PI / 180) * randomRangeRealNumber(0, 360)),
      y: Math.sin((Math.PI / 180) * randomRangeRealNumber(0, 360)),
    };
  }

  move() {
    const ratio =
      this.speed * this.unitRatio(this.direction.x, this.direction.y);

    this.point.x += this.direction.x * ratio;
    this.point.y += this.direction.y * ratio;
  }

  bouncingWall() {
    const direction = this.direction;

    if (this.collisionHorizontalWall()) {
      direction.x = -direction.x;
    }
    if (this.collisionVerticalWall()) {
      direction.y = -direction.y;
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
        this.direction = this.unitReflection(circle);
        circle.direction = this.otherUnitReflection(circle);
      }
    });
  }

  private unitReflection(circle: Circle) {
    const diffX = this.point.x - circle.point.x;
    const diffY = this.point.y - circle.point.y;
    const normalVector = this.unitVector({ x: diffX, y: diffY });
    return {
      x:
        this.direction.x -
        2 * (this.direction.x * normalVector.x) * normalVector.x,
      y:
        this.direction.y -
        2 * (this.direction.y * normalVector.y) * normalVector.y,
    };
  }

  private otherUnitReflection(circle: Circle) {
    const diffX = circle.point.x - this.point.x;
    const diffY = circle.point.y - this.point.y;
    const normalVector = circle.unitVector({ x: diffX, y: diffY });
    return {
      x:
        circle.direction.x -
        2 * (circle.direction.x * normalVector.x) * normalVector.x,
      y:
        circle.direction.y -
        2 * (circle.direction.y * normalVector.y) * normalVector.y,
    };
  }

  private distanceCircles(circle: Circle) {
    return Math.sqrt(
      (this.point.x - circle.point.x) ** 2 +
        (this.point.y - circle.point.y) ** 2
    );
  }

  private unitVector(vector: Coordinate): { x: number; y: number } {
    const ratio = this.unitRatio(vector.x, vector.y);
    return {
      x: vector.x * ratio,
      y: vector.y * ratio,
    };
  }

  private unitRatio(x: number, y: number) {
    return Math.sqrt(1 / (x ** 2 + y ** 2));
  }
}
