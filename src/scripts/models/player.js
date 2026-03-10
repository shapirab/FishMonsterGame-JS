import Projectile from "./effectModels/projectile.js";

export default class Player{
    constructor(game){
        this.game = game;
        this.width = 80;
        this.height = 120;
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
    }

    shoot(){
        let projectilePosition = {
            x: this.position.x + this.width / 2,
            y: this.position.y
        }
        this.projectiles.push(new Projectile(this.game, projectilePosition));
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

    update(){
       this.position.x += this.speed.x;
       this.position.y += this.speed.y;
       this.checkBounderies();
       this.clearProjectiles();
    }

    draw(ctx){
        ctx.strokeStyle = 'red';
        ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
    }
}