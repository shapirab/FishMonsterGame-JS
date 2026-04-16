import CollisionDetector from "./models/effectModels/collision.js";
import Projectile from "./models/effectModels/projectile.js";
import { Angler_1, Angler_2, LuckyFish } from "./models/enemy.js";
import Player from "./models/player.js";
import InputHandler from "./Operators/input.js";

export default class Game{
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.player = new Player(this); 
        this.input = new InputHandler(this);
        this.collisionDetector = new CollisionDetector();

        this.enemies = [];
        this.enemyTimer = 0;
        this.enemyInterval = 1500;
    }

    handleInputs(){
        if(this.input.keys.right.pressed){
            this.player.speed.x = this.player.maxSpeed;
        }
        else if(this.input.keys.left.pressed){
            this.player.speed.x = -this.player.maxSpeed;
        }
        else if(this.input.keys.up.pressed){
            this.player.speed.y = -this.player.maxSpeed;
        }
        else if(this.input.keys.down.pressed){
            this.player.speed.y = this.player.maxSpeed;
        }
        else{
            this.player.speed.x = 0;
            this.player.speed.y = 0;
        }

        if(this.input.keys.space.pressed){
            this.player.shoot();
        }
    }

    addEnemy(deltatime){
        if(this.enemyTimer < this.enemyInterval){
            this.enemyTimer += deltatime;
        }
        else{
            this.pushNewEnemy();
            this.enemyTimer = 0;
        }
    }

    pushNewEnemy(){
        let chance = Math.random();
        if(chance < 0.4){
            this.enemies.push(new Angler_1(this));
        }
        else if(chance < 0.8){
            this.enemies.push(new Angler_2(this));
        }
        else{
            this.enemies.push(new LuckyFish(this));
        }
    }

    handleEnemiesCollisionWithProjectiles(){
        this.enemies.forEach(enemy => {
            this.player.projectiles.forEach(projectile => {
                if(this.collisionDetector.rectCollisionDetector(enemy, projectile)){
                    enemy.markedForDeletion = true;
                }
            });
        });
    }

    handlePlayerCollisionWithEnemy(){
        this.enemies.forEach(enemy => {
            if(this.collisionDetector.rectCollisionDetector(this.player, enemy)){
                console.log('Player was damaged!');
            }
        });
    }

    update(deltatime){
        this.handleInputs();
        this.handleEnemiesCollisionWithProjectiles();
        this.handlePlayerCollisionWithEnemy();
        this.player.update();
        this.player.projectiles.forEach((projectile) => {
            projectile.update();    
        });
        this.addEnemy(deltatime);
        this.enemies.forEach(enemy => {
            enemy.update();
        });
        this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
    }

    draw(ctx){
        this.player.draw(ctx);
        this.player.projectiles.forEach(projectile => {
            projectile.draw(ctx);
        });

        this.enemies.forEach(enemy => enemy.draw(ctx));
    }
}