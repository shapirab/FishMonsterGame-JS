export default class Projectile{
    constructor(game){
        this.game = game;

        this.width = 20;
        this.height = 3;
        this.position = {
            x: this.game.player.position.x + this.game.player.width,
            y: this.game.player.position.y
        }
        this.speedX = 5;
    }

    update(){
        this.position.x += this.speedX;
    }

    draw(ctx){
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}