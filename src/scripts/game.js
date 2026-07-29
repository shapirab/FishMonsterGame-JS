import CollisionDetector from "./models/effectModels/collision.js";
import Projectile from "./models/effectModels/projectile.js";
import { Angler_1, Angler_2, Drone, HiveWhale, LuckyFish } from "./models/enemy.js";
import Player from "./models/player.js";
import InputHandler from "./Operators/input.js";
import UI from "./Operators/ui.js";

export default class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.player = new Player(this);
    this.input = new InputHandler(this);
    this.collisionDetector = new CollisionDetector();

    this.enemies = [];
    this.enemyTimer = 0;
    this.enemyInterval = 1500;
    this.ui = new UI(this);
    this.score = 0;

    this.powerShoot = false;
    this.powerTimer = 0;
    this.maxPowerTimer = 2500;

    this.gameOver = false;
    this.gameTimer = 0;
    this.maxGameTimer = 250000;
  }

  handleInputs() {
    if (this.input.keys.right.pressed) {
      this.player.speed.x = this.player.maxSpeed;
    } else if (this.input.keys.left.pressed) {
      this.player.speed.x = -this.player.maxSpeed;
    } else if (this.input.keys.up.pressed) {
      this.player.speed.y = -this.player.maxSpeed;
    } else if (this.input.keys.down.pressed) {
      this.player.speed.y = this.player.maxSpeed;
    } else {
      this.player.speed.x = 0;
      this.player.speed.y = 0;
    }

    if(this.input.keys.space.pressed){
      if(this.powerShoot){
        this.player.powerShoot();
      }
      this.player.shoot();
    }
  }

  addEnemy(deltatime) {
    if (this.enemyTimer < this.enemyInterval) {
      this.enemyTimer += deltatime;
    } else {
      this.pushNewEnemy();
      this.enemyTimer = 0;
    }
  }

  pushNewEnemy() {
    let chance = Math.random();
    if (chance < 0.3) {
      this.enemies.push(new Angler_1(this));
    } else if (chance < 0.6) {
      this.enemies.push(new Angler_2(this));
    } else if(chance < 0.8){
      this.enemies.push(new HiveWhale(this));
    }
    else {
      this.enemies.push(new LuckyFish(this));
    }
  }

  handleEnemiesCollisionWithProjectiles() {
    this.enemies.forEach((enemy) => {
      this.player.projectiles.forEach((projectile) => {
        if (this.collisionDetector.rectCollisionDetector(enemy, projectile)) {
          this.score += enemy.score;
          enemy.lives--;
          projectile.markedForDeletion = true;
          if (enemy.lives <= 0) {
            enemy.markedForDeletion = true;
            if (enemy.type === "lucky") {
              this.powerShoot = true;
            }
            else if(enemy.type === 'hive'){
              console.log('game::handleEnemiesCollisionWithProjectiles(). Enemy is hive. Drones are created. ', enemy.type);
              this.createDrones(enemy);
            }
          }
        }
      });
    });
  }

  createDrones(enemy){
    let numDrones = 5;
    for(let i = 0; i < numDrones; i++){
      let dronePosition = {
        x: enemy.position.x + Math.random() * enemy.width,
        y: enemy.position.y + (Math.random() * enemy.height) / 2,
      };
      this.enemies.push(new Drone(this, dronePosition));
    }
  }

  handlePlayerCollisionWithEnemy() {
    this.enemies.forEach((enemy) => {
      if (this.collisionDetector.rectCollisionDetector(this.player, enemy)) {
        enemy.markedForDeletion = true;
        if (this.score <= 0) {
          this.gameOver = true;
        }
        if (!this.gameOver) {
          this.score -= enemy.lives;
        }
      }
    });
  }

  setPowerShoot(deltatime){
    if(this.powerShoot){
      this.powerTimer += deltatime;
      if(this.powerTimer > this.maxPowerTimer){
        this.powerTimer = 0;
        this.powerShoot = false;
      }
    }
  }

  endGameOnTimer(deltatime) {
    this.gameTimer += deltatime;
    if (this.gameTimer >= this.maxGameTimer) {
      this.gameOver = true;
    }
  }

  resetGame() {
    this.enemies = [];
    this.enemyTimer = 0;
    this.score = 0;

    this.gameTimer = 0;
    this.gameOver = false;
  }

  update(deltatime) {
    this.handleInputs();
    this.handleEnemiesCollisionWithProjectiles();
    this.handlePlayerCollisionWithEnemy();
    this.player.update();
    this.player.projectiles.forEach((projectile) => {
      projectile.update();
    });
    this.addEnemy(deltatime);
    this.enemies.forEach((enemy) => {
      enemy.update();
    });
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
    this.player.projectiles = this.player.projectiles.filter((projectile) => !projectile.markedForDeletion);

    this.setPowerShoot(deltatime);

    this.endGameOnTimer(deltatime);
  }

  draw(ctx) {
    this.player.draw(ctx);
    this.player.projectiles.forEach((projectile) => {
      projectile.draw(ctx);
    });

    this.enemies.forEach((enemy) => enemy.draw(ctx));

    this.ui.draw(ctx);
  }
}
