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
    this.player = new Player(this.canvas, this.ctx, 19);
    this.input = new InputHandler(this.player);
    this.ui = new UI(this.canvas, this.ctx);
    this.frames = 0;
    this.enemies = [];
  }
  init() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = 1000;
    this.canvas.height = 800;
  }
  // Runed on every animation frame
  update() {
    this.player.update(this.input.keys);
    this.randomEnemySpawn();
    this.enemies.forEach((enemy) => {
      enemy.move();
      if (
        this.checkCollision(enemy, this.player) &&
        this.player.attackMode === true
      ) {
        this.enemies.splice(this.enemies.indexOf(enemy), 1);
      }
      enemy.attack();
    });
  }
  // Draw all images
  draw() {
    this.player.draw();
    this.enemies.forEach((enemy) => {
      enemy.draw();
    });
    this.ui.draw();
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
  randomEnemySpawn() {
    if (Math.random() > 0.991) {
      this.enemies.push(new Enemy(this.canvas, this.ctx));
      console.log(this.enemies);
    }
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
}
export default Game;
