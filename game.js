import Player from "./player.js";
import InputHandler from "./inputHandler.js";
import Enemy from "./enemy.js";
import BigEnemy from "./bigEnemy.js";
import UI from "./UI.js";

class Game {
  constructor(lives) {
    this.canvas = null;
    this.ctx = null;
    this.init();
    this.player = new Player(this.canvas, this.ctx, lives);
    this.input = new InputHandler(this.player);
    this.ui = new UI(this.canvas, this.ctx);
    this.frame = 0;
    this.time = null;
    this.enemies = [];
    this.waves = [3, 7, 10, 12, 14];
    this.waveNumber = 0;
    this.finishedWave = false;
    this.gameover = false;
    this.messageTimer = 0;
    this.maxMessageTimer = 5000;
    this.counter = 0;
  }
  init() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = 1000;
    this.canvas.height = 800;
  }
  // Runed on every animation frame
  update(deltaTime) {
    this.player.update(this.input.keys);
    if (
      this.messageTimer < this.maxMessageTimer &&
      !this.gameover &&
      this.waveNumber !== 0
    ) {
      // Shows a wave message during 5 seconds
      this.messageTimer += deltaTime;
      this.ui.nextWave(this.waveNumber);
    } else {
      if (!this.enemies.length) {
        if (this.waveNumber === 1) {
          //this.gameover = true;
          cancelAnimationFrame(this.frame);
          this.reloadGame();
          this.ui.win(this.waveNumber);
          return;
        }
        this.waveGenerator();
      }
    }
    this.enemies.forEach((enemy) => {
      enemy.update(this.player);
      enemy.move();

      if (this.checkCollision(enemy, this.player) && this.player.attackMode) {
        enemy.lives -= 1;
        if (enemy.lives === 0) {
          this.enemies.splice(this.enemies.indexOf(enemy), 1);
        }
      }

      if (enemy.type !== "bigEnemy") {
        enemy.attack();
        enemy.arrows.forEach((arrow) => {
          if (arrow.checkCollision(this.player)) {
            this.player.lives -= 1;
            arrow.markedForDeletion = true;
          }
        });
        enemy.arrows = enemy.arrows.filter((arrow) => !arrow.markedForDeletion);
        enemy.isOutOfBound(this.player);
      } else {
        if (this.checkCollision(enemy, this.player)) {
          enemy.attackMode = true;
        }
        enemy.followPlayer(this.player);
      }
    });
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
    if (this.player.lives < 1) {
      this.reloadGame();
      this.ui.lose();
      cancelAnimationFrame(this.frame);
      return;
    }
  }
  // Draw all images
  draw() {
    this.player.draw();
    this.enemies.forEach((enemy) => {
      enemy.draw();
    });
    this.ui.draw(this.player);
  }

  waveGenerator() {
    if (this.frame % 99) {
      return;
    }
    for (let i = 0; i < this.waves[this.waveNumber]; i++) {
      if (Math.random() < 0.8) {
        this.enemies.push(new Enemy(this.canvas, this.ctx, this));
      } else {
        this.enemies.push(new BigEnemy(this.canvas, this.ctx, this));
      }
    }
    this.waveNumber += 1;
    this.messageTimer = 0;
  }

  checkCollision(enemy, player) {
    const isInX =
      (enemy.rightEdge() >= player.leftEdge() &&
        enemy.leftEdge() <= player.leftEdge()) ||
      (enemy.rightEdge() >= player.rightEdge() &&
        enemy.leftEdge() <= player.rightEdge()) ||
      (enemy.rightEdge() >= player.rightEdge() &&
        enemy.leftEdge() <= player.leftEdge());
    const isInY =
      (enemy.topEdge() <= player.topEdge() &&
        enemy.bottomEdge() >= player.topEdge()) ||
      (enemy.topEdge() <= player.bottomEdge() &&
        enemy.bottomEdge() >= player.bottomEdge()) ||
      (enemy.topEdge() <= player.topEdge() &&
        enemy.bottomEdge() >= player.bottomEdge());
    return isInX && isInY;
  }
  reloadGame() {
    const reloadButton = document.querySelector(".reload");
    const canvas = document.getElementById("canvas");
    const homepage = document.querySelector(".homepage");
    const button = document.querySelectorAll("#buttons");
    reloadButton.classList.toggle("hide");
    reloadButton.addEventListener(
      "click",
      () => {
        canvas.classList.toggle("hide");
        homepage.classList.toggle("hide");
        button.forEach((btn) => {
          btn.classList.toggle("hide");
        });
        reloadButton.classList.toggle("hide");
      },
      { once: true }
    );
  }
  //   startGame() {
  //     console.log("Game Started");
  //     setInterval(() => {
  //       this.frame++;
  //       this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.height);
  //       //this.player.draw();
  //       this.player.move();
  //       //this.arrow.draw();
  //       this.enemies.forEach((enemy) => {
  //         enemy.draw();
  //         if (Math.random() > 0.9) {
  //           enemy.attack();
  //         }
  //         if (this.checkCollision(enemy, this.player) && this.player.attackMode) {
  //           this.enemies.splice(this.enemies.indexOf(enemy), 1);
  //         }
  //         enemy.move();
  //       });
  //     }, 1000 / 60);
  //   }
  //   movingPlayer() {
  //     document.addEventListener("keydown", (event) => {
  //       if (event.code === "ArrowRight" || event.code === "KeyD") {
  //         this.player.speedX = 1;
  //       } else if (event.code === "ArrowLeft" || event.code === "KeyA") {
  //         this.player.speedX = -1;
  //       } else if (event.code === "ArrowUp" || event.code === "KeyW") {
  //         this.player.speedY = -1;
  //       } else if (event.code === "ArrowDown" || event.code === "KeyS") {
  //         this.player.speedY = 1;
  //       }
  //     });
  //     document.addEventListener("keyup", (event) => {
  //       if (event.code === "ArrowRight" || event.code === "KeyD") {
  //         this.player.speedX = 0;
  //       } else if (event.code === "ArrowLeft" || event.code === "KeyA") {
  //         this.player.speedX = 0;
  //       } else if (event.code === "ArrowUp" || event.code === "KeyW") {
  //         this.player.speedY = 0;
  //       } else if (event.code === "ArrowDown" || event.code === "KeyS") {
  //         this.player.speedY = 0;
  //       }
  //     });
  //   }
  //   playerAttack() {
  //     document.addEventListener("keydown", (event) => {
  //       if (event.code === "Space") {
  //         this.player.attack();
  //         this.player.attackMode = true;
  //       }
  //     });
  //     document.addEventListener("keyup", (event) => {
  //       if (event.code === "Space") {
  //         this.player.width -= this.player.attackWidth;
  //         this.player.attackMode = false;
  //       }
  //     });
  //   }
}
export default Game;
