class Arrow {
  constructor(canvas, ctx, x, y) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = x;
    this.y = y + 30;
    this.width = 64 * 2;
    this.height = (2000 / 30) * 2;
    this.hitboxWidth = 50;
    this.hitboxHeight = 5;
    this.speedX = -3;
    this.image = document.getElementById("enemy");
    this.frameX = 8.5;
    this.frameY = 1;
    this.markerForDeletion = false;
  }
  draw() {
    // this.ctx.strokeStyle = "blue";
    // this.ctx.strokeRect(this.x, this.y, this.width, this.height);
    //this.hitbox(this.hitboxWidth, this.hitboxHeight);
    this.ctx.drawImage(
      this.image,
      this.frameX * this.width + 40,
      this.frameY * this.height + 60,
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
    this.ctx.strokeRect(this.x, this.y, width, height);
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
  checkCollision(player) {
    const isInX =
      this.rightEdge() >= player.leftEdge() &&
      this.leftEdge() <= player.rightEdge();
    const isInY =
      this.topEdge() <= player.bottomEdge() &&
      this.bottomEdge() >= player.topEdge();
    return isInX && isInY;
  }
}

export default Arrow;
