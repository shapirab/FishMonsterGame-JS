import Game from "./game.js";

window.addEventListener('load', () => {
    const canvas = document.getElementById('main-canvas');
    canvas.width = 1200;
    canvas.height = 700;
    let ctx = canvas.getContext('2d');

    const game = new Game();   

    let lastTime = 0;
    function animate(timeStemp){
        let deltatime = timeStemp - lastTime;
        lastTime = timeStemp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        requestAnimationFrame(animate);
        game.draw(ctx);
    }

    animate(0);
});