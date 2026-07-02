class Coin{

    constructor(){

        this.x=canvas.width+100;

        this.y=groundY()-100-Math.random()*120;

        this.r=12;

        this.rot=0;

    }

    update(){

        this.x-=GAME.speed;

        this.rot+=0.2;

    }

    draw(){

        ctx.save();

        ctx.translate(this.x,this.y);

        ctx.scale(Math.abs(Math.cos(this.rot)),1);

        ctx.beginPath();

        ctx.fillStyle="#FFD700";

        ctx.arc(0,0,this.r,0,Math.PI*2);

        ctx.fill();

        ctx.fillStyle="#FFF59D";

        ctx.beginPath();

        ctx.arc(-3,-3,4,0,Math.PI*2);

        ctx.fill();

        ctx.restore();

    }

}

class Bird{

    constructor(){

        this.x=canvas.width+100;

        this.y=groundY()-170-Math.random()*60;

        this.w=48;

        this.h=28;

        this.fly=0;

    }

    update(){

        this.x-=GAME.speed+2;

        this.fly+=0.35;

    }

    draw(){

        let wing=Math.sin(this.fly)*10;

        ctx.fillStyle="#5D4037";

        ctx.beginPath();

        ctx.ellipse(

            this.x,

            this.y,

            18,

            10,

            0,

            0,

            Math.PI*2

        );

        ctx.fill();

        ctx.strokeStyle="#3E2723";

        ctx.lineWidth=4;

        ctx.beginPath();

        ctx.moveTo(this.x,this.y);

        ctx.lineTo(this.x-18,this.y-wing);

        ctx.stroke();

        ctx.beginPath();

        ctx.moveTo(this.x,this.y);

        ctx.lineTo(this.x+18,this.y-wing);

        ctx.stroke();

        ctx.fillStyle="white";

        ctx.beginPath();

        ctx.arc(this.x+8,this.y-3,2,0,Math.PI*2);

        ctx.fill();

    }

}