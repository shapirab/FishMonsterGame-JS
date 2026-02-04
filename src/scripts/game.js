import Projectile from "./models/effectModels/projectile.js";
import Player from "./models/player.js";
import InputHandler from "./Operators/input.js";

export default class Game{
    constructor(){
        this.player = new Player(this); 
        this.input = new InputHandler(this);
        this.projectile = new Projectile(this);   
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
    }

    update(){
        this.handleInputs();
        this.player.update();
        this.projectile.update();
    }

    draw(ctx){
        this.player.draw(ctx);
        this.projectile.draw(ctx);
    }
}