class Obstacle {
    constructor(type = "cactus") {
        this.type = type;

        if (type === "cactus") {
            this.width = 35;
            this.height = 70;
            this.y = groundY() - this.height;
            this.color = "#ff0000";
        } else {
            this.width = 60;
            this.height = 35;
            this.y = groundY() - 130;
            this.color = "#795548";
        }

        this.x = canvas.width + Math.random() * 200;
        this.passed = false;
    }

    update() {
        this.x -= GAME.speed;
    }

    draw() {
        ctx.fillStyle = this.color;

        if (this.type === "cactus") {
            ctx.fillRect(this.x, this.y, this.width, this.height);

            ctx.fillRect(
                this.x + 10,
                this.y - 20,
                12,
                30
            );

            ctx.fillRect(
                this.x + 22,
                this.y + 10,
                12,
                25
            );
        } else {
            ctx.fillRect(
                this.x,
                this.y,
                this.width,
                this.height
            );

            ctx.beginPath();
            ctx.moveTo(this.x + this.width, this.y + 10);
            ctx.lineTo(this.x + this.width + 20, this.y + 18);
            ctx.lineTo(this.x + this.width, this.y + 28);
            ctx.fill();
        }
    }

    collide(player) {

        return (
            player.x < this.x + this.width &&
            player.x + player.width > this.x &&
            player.y < this.y + this.height &&
            player.y + player.height > this.y
        );

    }

    offscreen() {
        return this.x + this.width < 0;
    }
}

const obstacles = [];

let obstacleTimer = 0;

function spawnObstacle() {

    obstacleTimer++;

    if (obstacleTimer < 90) return;

    obstacleTimer = 0;

    const type =
        Math.random() < 0.75
            ? "cactus"
            : "rock";

    obstacles.push(new Obstacle(type));
}

function updateObstacles(){

    if(GAME.gameOver) return;

    spawnObstacle();

    for(let i=obstacles.length-1;i>=0;i--){

        obstacles[i].update();

        if(obstacles[i].collide(player)){

            obstacles.splice(i,1);

           GAME.hp--;
           hitSound();

CAMERA.shake = 18;

CAMERA.freeze = 4;

CAMERA.flash = 10;

            document.getElementById("heart").textContent =
                "❤️".repeat(GAME.hp);

            if(GAME.hp<=0){

                GAME.gameOver=true;
                gameOverSound();

stopMusic();

            }

            continue;

        }

        if(obstacles[i].offscreen()){

            obstacles.splice(i,1);

        }

    }

}

function drawObstacles() {

    for (const obstacle of obstacles) {

        obstacle.draw();

    }

}