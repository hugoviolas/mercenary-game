class Arrow {
  constructor(canvas, ctx, x, y) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = 64;
    this.height = 2000 / 30;
    this.hitboxWidth = 25;
    this.hitboxHeight = 20;
    this.speedX = -3;
    this.image = document.getElementById("enemy");
    this.frameX = 8.5;
    this.frameY = 1;
    this.markerForDeletion = false;
  }
  draw() {
    // this.ctx.strokeStyle = "blue";
    // this.ctx.strokeRect(this.x, this.y, this.width, this.height);
    this.hitbox(this.hitboxWidth, this.hitboxHeight);
    this.ctx.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  hitbox(width, height) {
    this.ctx.fillStyle = "black";
    this.ctx.strokeStyle = "red";
    this.ctx.strokeRect(this.x + 20, this.y + 20, width, height);
  }
  move() {
    this.x += this.speedX;
  }
  bottomEdge() {
    return this.y + this.hitboxHeight;
  }

  leftEdge() {
    return this.x;
  }
  rightEdge() {
    return this.x + this.hitboxWidth;
  }
  topEdge() {
    return this.y;
  }
  checkCollision(this, player) {
    const isInX =
      enemy.rightEdge() >= player.leftEdge() &&
      enemy.leftEdge() <= player.rightEdge();
    const isInY =
      enemy.topEdge() <= player.bottomEdge() &&
      enemy.bottomEdge() >= player.topEdge();
    return isInX && isInY;
  }
}

export default Arrow;
