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
    }

    update(){
       this.position.x += this.speed.x;
       this.position.y += this.speed.y;
    }

    draw(ctx){
        ctx.strokeStyle = 'red';
        ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
    }
}