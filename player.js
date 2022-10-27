class Player {
  constructor(canvas, ctx, lives) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.lives = lives;
    this.x = 10;
    this.y = this.canvas.height / 2;
    this.width = 128;
    this.height = 133;
    this.hitboxWidth = this.width - 90;
    this.hitboxHeight = this.height - 70;
    this.attackWidth = 70;
    this.speedX = 4;
    this.speedY = 4;
    this.attackMode = false;
    this.forward = true;
    // Frames settings for forward animation
    this.image = document.getElementById("player");
    this.frameX = 0;
    this.frameY = 8.6;
    this.maxFrame = 5;
    this.counter = 3;
    // Frames settings for backwards animation
    this.reversedImage = document.getElementById("reversedPlayer");
    this.backwardFrameX = -0.2;
    this.backwardFrameY = -0.3;
    this.backwardMaxFrame = 5;
    // Frames settings for attack forward animation
    this.attackImage = document.getElementById("attackPlayer");
    this.attackFrameX = 3;
    this.attackFrameY = -0.3;
    // this.attackMaxFrame = 5;
    // this.attackCounter = 5;
    // Frames settings for attack backwards animation
    this.attackImageBackwards = document.getElementById(
      "attackPlayerBackwards"
    );
    this.attackBackwardsFrameX = 0.6;
    this.attackBackwardsFrameY = -0.3;
    // Audio setup
    this.swoosh1 = document.createElement("audio");
    this.swoosh1.src = "./audios/Player/swooshOK.mp3";
    this.swoosh2 = document.createElement("audio");
    this.swoosh2.src = "./audios/Player/swoosh2OK.mp3";
    this.deathScream = document.createElement("audio");
    this.deathScream.src = "./audios/Player/playerdeathscreamOK.mp3";
    this.footSteps = document.createElement("audio");
    this.footSteps.src = "./audios/Player/footstepsOK.mp3";
    this.hurtSound = document.createElement("audio");
    this.hurtSound.src = "./audios/Player/hurtPlayerOK.mp3";
  }
  update(input, space) {
    // Makes the player move
    if (
      (input.includes("ArrowRight") || input.includes("KeyD")) &&
      this.x < this.canvas.width - this.hitboxWidth
    ) {
      this.forward = true;
      this.x += this.speedX;
      this.animateForward();
    } else if (
      (input.includes("ArrowLeft") || input.includes("KeyA")) &&
      this.x > 0
    ) {
      this.x -= this.speedX;
      this.forward = false;
      this.animateBackwards();
    } else if (
      (input.includes("ArrowUp") || input.includes("KeyW")) &&
      this.y > this.canvas.height / 2 - this.hitboxHeight + 15
    ) {
      if (this.forward) {
        this.animateForward();
        this.y -= this.speedY;
      } else {
        this.animateBackwards();
        this.y -= this.speedY;
      }
    } else if (
      (input.includes("ArrowDown") || input.includes("KeyS")) &&
      this.y < this.canvas.height - this.hitboxHeight / 1.5
    ) {
      if (this.forward) {
        this.animateForward();
        this.y += this.speedY;
      } else {
        this.animateBackwards();
        this.y += this.speedY;
      }
    }
    if (space.includes("Space")) {
      this.attack();
    } else {
      this.hitboxWidth = this.width - 90;
      this.attackMode = false;
    }
    //Older version of space bar detection
    //
    // window.addEventListener("keydown", (event) => {
    //   if (event.code === "Space") {
    //     this.attack();
    //   }
    // });
    // window.addEventListener("keyup", (event) => {
    //   if (event.code === "Space") {
    //     this.hitboxWidth = this.width - 90;
    //     this.attackMode = false;
    //   }
    // });
  }
  draw() {
    if (this.attackMode && this.forward) {
      this.ctx.drawImage(
        this.attackImage,
        this.attackFrameX * this.width + 40,
        this.attackFrameY * this.height + 40,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
    } else if (this.attackMode && !this.forward) {
      this.ctx.drawImage(
        this.attackImageBackwards,
        this.attackBackwardsFrameX * this.width + 40,
        this.attackBackwardsFrameY * this.height + 40,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
    } else if (this.forward) {
      this.ctx.drawImage(
        this.image,
        this.frameX * this.width + 40,
        this.frameY * this.height + 40,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
    } else if (!this.forward) {
      this.ctx.drawImage(
        this.reversedImage,
        this.backwardFrameX * this.width + 40,
        this.backwardFrameY * this.height + 40,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
    //Hitbox drawing
    //
    // this.ctx.fillStyle = "black";
    // this.ctx.strokeStyle = "red";
    // this.ctx.strokeRect(this.x, this.y, this.width, this.height);
    //this.ctx.fillRect(this.x, this.y, this.width, this.height);
    //this.hitbox(this.hitboxWidth, this.hitboxHeight);
  }
  animateForward() {
    // Animates the player
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
  animateBackwards() {
    if (this.counter > 0) {
      this.counter -= 1;
    } else {
      if (this.backwardFrameX < this.maxFrame) {
        this.backwardFrameX++;
      } else {
        this.backwardFrameX = -0.2;
      }
      this.counter = 3;
    }
  }
  hitbox(width, height) {
    this.ctx.fillStyle = "black";
    this.ctx.strokeStyle = "gold";
    this.ctx.strokeRect(this.x, this.y, width, height);
  }
  // Attack method makes the hitbox grow bigger as the player uses his sword
  attack() {
    this.hitboxWidth = this.attackWidth;
    this.attackMode = true;
    this.swoosh1.play();
  }

  screamToDeath() {
    this.deathScream.play();
  }
  footstepsSound() {
    this.footSteps.play();
  }
  stopFootstepsSound() {
    this.footSteps.pause();
  }
  hurtScream() {
    this.hurtSound.play();
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
  // Doesn't works well, i'll try later if I have enough time
  //   animateAttackForward() {
  //     if (this.attackCounter > 0) {
  //       this.attackCounter -= 1;
  //     } else {
  //       if (this.attackFrameX < this.attackMaxFrame) {
  //         this.attackFrameX++;
  //       } else {
  //         this.attackFrameX = -0.1;
  //       }
  //       this.attackCounter = 3;
  //     }
  //   }
}

export default Player;
