class UI {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.fontFamily = "MedievalSharp";
    this.fontSize = 50;
    this.color = "white";
  }
  draw(player) {
    this.ctx.fillStyle = this.color;
    this.ctx.font = this.fontSize + "px " + this.fontFamily;
    //this.ctx.fillText("Bienvenue", 20, 40);
    this.ctx.fillText(`Lives : ${player.lives}`, 20, 40);
  }
  nextWave(waveNumber, timer) {
    this.ctx.fillText(
      `Be ready for wave ${waveNumber} !`,
      this.canvas.width / 2 - 200,
      this.canvas.height / 2
    );
    //this.ctx.fillText(`Next wave starts in ${timer}`, 200, 200);
  }
}

export default UI;
