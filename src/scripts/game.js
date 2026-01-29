import Player from "./models/player.js";

export default class Game{
    constructor(){
        this.player = new Player();
        
    }

    update(){}

    draw(ctx){
        this.player.draw(ctx);
    }
}