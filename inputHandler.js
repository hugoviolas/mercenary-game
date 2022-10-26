class InputHandler {
  constructor(player) {
    this.keys = [];

    window.addEventListener("keydown", (event) => {
      
      if (
        (event.code === "ArrowRight" || event.code === "KeyD") &&
        this.keys.indexOf(event.code) === -1
      ) {
        this.keys.push(event.code);
      } else if (
        (event.code === "ArrowLeft" || event.code === "KeyA") &&
        this.keys.indexOf(event.code) === -1
      ) {
        this.keys.push(event.code);
      } else if (
        (event.code === "ArrowUp" || event.code === "KeyW") &&
        this.keys.indexOf(event.code) === -1
      ) {
        this.keys.push(event.code);
      } else if (
        (event.code === "ArrowDown" || event.code === "KeyS") &&
        this.keys.indexOf(event.code) === -1
      ) {
        this.keys.push(event.code);
      } else if (
        event.code === "Space" &&
        this.keys.indexOf(event.code) === -1
      ) {
        this.keys.push(event.code);
      }
    });
    window.addEventListener("keyup", (event) => {
      if (event.code === "ArrowRight" || event.code === "KeyD") {
        player.stopFootstepsSound();
        this.keys.splice(this.keys.indexOf(event.code), 1);
      } else if (event.code === "ArrowLeft" || event.code === "KeyA") {
        player.stopFootstepsSound();
        this.keys.splice(this.keys.indexOf(event.code), 1);
      } else if (event.code === "ArrowUp" || event.code === "KeyW") {
        player.stopFootstepsSound();
        this.keys.splice(this.keys.indexOf(event.code), 1);
      } else if (event.code === "ArrowDown" || event.code === "KeyS") {
        player.stopFootstepsSound();
        this.keys.splice(this.keys.indexOf(event.code), 1);
      } else if (event.code === "Space") {
        player.stopFootstepsSound();
        this.keys.splice(this.keys.indexOf(event.code), 1);
      }
      //   } else if (event.code === "Space") {
      //     this.keys.splice(this.keys.indexOf(event.code), 1);
      //     player.width -= player.attackwidth;
      //   }
    });

  }
}

export default InputHandler;
