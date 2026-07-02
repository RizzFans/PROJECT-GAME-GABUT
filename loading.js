let percent = 0;

const bar = document.getElementById("bar");

const txt = document.getElementById("loading-text");

const loading = document.getElementById("loading-screen");

const timer = setInterval(()=>{

    percent++;

    bar.style.width = percent+"%";

    txt.innerHTML = "Loading... "+percent+"%";

    if(percent>=100){

        clearInterval(timer);

        loading.style.opacity="0";

        loading.style.transition=".8s";

        setTimeout(()=>{

            loading.remove();

        },800);

    }

},25);