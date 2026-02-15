export default class Enemy {
  constructor(game) {
    this.game = game;
    this.position = {
      x: this.game.width,
      y: 0,
    };
    this.speedX = Math.random() * -1.5 - 0.5;
    this.markedForDeletion = false;
  }

  update(deltatime) {
    this.position.x += this.speedX;
    if(this.position.x + this.width < 0){
      this.markedForDeletion = true;
    }
  }

  draw(ctx) {
    ctx.strokeStyle = 'red';
    ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
  }
}

export class Angler_1 extends Enemy {
  constructor(game) {
    super(game);
    this.width = 228;
    this.height = 169;
    let percentageY = 0.95;
    this.position.y = Math.random() * (this.game.height * percentageY - this.height);
  }
}
