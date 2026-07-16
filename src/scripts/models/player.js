import Projectile from "./effectModels/projectile.js";

export default class Player{
    constructor(game){
        this.game = game;
        this.width = 120;
        this.height = 190;
        this.position = {
            x: 100,
            y: 100
        }
        this.speed = {
            x: 0,
            y: 0
        }
        this.maxSpeed = 2;
        this.projectiles = [];

        this.image = playerImg;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 37;    
    }

    shoot(){
        let projectilePosition = {
            x: this.position.x + this.width / 2,
            y: this.position.y
        }
        this.projectiles.push(new Projectile(this.game, projectilePosition));
    }

    powerShoot(){
        let projectilePowerPosition = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height
        }
        this.projectiles.push(new Projectile(this.game, projectilePowerPosition));
    }

    clearProjectiles(){
        this.projectiles.forEach((projectile, index) => {
            if(projectile.markedForDeletion){
                this.projectiles.splice(index, 1);
            }
        });
    }

    checkBounderies(){
        if(this.position.x < 0){
            this.position.x = 0;
        }
        else if(this.position.x > this.game.width - this.width){
            this.position.x = this.game.width - this.width;
        }
        else if(this.position.y < 0){
            this.position.y = 0;
        }

        else if(this.position.y > this.game.height - this.height){
            this.position.y = this.game.height - this.height;
        }
    }

    animatePlayer(){
        this.frameX++;
        if(this.frameX >= this.maxFrame){
            this.frameX = 0;
        }
    }

    update(){
       this.position.x += this.speed.x;
       this.position.y += this.speed.y;
       this.checkBounderies();
       this.clearProjectiles();

       this.animatePlayer();
    }

    draw(ctx){
        // ctx.strokeStyle = 'red';
        // ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
        ctx.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, 
            this.position.x, this.position.y, this.width, this.height);
    }
}