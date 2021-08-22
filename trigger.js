//making spacebar an active button
window.addEventListener("keypress",spaceBar )
function spaceBar(e) {
    console.log(e.key)
    if (e.key == " "){
        basketball.shoot();
    }
}

function getDistance(x1, y1, x2, y2) {
    let xD = x2 -x1;
    let yD = y2 - y1;
    return Math.sqrt(Math.pow(xD, 2) + Math.pow(yD, 2))
}

// basketball.move() {
//     this.xVelo = xVelocity;
//     this.yVelo = yVelocity;

// Fps counter
// TODO : Bug fixing at setTimeout >= 1/0

class FPSCounter {
    constructor() {
      this.times = [];
    }
  
    count() {
      const now = performance.now();
      while (this.times.length > 0 && this.times[0] <= now - 1000) {
        this.times.shift();
      }
      this.times.push(now);
      return this.times.length;
    }}
  
  
  $fps = document.querySelector('.fps');
  const myFPS = new FPSCounter();
  const animate = () => {
    $fps.innerHTML = myFPS.count();
    requestAnimationFrame(animate);
  };
  animate();