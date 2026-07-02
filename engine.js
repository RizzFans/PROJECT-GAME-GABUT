const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function resize(){

canvas.width=innerWidth;
canvas.height=innerHeight;

}

resize();

window.addEventListener("resize",resize);

const GAME = {

    score:0,

    coin:0,

    speed:8,

    groundHeight:140,

    running:false,

    hp:7,

    gameOver:false

};

const CAMERA = {
    x:0,
    y:0,
    shake:0
};

function updateCamera(){

    const CAMERA = {
    x: 0,
    y: 0,
    shake: 0,
    freeze: 0,
    flash: 0
};

function updateCamera(){

    if(CAMERA.shake > 0){

        CAMERA.shake--;

        CAMERA.x += ((Math.random()-0.5)*8 - CAMERA.x) * 0.35;
        CAMERA.y += ((Math.random()-0.5)*8 - CAMERA.y) * 0.35;

    }else{

        CAMERA.x *= 0.85;
        CAMERA.y *= 0.85;

    }

}

}

function groundY(){

return canvas.height-GAME.groundHeight;

}