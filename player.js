const player={

x:120,

y:0,

width:70,

height:70,

vy:0,

gravity:1,

jumpPower:-21,

ground:true,

leg:0,

dust:[],

update(){

    this.vy += this.gravity;

    if(this.vy > 18){
        this.vy = 18;
    }

    this.y += this.vy;

    if(this.y > groundY() - this.height){

        this.y = groundY() - this.height;

        this.vy = 0;
if(!this.ground){

    for(let i=0;i<8;i++){

        this.dust.push({

            x:this.x+20,

            y:groundY(),

            r:2+Math.random()*4,

            vx:-2+Math.random()*4,

            vy:-Math.random()*2,

            a:1

        });

    }

}

this.ground = true;

        this.ground = true;
    }

    this.leg += 0.25;

    if(this.ground && Math.random() < 0.35){

        this.dust.push({

            x:this.x + 12,

            y:groundY() - 2,

            r:2 + Math.random()*3,

            vx:-1 - Math.random()*2,

            vy:-0.5 - Math.random(),

            a:1

        });

    }

    for(let i=this.dust.length-1;i>=0;i--){

        const p = this.dust[i];

        p.x += p.vx;

        p.y += p.vy;

        p.r += 0.08;

        p.a -= 0.03;

        if(p.a <= 0){

            this.dust.splice(i,1);

        }

    }

},

jump(){

if(!this.ground)return;

this.ground=false;

this.vy=this.jumpPower;
jumpSound();

},

draw(){

    const step = Math.sin(this.leg) * 6;

    // =====================
    // BAYANGAN
    // =====================

    ctx.beginPath();
    ctx.fillStyle = "rgba(0,0,0,.25)";
    ctx.ellipse(
        this.x + 35,
        groundY() + 5,
        28,
        8,
        0,
        0,
        Math.PI * 2
    );
    ctx.fill();

    //  ==================
    //  EKOR
    //  ==================
    ctx.fillStyle="#000000";

ctx.beginPath();

ctx.moveTo(this.x-25,this.y+28);

ctx.quadraticCurveTo(

    this.x-5,

    this.y+5,

    this.x+6,

    this.y+22

);

ctx.quadraticCurveTo(

    this.x-5,

    this.y+35,

    this.x-25,

    this.y+28

);

ctx.fill();

    // ===== BADAN =====

const body = ctx.createLinearGradient(
    this.x,
    this.y,
    this.x,
    this.y + 55
);

body.addColorStop(0,"#000000");
body.addColorStop(.5,"#000000");
body.addColorStop(1,"#000000");

ctx.fillStyle = body;

ctx.beginPath();

ctx.moveTo(this.x+8,this.y+48);

ctx.quadraticCurveTo(
    this.x-5,
    this.y+28,
    this.x+12,
    this.y+10
);

ctx.quadraticCurveTo(
    this.x+40,
    this.y,
    this.x+58,
    this.y+12
);

ctx.quadraticCurveTo(
    this.x+66,
    this.y+28,
    this.x+56,
    this.y+50
);

ctx.quadraticCurveTo(
    this.x+32,
    this.y+60,
    this.x+8,
    this.y+48
);

ctx.fill();

    // =====================
    // PERUT
    // =====================

    ctx.fillStyle="#000000";

    ctx.beginPath();

    ctx.ellipse(
        this.x+27,
        this.y+33,
        16,
        11,
        0,
        0,
        Math.PI*2
    );

    ctx.fill();

    // =====================
    // KEPALA
    // =====================

    let head = ctx.createLinearGradient(
        this.x,
        this.y,
        this.x,
        this.y+40
    );

    head.addColorStop(0,"#000000");
    head.addColorStop(1,"#000000");

    ctx.fillStyle=head;

    ctx.beginPath();

    ctx.roundRect(
        this.x+28,
        this.y-8,
        40,
        32,
        12
    );

    ctx.fill();

    // =====================
    // MATA
    // =====================

    ctx.fillStyle="red";

    ctx.beginPath();

    ctx.arc(
        this.x+58,
        this.y+6,
        5,
        0,
        Math.PI*2
    );

    ctx.fill();

    ctx.fillStyle="black";

    ctx.beginPath();

    ctx.arc(
        this.x+60,
        this.y+6,
        2,
        0,
        Math.PI*2
    );

    ctx.fill();

    // Kilau mata
    ctx.fillStyle="white";

    ctx.beginPath();

    ctx.arc(
        this.x+61,
        this.y+5,
        1,
        0,
        Math.PI*2
    );

    ctx.fill();

    // =====================
    // MULUT
    // =====================

    ctx.strokeStyle="#ff0000";

    ctx.lineWidth=2;

    ctx.beginPath();

    ctx.moveTo(
        this.x+48,
        this.y+18
    );

    ctx.quadraticCurveTo(
        this.x+60,
        this.y+23,
        this.x+67,
        this.y+16
    );

    ctx.stroke();

    // =====================
    // TANGAN
    // =====================

    ctx.strokeStyle="#ffffff";

    ctx.lineWidth=6;

    ctx.lineCap="round";

    ctx.beginPath();

    ctx.moveTo(
        this.x+35,
        this.y+25
    );

    ctx.lineTo(
        this.x+48,
        this.y+32
    );

    ctx.stroke();

    // =====================
    // KAKI
    // =====================

    ctx.strokeStyle="#ffffff";

ctx.lineWidth=8;

ctx.lineCap="round";

ctx.beginPath();

ctx.moveTo(
    this.x+18,
    this.y+46
);

ctx.quadraticCurveTo(
    this.x+12,
    this.y+60,
    this.x+15,
    this.y+70+step
);

ctx.stroke();

ctx.beginPath();

ctx.moveTo(
    this.x+40,
    this.y+46
);

ctx.quadraticCurveTo(
    this.x+46,
    this.y+60,
    this.x+42,
    this.y+70-step
);

ctx.stroke();

    // =====================
    // OUTLINE
    // =====================

    ctx.strokeStyle="#ffffff";

    ctx.lineWidth=2;

    ctx.stroke();

    // =====================
    // DEBU
    // =====================

    for(const p of this.dust){

        ctx.beginPath();

        ctx.fillStyle=`rgba(255,255,255,${p.a})`;

        ctx.arc(
            p.x,
            p.y,
            p.r,
            0,
            Math.PI*2
        );

        ctx.fill();

    }

}

};

player.y=groundY()-player.height;

window.addEventListener("touchstart",()=>player.jump());

window.addEventListener("mousedown",()=>player.jump());
