export default class Enemy {
  constructor(game) {
    this.game = game;
    this.position = {
      x: this.game.width,
      y: 0,
    };
    this.speedX = Math.random() * -1.5 - 0.5;
    this.markedForDeletion = false;

    this.frameX = 0;
  }

  animateEnemy(){
    if(this.frameX > this.maxFrames){
      this.frameX = 0;
    }
    this.frameX++;
  }

  update() {
    this.position.x += this.speedX;
    if(this.position.x + this.width < 0){
      this.markedForDeletion = true;
    }
    this.animateEnemy();
  }

  draw(ctx) {
    // ctx.strokeStyle = 'red';
    // ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
    ctx.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.position.x, this.position.y, this.width, this.height);
  }
}

export class Angler_1 extends Enemy {
  constructor(game) {
    super(game);
    this.image = angler1_EnemyImg;
    this.maxFrames = 37;
    this.frameY = Math.floor(Math.random() * 3);


    this.width = 228;
    this.height = 169;
    let percentageY = 0.95;
    this.position.y = Math.random() * (this.game.height * percentageY - this.height);

    this.lives = 3;
    this.score = this.lives;
  }
}

export class Angler_2 extends Enemy {
  constructor(game) {
    super(game);
    this.image = angler2_EnemyImg;
    this.maxFrames = 37;
    this.frameY = Math.floor(Math.random() * 2);


    this.width = 213;
    this.height = 165;
    let percentageY = 0.95;
    this.position.y = Math.random() * (this.game.height * percentageY - this.height);

    this.lives = 3;
    this.score = this.lives;
  }
}

export class LuckyFish extends Enemy {
  constructor(game) {
    super(game);
    this.image = lucky_EnemyImg;
    this.maxFrames = 37;
    this.frameY = Math.floor(Math.random() * 2);


    this.width = 99;
    this.height = 95;
    let percentageY = 0.95;
    this.position.y = Math.random() * (this.game.height * percentageY - this.height);

    this.lives = 3;
    this.score = this.lives;
  }
}
