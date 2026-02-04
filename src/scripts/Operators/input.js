export default class InputHandler{
    constructor(game){
        this.game = game;
        this.keys = {
            right: {
                pressed: false
            },
            left: {
                pressed: false
            },
            up: {
                pressed: false
            },
            down: {
                pressed: false
            },
            space: {
                pressed: false
            }
        }

        document.addEventListener('keydown', (e) => {
            switch(e.key){
                case 'ArrowRight':
                    this.keys.right.pressed = true;
                    break;
                case 'ArrowLeft':
                    this.keys.left.pressed = true;
                    break;
                case 'ArrowUp':
                    this.keys.up.pressed = true;
                    break;
                case 'ArrowDown':
                    this.keys.down.pressed = true;
                    break;
                case ' ':
                    this.keys.space.pressed = true;
                    break;
                case 'd':
                        this.game.debug = !this.game.debug;
                    break;                
            }
        });
        document.addEventListener('keyup', (e) => {
            switch(e.key){
                case 'ArrowRight':
                    this.keys.right.pressed = false;
                    break;
                case 'ArrowLeft':
                    this.keys.left.pressed = false;
                    break;
                case 'ArrowUp':
                    this.keys.up.pressed = false;
                    break;
                case 'ArrowDown':
                    this.keys.down.pressed = false;
                    break;
                case ' ':
                    this.keys.space.pressed = false;
                    break;                           
            }
        });
    }
}