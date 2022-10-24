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
    this.x = this.canvas.width;
    this.y = Math.floor(Math.random() * this.canvas.height) - 60;
    this.speedX = -0.6;
    this.width = 64;
    this.height = 2000 / 30;
    this.ismoving = true;
    this.arrows = [];
    this.markedForDeletion = false;
    this.numOfArrows = 2;
    this.image = document.getElementById("enemy");
    this.frameX = 1;
    this.frameY = 1;
  }

  draw() {
    //this.ctx.fillStyle = "red";
    this.ctx.strokeStyle = "red";
    this.ctx.strokeRect(this.x, this.y, this.width, this.height);
    //this.ctx.fillRect(this.x, this.y, this.width, this.height);
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
    this.arrows.forEach((arrow) => {
      arrow.draw();
      arrow.move();
    });
  }
  attack(player) {
    if (!this.numOfArrows || this.game.frame % 99) {
      return;
    }
    setTimeout(() => {
      this.stopMove();
      this.arrows.push(new Arrow(this.canvas, this.ctx, this.x, this.y));
    }, Math.ceil(Math.random() * 3000) + 1000);
    this.numOfArrows--;
    this.arrows.forEach((arrow) => {
      if (arrow.checkCollision(arrow, player)) {
        player.life -= 1;
        arrow.markedForDeletion = true;
      }
    });
    this.arrows = this.arrows.filter((arrow) => !arrow.markedForDeletion);
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
