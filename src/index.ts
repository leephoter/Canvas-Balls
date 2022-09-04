/** @format */

import { Circle } from './model/index';

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

  run() {
    const main = this.background();
    const canvas = this.canvas();

    this.locateCircle(canvas.getContext('2d'), new Circle());
    main.appendChild(canvas);
  }
}

const view = new View();
view.run();
