const AudioCtx = window.AudioContext || window.webkitAudioContext;

const audio = new AudioCtx();

function beep(freq,time,type="square",vol=.08){

    const osc = audio.createOscillator();

    const gain = audio.createGain();

    osc.type = type;

    osc.frequency.value = freq;

    gain.gain.value = vol;

    osc.connect(gain);

    gain.connect(audio.destination);

    osc.start();

    osc.frequency.exponentialRampToValueAtTime(

        freq*.5,

        audio.currentTime+time

    );

    gain.gain.exponentialRampToValueAtTime(

        0.001,

        audio.currentTime+time

    );

    osc.stop(audio.currentTime+time);

}

//=========================

function jumpSound(){

    beep(700,.15,"square");

}

function coinSound(){

    beep(900,.08,"triangle");

    setTimeout(()=>{

        beep(1200,.08,"triangle");

    },40);

}

function hitSound(){

    beep(180,.25,"sawtooth",.12);

}

function gameOverSound(){

    beep(500,.15,"square");

    setTimeout(()=>beep(350,.15,"square"),120);

    setTimeout(()=>beep(220,.25,"square"),250);

}

let musicLoop = null;

function startMusic(){

    if(musicLoop) return;

    const notes = [
        262,330,392,523,
        392,330,262,196
    ];

    let i = 0;

    musicLoop = setInterval(()=>{

        beep(
            notes[i],
            0.18,
            "triangle",
            0.025
        );

        i++;

        if(i >= notes.length){

            i = 0;

        }

    },220);

}

function stopMusic(){

    clearInterval(musicLoop);

    musicLoop = null;

}