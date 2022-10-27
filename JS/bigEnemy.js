class BigEnemy {
  constructor(canvas, ctx, game) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.game = game;
    this.lives = 10;
    this.x = this.canvas.width + Math.random() * 300;
    this.y =
      Math.floor((Math.random() * this.canvas.height) / 2) +
      this.canvas.height / 2;
    // this.x = this.canvas.width / 2;
    // this.y = this.canvas.height / 2;
    this.speedX = 0;
    this.width = 100;
    this.height = 100;
    // Images setup
    this.frameX = 0;
    this.frameY = 0;
    this.attackFrameX = 0.2;
    this.attackFrameY = 0;
    this.attackMaxFrame = 7;
    this.maxFrame = 3;
    this.counter = 3;
    this.image = document.getElementById("bigEnemy");
    this.attackImage = document.getElementById("bigAttack");
    this.hitboxWidth = this.width;
    this.hitboxHeight = this.height;
    this.type = "bigEnemy";
    this.attackMode = false;
    // Sounds setup
    this.bigEnemyDeathScream = document.createElement("audio");
    this.bigEnemyDeathScream.src = "../audios/Enemy/bigEnemyScreamOK.mp3";
  }
  update(player) {
    if (this.attackMode) {
      if (this.counter > 0) {
        this.counter -= 1;
      } else {
        if (this.attackFrameX < this.attackMaxFrame) {
          this.attackFrameX++;
        } else {
          this.attackFrameX = 0.2;
          player.hurtScream();
          player.lives -= 1;
          this.attackMode = false;
        }
        this.counter = 3;
      }
    } else {
      if (this.counter > 0) {
        this.counter -= 1;
      } else {
        if (this.frameX < this.maxFrame) {
          this.frameX++;
        } else {
          this.frameX = 0;
        }
        this.counter = 3;
      }
    }
  }
  draw() {
    //   this.ctx.fillStyle = "red";
    // this.hitbox(this.hitboxWidth, this.hitboxHeight);
    // this.ctx.strokeStyle = "red";
    // this.ctx.strokeRect(this.x, this.y, this.width, this.height);
    //this.ctx.fillRect(this.x, this.y, this.width, this.height);
    if (this.attackMode) {
      this.ctx.drawImage(
        this.attackImage,
        this.attackFrameX * this.width,
        this.attackFrameY * this.height,
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
  }
  move() {
    this.x += this.speedX;
  }
  screamToDeath() {
    this.bigEnemyDeathScream.play();
  }
  isOutOfBound(player) {
    if (this.x < 0 - this.width) {
      player.lives -= 1;
      this.markedForDeletion = true;
    }
  }
  hitbox(width, height) {
    this.ctx.strokeStyle = "red";
    this.ctx.strokeRect(this.x, this.y, width, height);
  }
  // Use of setTimeout to delay the big enemy shift
  followPlayer(player) {
    if (this.x > player.x + 30) {
      setTimeout(() => {
        this.x--;
      }, Math.floor(Math.random() * 500) + 300);
      if (this.y > player.y) {
        setTimeout(() => {
          this.y--;
        }, Math.floor(Math.random() * 500) + 300);
      } else if (this.y < player.y) {
        setTimeout(() => {
          this.y++;
        }, Math.floor(Math.random() * 500) + 300);
      }
    } else if (this.x < player.x + 10) {
      setTimeout(() => {
        this.x++;
      }, Math.floor(Math.random() * 500) + 300);

      if (this.y > player.y) {
        setTimeout(() => {
          this.y--;
        }, Math.floor(Math.random() * 500) + 300);
      } else if (this.y < player.y) {
        setTimeout(() => {
          this.y++;
        }, Math.floor(Math.random() * 500) + 300);
      }
    }
  }
  // Declaration of the hitbox edges
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
export default BigEnemy;
