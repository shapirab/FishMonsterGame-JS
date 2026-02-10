export default class Projectile{
    constructor(game, position){
        this.game = game;

        this.width = 20;
        this.height = 3;
        this.position = {
            x: position.x,
            y: position.y
        }
        this.speedX = 5;

        this.markedForDeletion = false;
    }

    update(){
        this.position.x += this.speedX;
        if(this.position.x > this.game.width){
            this.markedForDeletion = true;
        }
    }

    draw(ctx){
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}