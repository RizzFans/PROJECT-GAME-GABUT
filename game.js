const menu = document.getElementById("menu");
const playBtn = document.getElementById("play");
const coins=[];
const birds=[];

playBtn.onclick = () => {
    menu.style.display = "none";
    audio.resume();

    startMusic();

    GAME.running = true;

}

function update(){

    if(!GAME.running) return;
    if(GAME.gameOver) return;

    player.update();
    updateObstacles();

    GAME.score++;

    if(GAME.score % 500 === 0){
        GAME.speed += 0.25;
    }

    document.getElementById("score").textContent = GAME.score;

    // Spawn Coin
    if(Math.random() < 0.015){
        coins.push(new Coin());
    }

    // Spawn Bird
    if(Math.random() < 0.006){
        birds.push(new Bird());
    }

    // Update Bird
    for(let i = birds.length - 1; i >= 0; i--){

        birds[i].update();

        if(birds[i].x < -80){
            birds.splice(i,1);
        }

    }

    // Update Coin
    for(let i = coins.length - 1; i >= 0; i--){

        coins[i].update();

        if(coins[i].x < -50){
            coins.splice(i,1);
            continue;
        }

        const dx = player.x + 30 - coins[i].x;
        const dy = player.y + 25 - coins[i].y;

        if(Math.sqrt(dx*dx + dy*dy) < 30){

            GAME.coin++;
            coinSound();
            CAMERA.flash = 2;

            document.getElementById("coin").textContent =
                "🪙 " + GAME.coin;

            coins.splice(i,1);
        }
    }

}

function render(){

    ctx.clearRect(0,0,canvas.width,canvas.height);
    updateCamera();

ctx.save();

ctx.translate(
    CAMERA.x,
    CAMERA.y
);

    drawSky();

drawSun();

drawClouds();

drawMountains();

drawHills();

drawTrees();

drawGround();

drawGrass();

drawObstacles();

for(const b of birds){

    b.draw();

}

for(const c of coins){

    c.draw();

}

player.draw();

    if(GAME.gameOver){

        ctx.fillStyle="rgba(0,0,0,.6)";
        ctx.fillRect(0,0,canvas.width,canvas.height);

        ctx.fillStyle="white";
        ctx.textAlign="center";

        ctx.font="bold 50px Arial";
        ctx.fillText(
            "CUPU AMAT KALAH",
            canvas.width/2,
            canvas.height/2
        );

        ctx.font="25px Arial";
        ctx.fillText(
            "Klik untuk Main Lagi",
            canvas.width/2,
            canvas.height/2+50
        );

        if(CAMERA.flash > 0){

    CAMERA.flash--;

    ctx.fillStyle = "rgba(255,0,0,0.18)";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

}
        
        ctx.restore();

    }

}

function restart(){

    GAME.hp = 7;

    GAME.score = 0;

    GAME.gameOver = false;

    GAME.running = true;

    obstacles.length = 0;

    document.getElementById("heart").textContent = "❤️❤️❤️❤️❤️❤️❤️";

}

window.addEventListener("mousedown",()=>{

    if(GAME.gameOver){

        restart();

    }

});

window.addEventListener("touchstart",()=>{

    if(GAME.gameOver){

        restart();

    }

});

function loop(){

    updateCamera();

    update();

    render();

    requestAnimationFrame(loop);

}

loop();
