/**
 * Penser à créer class enemy follower
 */
import Arrow from "./arrow.js";

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
    this.speedX = -1.5;
    this.width = 128;
    this.height = 130;
    this.hitboxWidth = this.width - 70;
    this.hitboxHeight = this.height - 70;
    this.ismoving = true;
    this.arrows = [];
    this.markedForDeletion = false;
    this.numOfArrows = 3;
    // Images setup
    this.image = document.getElementById("enemy");
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 5;
    this.counter = 3;
    this.isShooting = false;
    this.type = "bow";
    //Sound setup
    this.smallEnemyDeathSound = document.createElement("audio");
    this.smallEnemyDeathSound.src = "../audios/Enemy/smallEnemyDeathSound.mp3";
    this.arrowSwoosh = document.createElement("audio");
    this.arrowSwoosh.src = "../audios/Enemy/arrowSwooshOK.mp3";
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
    //this.hitbox(this.hitboxWidth, this.hitboxHeight);
    if (this.isShooting) {
      this.ctx.drawImage(
        this.image,
        2 * this.width + 30,
        this.height + 30,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
    } else {
      this.ctx.drawImage(
        this.image,
        this.frameX * this.width + 30,
        this.frameY * this.height + 30,
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
    this.ctx.strokeStyle = "yellow";
    this.ctx.strokeRect(this.x, this.y, width, height);
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
        this.arrowSwoosh.play();
        setTimeout(() => {
          this.speedX = -1.5;
          this.isShooting = false;
        }, 1000);
      }, Math.ceil(Math.random() * 8000) + 1000);
      this.numOfArrows--;
    }
  }
  screamToDeath() {
    this.smallEnemyDeathSound.play();
  }
  isOutOfBound(player) {
    if (this.x < 0 - this.width) {
      player.lives -= 1;
      this.markedForDeletion = true;
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
