/**
 * Penser à ajouter markedfordeletion
 */
import Arrow from "./arrow.js";

class Enemy {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.lives = 1;
    this.x = this.canvas.width;
    this.y = Math.floor(Math.random() * this.canvas.height) - 60;
    this.speedX = -0.6;
    this.width = 64;
    this.height = 2000 / 30;
    this.arrows = [];
    this.ismoving = true;
  }

  draw() {
    this.ctx.fillStyle = "red";
    this.ctx.strokeStyle = "red";
    this.ctx.strokeRect(this.x, this.y, this.width, this.height);
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.arrows.forEach((arrow) => {
      arrow.draw();
      arrow.move();
    });
  }
  attack() {
    for (let i = 0; i < 5; i++) {
      this.arrows.push(
        new Arrow(this.canvas, this.ctx, this.x, this.y + this.height / 2)
      );
      console.log("attack");
    }

    console.log("coucou");
  }
  move() {
    this.x += this.speedX;
  }
  stopMove() {
    this.speedX = 0;
  }
  bottomEdge() {
    return this.y + this.height;
  }

  leftEdge() {
    return this.x;
  }
  rightEdge() {
    return this.x + this.width;
  }
  topEdge() {
    return this.y;
  }
}

export default Enemy;
