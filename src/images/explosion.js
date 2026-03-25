export class Explosion{
    constructor(game, position){
        this.game = game;
        this.frameX = 0;
        this.spriteHeight = 200;
        this.spriteWidth = 200;

        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.position = {
            x: position.x - this.width / 2,
            y: position.y - this.height / 2
        };

        this.framesPerSecond = 15;
        this.timer = 0;
        this.intervalToNextAnim = 1000/this.framesPerSecond;

        this.maxFrame = 8;

        this.markedForDeletion = false;
    }

    update(deltaTime){
        if(this.timer > this.intervalToNextAnim){
            this.frameX++;
            this.timer = 0;
        }
        else{
            this.timer += deltaTime;
        }
        if(this.frameX > this.maxFrame){
            this.markedForDeletion = true;
        }
    }

    draw(ctx){
        ctx.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.position.x, this.position.y, this.width, this.height);
    }
}

export class SmokeExplosion extends Explosion{
    constructor(game, position){
        super(game, position);
        this.image = smoke;      
    }
}

export class FireExplosion extends Explosion{
    constructor(game, position){
        super(game, position);
        this.image = fire;      
    }
}