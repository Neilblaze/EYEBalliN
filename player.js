const audio = document.getElementById("audio");
const btnStart = document.querySelector(".player .bottom button");
const svgCircle = document.querySelector('.player .cover svg');
const img = document.querySelector('.player .cover img');
const timeLabel = document.querySelector('.player .time');
const circleBack = svgCircle.children[0]; 
const circleProgress = svgCircle.children[1];
const strokeLength = circleProgress.getTotalLength();
let isPlaying = false;
let audioDuration = 0;

circleProgress.style['stroke-dasharray'] = strokeLength + 'px';
function setProgress(percent){
    circleProgress.style['stroke-dashoffset'] = 
            (strokeLength - (( strokeLength * percent) / 100 )) + 'px';
}
setProgress(0);

circleBack.addEventListener('click', (event) => {
    const x = event.offsetX - (circleProgress.getBBox().width/2); 
    const y = -(event.offsetY - (circleProgress.getBBox().height/2)); 
    
    let angle = (180 / Math.PI) * Math.atan2(x, y);
    if(angle<0) { angle+=360 }
    const anglePercent = (angle*100)/360;
    
    setProgress(anglePercent);
    audio.currentTime = anglePercent*audioDuration/100;
}); 

function pausePlaying() {
    isPlaying = false;
    btnStart.innerHTML = 'play_arrow';
    img.classList.add('animate-pause');
}

function stopPlaying() {
    pausePlaying();
    img.classList.remove('animate-pause');
    img.classList.remove('animate-rotate');
}
 
btnStart.addEventListener('click', () => {
    if(isPlaying===false){
        audio.play();
        isPlaying = true;
        btnStart.innerHTML = 'pause';
        img.classList.add('animate-rotate');
        img.classList.remove('animate-pause');
    } else {
        audio.pause();
        pausePlaying();
    }
});

function secToString(sec) {
    const twoDigit = function(num) {
        return ("0" + num).slice(-2);
    };
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec - minutes * 60);

    return twoDigit(minutes) + ":" + twoDigit(seconds);
}

function timeUpdate(currentTime, duration){
    setProgress(Math.floor((currentTime*100)/duration));
    timeLabel.innerHTML = " - " + secToString(currentTime);
    if((duration-1)<currentTime){ stopPlaying(); }
}

function timeLoad(duration){ 
    audioDuration = duration; 
}

// Create a bound on sound pollution xD
var audx = document.getElementById("audio");
audx.volume = 0.3;