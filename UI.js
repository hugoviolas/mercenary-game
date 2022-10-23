class UI {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.fontFamily = "MedievalSharp";
    this.fontSize = 50;
    this.color = "white";
  }
  draw() {
    this.ctx.fillStyle = this.color;
    //this.ctx.font = "50px Arial";
    this.ctx.font = this.fontSize + "px " + this.fontFamily;
    this.ctx.fillText("Bienvenue", 20, 40);
  }
}

export default UI;
