import Player from "./player.js";
import InputHandler from "./inputHandler.js";
import Enemy from "./enemy.js";
import Arrow from "./arrow.js";
import UI from "./UI.js";
/**
 * Ajouter le fonction de suppress
 */

class Game {
  constructor(lives) {
    this.canvas = null;
    this.ctx = null;
    this.init();
    this.player = new Player(this.canvas, this.ctx, 10);
    this.input = new InputHandler(this.player);
    this.ui = new UI(this.canvas, this.ctx);
    this.frame = 0;
    this.enemies = [];
    this.waves = [5, 10, 15];
    this.waveNumber = 0;
    this.finishedWave = false;
  }
  init() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = 1000;
    this.canvas.height = 800;
  }
  // Runed on every animation frame
  update() {
    console.log(this.frame);
    this.player.update(this.input.keys);
    if (!this.enemies.length) {
      this.ui.nextWave(this.waveNumber + 1);
      if (this.waveNumber === 4) {
        alert("you won");
        cancelAnimationFrame(this.frame);
        return;
      }
      this.waveGenerator();
    }
    this.enemies.forEach((enemy) => {
      enemy.move();
      if (
        this.checkCollision(enemy, this.player) &&
        this.player.attackMode === true
      ) {
        this.enemies.splice(this.enemies.indexOf(enemy), 1);
      }
      // Le joueur perd une vie si touché par enemy PAS SUR DE GARDER CETTE FONCTION
      //   } else if (
      //     this.checkCollision(enemy, this.player) &&
      //     this.player.attackMode === false
      //   ) {
      //     this.player.lives -= 1;
      //     console.log(this.player.lives);
      //   }
      enemy.attack();
      enemy.arrows.forEach((arrow) => {
        if (arrow.checkCollision(this.player)) {
          this.player.lives -= 1;
          arrow.markedForDeletion = true;
        }
      });
      enemy.arrows = enemy.arrows.filter((arrow) => !arrow.markedForDeletion);
      enemy.isOutOfBound(this.player);
    });
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
    if (this.player.lives === 0) {
      cancelAnimationFrame(this.frame);
      alert("Game Over");
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
  // Première version du générateur d'enemis, tourne en continue
  //   randomEnemySpawn(number) {
  //     for (let i = 0; i < number; i++) {
  //       if (Math.random() > 0.991) {
  //         this.enemies.push(new Enemy(this.canvas, this.ctx, this));
  //         console.log(this.enemies);
  //       }
  //     }
  //   }
  waveGenerator() {
    console.log("<<<<<<<<<<<<<<<<<");
    if (this.frame % 99) {
      return;
    }
    for (let i = 0; i < this.waves[this.waveNumber]; i++) {
      this.enemies.push(new Enemy(this.canvas, this.ctx, this));
    }
    this.waveNumber += 1;
  }

  checkCollision(enemy, player) {
    const isInX =
      enemy.rightEdge() >= player.leftEdge() &&
      enemy.leftEdge() <= player.rightEdge();
    const isInY =
      enemy.topEdge() <= player.bottomEdge() &&
      enemy.bottomEdge() >= player.topEdge();
    return isInX && isInY;
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
