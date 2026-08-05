export default class AudioController{
    constructor(){
        this.explosionAudio = document.getElementById('explosionAudio');
        this.powerDownAudio = document.getElementById('powerdownAudio');
        this.powerUpAudio = document.getElementById('powerupAudio');
        this.shieldAudio = document.getElementById('shieldAudio');
        this.shotAudio = document.getElementById('shotAudio');
    }

    explosion(){
        this.explosionAudio.currentTime = 0;
        this.explosionAudio.play();
    }

    powerDown(){
        this.powerDownAudio.currentTime = 0;
        this.powerDownAudio.play();
    }

    powerUp(){
        this.powerUpAudio.currentTime = 0;
        this.powerUpAudio.play();
    }

    shield(){
        this.shieldAudio.currentTime = 0;
        this.shieldAudio.play();
    }

    shot(){
        this.shotAudio.currentTime = 0;
        this.shotAudio.play();
    }
}