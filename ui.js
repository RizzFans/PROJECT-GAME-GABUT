let worldTime = 0;

let bg = {

cloud:0,

mountain:0,

hill:0,

tree:0,

grass:0

};

function drawSky(){

    worldTime += 0.001;

    const t = (Math.sin(worldTime)+1)/2;

    const r = Math.floor(20 + t*70);
    const g = Math.floor(40 + t*170);
    const b = Math.floor(90 + t*160);

    const gSky = ctx.createLinearGradient(
        0,
        0,
        0,
        canvas.height
    );

    gSky.addColorStop(
        0,
        `rgb(${r},${g},${b})`
    );

    gSky.addColorStop(
        1,
        `rgb(${r+80},${g+60},${b})`
    );

    ctx.fillStyle = gSky;

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

}

//======================

function drawSun(){

    const p = (Math.sin(worldTime)+1)/2;

    const sunX = canvas.width-120;
    const sunY = 100+p*120;

    ctx.beginPath();
    ctx.fillStyle="#FFD54F";
    ctx.arc(
        sunX,
        sunY,
        45,
        0,
        Math.PI*2
    );
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle="#DDD";

    ctx.arc(
        120,
        80+(1-p)*120,
        30,
        0,
        Math.PI*2
    );

    ctx.fill();

}

//======================

function cloud(x,y){

ctx.fillStyle="white";

ctx.beginPath();

ctx.arc(x,y,20,0,Math.PI*2);

ctx.arc(x+18,y-10,25,0,Math.PI*2);

ctx.arc(x+45,y,20,0,Math.PI*2);

ctx.fill();

}

function drawClouds(){

bg.cloud-=0.2;

cloud(100+bg.cloud,120);

cloud(420+bg.cloud*.8,180);

cloud(800+bg.cloud*.6,90);

cloud(1200+bg.cloud*.4,140);

}

//======================

function drawMountains(){

bg.mountain-=0.3;

ctx.fillStyle="#74695c";

for(let i=-1;i<6;i++){

let x=i*450+(bg.mountain%450);

ctx.beginPath();

ctx.moveTo(x,groundY());

ctx.lineTo(x+220,220);

ctx.lineTo(x+450,groundY());

ctx.fill();

}

}

//======================

function drawHills(){

bg.hill-=0.8;

ctx.fillStyle="#6FAF48";

for(let i=-1;i<8;i++){

let x=i*250+(bg.hill%250);

ctx.beginPath();

ctx.arc(

x,

groundY()+40,

180,

Math.PI,

0

);

ctx.fill();

}

}

//======================

function drawTrees(){

bg.tree-=GAME.speed;

ctx.fillStyle="#5D4037";

for(let i=-1;i<12;i++){

let x=i*180+(bg.tree%180);

ctx.fillRect(x,groundY()-70,12,70);

ctx.beginPath();

ctx.fillStyle="#2ECC71";

ctx.arc(x+6,groundY()-85,30,0,Math.PI*2);

ctx.fill();

ctx.fillStyle="#5D4037";

}

}

//======================

function drawGround(){

ctx.fillStyle="#8D6E63";

ctx.fillRect(

0,

groundY(),

canvas.width,

GAME.groundHeight

);

}

//======================

function drawGrass(){

bg.grass-=GAME.speed;

ctx.strokeStyle="#2ECC71";

ctx.lineWidth=2;

for(let i=0;i<canvas.width;i+=8){

let x=(i+(bg.grass%8));

ctx.beginPath();

ctx.moveTo(x,groundY());

ctx.lineTo(

x+Math.random()*3,

groundY()-8

);

ctx.stroke();

}

}