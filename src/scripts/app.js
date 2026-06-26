import Game from "./game.js";

window.addEventListener('load', () => {
    const canvas = document.getElementById('main-canvas');
    const restartButton = document.querySelector('.btn');

    canvas.width = 1200;
    canvas.height = 700;
    let ctx = canvas.getContext('2d');

    const game = new Game(canvas.width, canvas.height);

    restartButton.addEventListener('click', () => {
        restartButton.blur();
        hideRestartBtn();
        game.resetGame();
        animate(0);
    });

    function displayRestartBtn(){
        console.log('app::displayRestartBtn')
        restartButton.classList.remove('hidden');
        restartButton.classList.add('show');;
        console.log(restartButton)
    }
    function hideRestartBtn(){
        restartButton.classList.remove('show');
        restartButton.classList.add('hidden');
    }

    let lastTime = 0;
    function animate(timeStemp){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let deltatime = timeStemp - lastTime;
        lastTime = timeStemp;
        game.update(deltatime);
        game.draw(ctx);
        if(game.gameOver){
            console.log('gameOver called in app')
            displayRestartBtn();
        }
        if(!game.gameOver){
            requestAnimationFrame(animate);
        }
    }

    animate(0);
});