import Game from "./game.js";

window.addEventListener('load', () => {
    const canvas = document.getElementById('main-canvas');
    canvas.width = 1200;
    canvas.height = 700;
    let ctx = canvas.getContext('2d');

    const game = new Game(canvas.width, canvas.height);   

    let lastTime = 0;
    function animate(timeStemp){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let deltatime = timeStemp - lastTime;
        lastTime = timeStemp;
        game.update(deltatime);
        game.draw(ctx);
        if(!game.gameOver){
            requestAnimationFrame(animate);
        }
    }

    animate(0);
});