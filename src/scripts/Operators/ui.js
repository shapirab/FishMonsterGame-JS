export default class UI {
    constructor(game){
        this.game = game;
        this.fontSize = 25;
        this.fontFamily = 'Bangers';
        this.fontColor = 'white';
    }

    draw(ctx){
        ctx.save();
        ctx.fillStyle = this.fontColor;
        ctx.font = `${this.fontSize}px ${this.fontFamily}`;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        ctx.shadowColor = 'black';
        ctx.fillText(`Score: ${this.game.score}`, 20, 30);
        ctx.restore();
    }
    
}