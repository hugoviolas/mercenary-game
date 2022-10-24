/**
 * Penser à ajouter markedfordeletion
 */
import Arrow from "./arrow.js";
import Game from "./game.js";

class Enemy {
  constructor(canvas, ctx, game) {
    this.canvas = canvas;
    this.game = game;
    this.ctx = ctx;
    this.lives = 1;
    this.x = this.canvas.width + Math.random() * 300;
    this.y =
      Math.floor((Math.random() * this.canvas.height) / 2) +
      (this.canvas.height / 2 - 66);
    this.speedX = -1;
    this.width = 128;
    this.height = (2000 / 30) * 2;
    this.hitboxWidth = this.width - 70;
    this.hitboxHeight = this.height - 70;
    this.ismoving = true;
    this.arrows = [];
    this.markedForDeletion = false;
    this.numOfArrows = 3;
    this.image = document.getElementById("enemy");
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 5;
    this.counter = 3;
    this.isShooting = false;
  }
  update() {
    if (this.isShooting) {
      return;
    }
    if (this.counter > 0) {
      this.counter -= 1;
    } else {
      if (this.frameX < 20 && this.frameX < this.maxFrame) {
        this.frameX++;
      } else {
        this.frameX = 0;
      }
      this.counter = 3;
    }
  }
  draw() {
    //this.ctx.fillStyle = "red";
    // this.ctx.strokeStyle = "red";
    // this.ctx.strokeRect(this.x, this.y, this.width, this.height);
    //this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.hitbox(this.hitboxWidth, this.hitboxHeight);
    if (this.isShooting) {
      this.ctx.drawImage(
        this.image,
        2 * this.width,
        1 * this.height,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
      console.log("shoot");
    } else {
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
    this.arrows.forEach((arrow) => {
      arrow.draw();
      arrow.move();
    });
  }
  hitbox(width, height) {
    this.ctx.fillStyle = "black";
    this.ctx.strokeStyle = "red";
    this.ctx.strokeRect(this.x + 30, this.y + 30, width, height);
  }
  attack() {
    if (!this.numOfArrows || this.game.frame % 99) {
      return;
    }
    if (this.x < this.canvas.width) {
      setTimeout(() => {
        this.isShooting = true;
        this.stopMove();
        this.arrows.push(new Arrow(this.canvas, this.ctx, this.x, this.y));
        setTimeout(() => {
          this.speedX = -0.6;
          this.isShooting = false;
        }, 1000);
      }, Math.ceil(Math.random() * 8000) + 1000);
      this.numOfArrows--;
    }
  }
  isOutOfBound(player) {
    if (this.x < 0 - this.width) {
      player.lives -= 1;
      this.markedForDeletion = true;
      console.log(player.lives);
    }
  }
  move() {
    this.x += this.speedX;
  }
  stopMove() {
    this.speedX = 0;
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
}

export default Enemy;
