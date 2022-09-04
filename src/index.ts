/** @format */

import { Circle } from './model/index';
import { randomRangeInteger } from './util/index';

class View {
  background() {
    const main = document.body;
    const mainStyle = main.style;
    mainStyle.backgroundColor = 'Gainsboro';
    mainStyle.display = 'flex';
    mainStyle.justifyContent = 'center';

    return main;
  }

  canvas() {
    const canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    canvas.width = 1000;
    canvas.height = 500;
    canvas.style.backgroundColor = 'white';

    return canvas;
  }

  locateCircle(context: CanvasRenderingContext2D, circle: Circle) {
    context.beginPath();
    // context.arc(x, y, 10px < radius < 20px, 시작 각도, 끝 각도);
    context.arc(circle.point.x, circle.point.y, circle.radius, 0, Math.PI * 2);
    context.fillStyle = 'black';
    context.fill();
  }

  draw(canvas: HTMLCanvasElement, circles: Circle[]) {
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    circles.forEach((circle: Circle) => {
      this.locateCircle(context, circle);
      circle.move();
      circle.bouncingWall();
    });
    requestAnimationFrame(() => this.draw(canvas, circles));
  }

  run() {
    const main = this.background();
    const canvas = this.canvas();
    const circlesNum = randomRangeInteger(10, 20);
    const circles = [];
    for (let count = 0; count < circlesNum; count++) {
      circles.push(new Circle(canvas));
    }
    this.draw(canvas, circles);
    main.appendChild(canvas);
  }
}

const view = new View();
view.run();
