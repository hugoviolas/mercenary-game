class Arrow {
  constructor(canvas, ctx, x, y) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = 3;
    this.height = 1;
    this.speedX = -1;
  }
  draw() {
    this.ctx.strokeStyle = "blue";
    this.ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
  move() {
    this.x += this.speedX;
  }
}

export default Arrow;
