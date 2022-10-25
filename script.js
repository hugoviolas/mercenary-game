import Game from "./game.js";
const canvas = document.getElementById("canvas");
const easy = document.getElementById("easy");
const normal = document.getElementById("normal");
const hardcore = document.getElementById("hardcore");
const button = document.querySelectorAll("#button");
const homepage = document.querySelector(".homepage");

// Faire 1 seul eventListener, un switchCase avec les différents modes en fonction du textContent du bouton

easy.addEventListener("click", () => {
  button.forEach((button) => {
    button.classList.toggle("hide");
  });
  easy.classList.toggle("hide");
  canvas.classList.toggle("hide");
  homepage.classList.toggle("hide");
  let lastTime = 0;
  const game = new Game();

  function animate(frame) {
    const deltaTime = frame - lastTime;
    lastTime = frame;
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    game.frame = requestAnimationFrame(animate);
    game.update(deltaTime);
    game.draw();
    // console.log(deltaTime);
    // console.log(frame);
  }

  animate(0);
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
    requestAnimationFrame(animate);
    game.update();
    game.draw();
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
    requestAnimationFrame(animate);
    game.update();
    game.draw();
  }
  animate();
});

button.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("hide");
    console.log("bouton");
  });
});
