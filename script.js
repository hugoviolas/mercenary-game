import Game from "./game.js";
const canvas = document.getElementById("canvas");
const easy = document.getElementById("easy");
const normal = document.getElementById("normal");
const hardcore = document.getElementById("hardcore");
const button = document.querySelectorAll("button");
const homepage = document.querySelector(".homepage");

easy.addEventListener("click", () => {
  button.forEach((button) => {
    button.classList.toggle("hide");
  });
  easy.classList.toggle("hide");
  canvas.classList.toggle("hide");
  homepage.classList.toggle("hide");
  const game = new Game();
  function animate() {
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    game.update();
    game.draw();
    requestAnimationFrame(animate);
  }
  animate();
});

normal.addEventListener("click", () => {
  canvas.classList.toggle("hide");
  button.forEach((button) => {
    button.classList.toggle("hide");
  });
  homepage.classList.toggle("hide");
  const game = new Game();
  function animate() {
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    game.update();
    game.draw();
    requestAnimationFrame(animate);
  }
  animate();
});

hardcore.addEventListener("click", () => {
  canvas.classList.toggle("hide");
  button.forEach((button) => {
    button.classList.toggle("hide");
  });
  homepage.classList.toggle("hide");
  const game = new Game();
  function animate() {
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    game.update();
    game.draw();
    requestAnimationFrame(animate);
  }
  animate();
});

button.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("hide");
    console.log("bouton");
  });
});
