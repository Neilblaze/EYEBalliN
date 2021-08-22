const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d')
//   scoreElement.innerText = score;
var localStorageName = "neilblaze";
var highScore;
var hScore;

highScore = localStorage.getItem(localStorageName) == null ? 0 :
            localStorage.getItem(localStorageName);

var Score = function (){
    this.playerScore = 0;
};

if(localStorage.getItem(localStorageName) == null) {
    highScore = 0;
} else {
    highScore = localStorage.getItem(localStorageName);
}



const skylineImg = new Image();
skylineImg.src = './images/cityscapex.jpg';
skylineImg.onload = function (){	
    setInterval(paintCanvas, 10)
};

// creating basketball court & hoop
class Ballhoop {
    constructor(x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    }
draw(){
    ctx.lineWidth = 15;
    ctx.beginPath();
    ctx.lineCap = 'square'
    ctx.strokeStyle = 'rgb(255, 204, 153)'
    ctx.moveTo(this.x + 75, this.y - 175);
    ctx.lineTo(this.x + 75, this.y -50);
    ctx.stroke();
    ctx.closePath();
    ctx.fill();
    // pole
    ctx.beginPath();
    ctx.lineCap = 'square'
    ctx.lineWidth = 8;
    ctx.strokeStyle = 'rgb(160, 160, 160)'
    ctx.moveTo(this.x + 75, this.y - 186)
    ctx.lineTo(this.x + 75, this.y - 270)
    ctx.stroke()
    ctx.closePath();
    // support pole
    ctx.beginPath();
    ctx.lineCap = 'square'
    ctx.lineWidth = 8;
    ctx.strokeStyle = 'rgb(160, 160, 160)'
    ctx.moveTo(this.x + 75, this.y - 270)
    ctx.lineTo(this.x + 20, this.y - 270)
    ctx.stroke();
    ctx.closePath();
    // Backboard
    ctx.beginPath();
    ctx.lineCap = 'square'
    ctx.lineWidth = 12;
    ctx.strokeStyle = 'white'
    ctx.moveTo(this.x + 20, this.y - 250)
    ctx.lineTo(this.x + 20, this.y - 350)
    ctx.stroke()
    ctx.closePath()
    // Rim
    ctx.beginPath();
    ctx.lineCap = 'round'
    ctx.lineWidth = 7;
    ctx.strokeStyle = 'rgb(255, 95, 10)'
    ctx.moveTo(this.x + 15, this.y - 275)
    ctx.lineTo(this.x - 45, this.y - 275)
    ctx.stroke()
    ctx.closePath();
    }
}
const hoop = new Ballhoop(600, 400)

class Ballcourt {
    constructor (x, y, width, height, radius) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.radius = radius;
    }
    draw(){
        // Drawing lines on court
        ctx.beginPath();
        ctx.fillStyle = 'rgb(97, 97, 114)';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.closePath();
        ctx.strokeStyle ='white';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(this.x + 840, this.y + 250);
        ctx.lineTo(this.x + 630, this.y + 15);
        ctx.lineTo(this.x, this.y + 15);
        ctx.moveTo( this.x + 150, this.y + 30);
        ctx.lineTo(this.x +643, this.y + 30);
        ctx.closePath();
        ctx.arc(this.x + 150, this.y + 120, 90,this.radius, Math.PI * 2)
        ctx.stroke();
    }
}
const court = new Ballcourt(0, 300, 700, 150, 20)
let score = 0;
// create basktball dimensions
class Basketball {
    constructor(x, y, radius, score) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.score = score;
        this.startx = x;
        this.starty = y;
        this.dx = -2;
        this.dy = -2;
        this.moving = false;
        this.speed = 4;
        this.gravity = 1;
    }  

// giving ball color 
    draw(){
        ctx.strokeStyle = 'rgb(255, 207, 91)'
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'rgb(204, 102, 0)';
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        // lines on ball
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.x - 25, this.y);
        ctx.lineTo(this.x + 25, this.y);
        ctx.stroke();
        ctx.closePath();
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y - 25);
        ctx.lineTo(this.x, this.y + 25);
        ctx.stroke();
        ctx.closePath();
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.x - 18, this.y - 16);
        ctx.lineTo(this.x - 18, this.y + 16);
        ctx.stroke();
        ctx.closePath();
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.x + 18, this.y - 16);
        ctx.lineTo(this.x + 18, this.y + 16);
        ctx.stroke();
        ctx.closePath();

// TODO ~ Make lines curve
// ctx.beginPath();
// ctx.moveTo(this.x + 18, this.y - 16);
// ctx.bezierCurveTo(10, 50, 10, 50, 10, 20);
// ctx.stroke();
// making ball move
    }
    move(){
        if(this.moving == true){
            this.x += this.dx;
            this.y += this.dy;

            ctx.beginPath();
            ctx.fillStyle ="none"
            ctx.rect(560, 125, 45, 20);
            ctx.fill();
            ctx.closePath();
            // checking collision for going through the rim
            if(getDistance(this.x, this.y, 630, 115) <= 50) {
                score += 1;
                hScore = score;
                this.score = hScore;
                console.log(hScore);
                document.getElementById("currentz").innerHTML = hScore;
                document.getElementById("bestz").innerHTML = hScore;
                // return hScore;
                // scoreElement.innerText = score;
                basketball = new Basketball(30, 370, 25)
            }
            // checking if ball is out of bounds
            if(this.x > canvas.width || this.y > canvas.height || this.x < 0){
                basketball = new Basketball(30, 370, 25)
            }
            // if ball goes out of bounds score resets to 0 
            if(this.x > canvas.width){
                score = 0;
                this.score = hScore;
                console.log(score = 0)
                document.getElementById("currentz").innerHTML = score;
                // hScore = 0;
                // return hScore;
                // return score;
            }
            // if ball hits backboard bounces off
            if((this.x + 585, 125, 12, 100)){
                this.dx = 2
            // if ball hits front of rim ball bounces off 
            }
            if(this.x >= 590,150, 12){
                this.dx = 2
            }
            if(this.y + this.radius > canvas.height){   
            }
        }
    }
    
    // const scoreElement = document.getElementById("HScore");
// making the ball shoot
    shoot(){
        if(!this.moving){
         this.moving = true;
         this.dx = Math.cos(-aimingPoint.rotation) * this.speed;
         this.dy = Math.sin(-aimingPoint.rotation) * this.speed;
        }
    }
    applyGravity() {
        if(this.moving){
            this.gravity += .011;
            this.y += this.gravity;
        }
    }
    getScore(){
        return this.score;
    }
}

// var basketball = function(x,y,radius){
// 	this.x = x;
// 	this.y = y;
// 	this.radius = 0;
// 	this.startAngle = 0;
// 	this.endAngle = Math.PI*2;
// 	this.xVel = 0;
// 	this.yVel = 0;
// 	this.made = false;
// };

let basketball = new Basketball(30, 370, 25)
console.log(basketball.getScore());
document.getElementById("bestz").innerHTML = 24; // Frozen Value Set

class Background {
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    draw(){
    ctx.beginPath();
        ctx.fillStyle = 'rgb(97, 144, 51)';
        ctx.fillRect(this.x, this.y - 20, this.width, this.height);
        ctx.closePath();
    }
} 
background = new Background(0, 300, 700, 25)

// aiming line
 class Aim {
    constructor(){
        this.x = 32;
        this.y = 370;
        this.width = 1;
        this.height = 50;
        this.rotation = Math.PI * 1.5 / 4;
        this.direction = 1;
    }
    draw(){
        ctx.translate(this.x, this.y)
        ctx.rotate(-this.rotation - Math.PI / 2)
        ctx.beginPath()
        drawArrow(ctx, 0, 0, 3, 75, 8, 'black');
        ctx.fillStyle = 'black'
        ctx.fillRect(0, 25, this.width, this.height);
        ctx.closePath();
        // drawArrow(ctx, 20, 23, 65, 65, 10, 'red');
        ctx.rotate(this.rotation + Math.PI / 2)
        ctx.translate(-this.x, -this.y)

        // ctx.beginPath();
        // canvas_arrow(ctx, 10, 30, 200, 150);
        // ctx.stroke();
    }
    
    rotate() {
        this.rotation += .01 * this.direction;
        if(this.rotation > Math.PI/2){
            this.direction = -1
        }
        if(this.rotation <= 0){
            this.direction = 1
        }
    }
 }
 const aimingPoint = new Aim()

    // making each method show up on the canvas 
function paintCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);   
    background.draw();
    ctx.drawImage(skylineImg,0, 0 , 705, 280);
    court.draw();
    basketball.move()
    basketball.draw();
    basketball.applyGravity();
    aimingPoint.rotate();
    hoop.draw();
    aimingPoint.draw();
    // score.draw();
}
 setInterval(paintCanvas, 50)

function draw(){
    var drawing = document.getElementById("drawing");
    var con = drawing.getContext("2d");
    var goofyPic = document.getElementById("goofyPic");
    con.drawImage(goofyPic, 0, 0, 50, 50);
    var image2 = new Image();
    image2.src = "cityscape7.jpg";
    con.drawImage(image2, 100, 100, 70, 50);
  } // end draw



  function drawArrow(ctx, fromx, fromy, tox, toy, arrowWidth, color){
    //variables to be used when creating the arrow
    var headlen = 10;
    var angle = Math.atan2(toy-fromy,tox-fromx);
 
    ctx.save();
    ctx.strokeStyle = color;
 
    //starting path of the arrow from the start square to the end square
    //and drawing the stroke
    ctx.beginPath();
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox, toy);
    ctx.lineWidth = arrowWidth;
    ctx.stroke();
 
    //starting a new path from the head of the arrow to one of the sides of
    //the point
    ctx.beginPath();
    ctx.moveTo(tox, toy);
    ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),
               toy-headlen*Math.sin(angle-Math.PI/7));
 
    //path from the side point of the arrow, to the other side point
    ctx.lineTo(tox-headlen*Math.cos(angle+Math.PI/7),
               toy-headlen*Math.sin(angle+Math.PI/7));
 
    //path from the side point back to the tip of the arrow, and then
    //again to the opposite side point
    ctx.lineTo(tox, toy);
    ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),
               toy-headlen*Math.sin(angle-Math.PI/7));
 
    //draws the paths created above
    ctx.stroke();
    ctx.restore();
}

