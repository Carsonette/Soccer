// Name any p5.js functions we use in the global so Glitch can recognize them.
/* global createCanvas windowWidth loadImage windowHeight colorMode HSL background random
   width height fill noStroke ellipse, image , mouseX,image, animation, loadSound, soundFormats, loadAnimation, mouseY, paddleWidth,stroke, textSize, noFill, rect,  text*/

let dot1, bg, socc, c, power1, score, s2, goal1, player, p, pu,power2,goalboy,cheer, goalie,width,height, boink;
function preload(){
  soundFormats('mp3', 'ogg');
  cheer = loadSound('https://cdn.glitch.com/917f43aa-64e6-4ccd-8898-7c875cbed08c%2FFootball%20Crowd%20Sound%20-%20High%20Quality.mp3?v=1595968874386')
  boink = loadSound('https://cdn.glitch.com/917f43aa-64e6-4ccd-8898-7c875cbed08c%2FHit%20-%20Sound%20Effect.mp3?v=1595872834449')
  p = loadAnimation("https://cdn.glitch.com/917f43aa-64e6-4ccd-8898-7c875cbed08c%2Fd2.png?v=1595886712827", "https://cdn.glitch.com/917f43aa-64e6-4ccd-8898-7c875cbed08c%2Fd3.png?v=1595886718661","https://cdn.glitch.com/917f43aa-64e6-4ccd-8898-7c875cbed08c%2Fd4.png?v=1595886724587","https://cdn.glitch.com/917f43aa-64e6-4ccd-8898-7c875cbed08c%2Fd5.png?v=1595886729851","https://cdn.glitch.com/917f43aa-64e6-4ccd-8898-7c875cbed08c%2Fd6.png?v=1595964718569","https://cdn.glitch.com/917f43aa-64e6-4ccd-8898-7c875cbed08c%2Fd6.png?v=1595964855113","https://cdn.glitch.com/917f43aa-64e6-4ccd-8898-7c875cbed08c%2Fd7.png?v=1595964861014","https://cdn.glitch.com/917f43aa-64e6-4ccd-8898-7c875cbed08c%2Fd8.png?v=1595966283449","https://cdn.glitch.com/917f43aa-64e6-4ccd-8898-7c875cbed08c%2Fd9.png?v=1595964872989");
}
function setup() {
  width = 390
  height = 590
  c = random(0, 360);
  goalboy = loadImage("https://cdn.glitch.com/917f43aa-64e6-4ccd-8898-7c875cbed08c%2F%E2%80%94Pngtree%E2%80%94cartoon%20cartoon%20cartoon%20security%20guard_3921629.png?v=1595967858198")
  bg = loadImage(
    "https://cdn.glitch.com/917f43aa-64e6-4ccd-8898-7c875cbed08c%2Fsbg.png?v=1595816443461");
  pu = loadImage("https://cdn.glitch.com/917f43aa-64e6-4ccd-8898-7c875cbed08c%2Fpu.png?v=1595964174368");
  socc = loadImage("https://cdn.glitch.com/917f43aa-64e6-4ccd-8898-7c875cbed08c%2Fsocc.png?v=1595821770195");
  createCanvas(width, height);
  colorMode(HSL, 360, 100, 100);
  dot1 = new BouncyDot();
  // powers = [];
  // for (let i = 0; i < 10; i++) {
  //   power = new PowerUp();
  //   powers.push(power);
  power1 = new PowerUp();
  power2 = new PowerUp();
  score = 0;
  s2 = 0;
  cheer.setVolume(0.05);
  boink.setVolume(0.5);
  goalie = new goalGuard();
  this.gx = 50;
  this.gxVelocity=3;
  
 
}

function draw() {
  background(bg);
  dot1.float();
  dot1.display();
  textSize(15);
  stroke("black");
  fill("white");
  text(`Score: ${score}`, 15, 40);
  text(`Score: ${s2}`, 310, 565);
  goalPost();
  
  // for (let i = 0; i < powers.length; i++) {
  //   powers[i].show()
  // }
  if(!cheer.isPlaying()) {
    cheer.play();
  }
  power1.show();
  power2.show();
 // drawSprites();
  animation(p,mouseX,mouseY)//sprite?
  //image(p, mouseX, mouseY, 90, 100);
  dot1.checkCollision();
  goalie.display()
  goalie.move()
}

//function mousePressed() {
//   // We'll use this for console log statements only.
//   console.log(dot1.x);
// }
//function 
function goalPost() {
  noFill();
  stroke("white");
  rect(150, 20, 93, 30);
  rect(150, 540, 93, 30);
}

class PowerUp {
  constructor() {
    this.xpos = random(width);
    this.ypos = random(height);
  }
  show() {
    fill(c, 50, 50);
    image(pu,this.xpos, this.ypos, 20, 20);
  }
  checkCollision(){
    if((this.xpos = this.x)&& (this.ypos = this.y)){
      this.x += .5
    }
  }
}
class goalGuard{
  constructor(){
   this.gx= 20;
   this.gy= 80;
  }
  display(){
    image(goalboy,this.gx,this.gy,80,100)
 }
  move(){
    this.gx +=1 
   if (this.gx == width){
     this.gx =20
   }
  }  
  checkCollision(){
    if((this.gx >= this.x) && (this.gx <= this.x + this.r) && (this.gx >= this.y) && (this.gx <= this.y + this.r) ){}
  }
}
// function goalGuard(){
//  image(goalboy,this.gx,this.gy,80,100);
// this. gx += this.gxVelocity;
  
//   if (this.gx >= 390 -200){
//    this.gxVelocity *= -3;
//  }else if (this.gx <= 0 ){
//    this.gxVelocity *= -3;
//  }
// }
class BouncyDot {
  constructor() {
    // Randomly generate position
    this.x = width/2; //c+p this
    this.y = height/2; //this
    // Randomly generate radius
    this.r = random(10, 24);
    // Randomly generate color
    this.color = random(360);
    // Randomly generate a master velocity (broken into components)...
    this.masterXvelocity = 0;//this
    this.masterYvelocity = 0;//this
    // ...and use those as starting velocities.
    this.xVelocity = this.masterXvelocity;
    this.yVelocity = this.masterYvelocity;
  }

  float() {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
    // Standard bounce code - like the DVD logo, but for spheres.
    if (this.x + this.r > width) {
      this.xVelocity = -1 * this.masterXvelocity;
      this.x -=1
      this.y -=1
      boink.play()
    }
    if (this.x - this.r < 0) {
      this.xVelocity = this.masterXvelocity;
      this.x -=1
      this.y -=1
      boink.play()
    }
    if (this.y + this.r > height) {
      this.yVelocity = -1 * this.masterYvelocity;
      this.x -=1
      this.y -=1
      boink.play()
    }
    if (this.y - this.r < 0) {
      this.yVelocity = this.masterYvelocity;
      this.x -=2
      this.y -=2
      boink.play()
    }
    if (this.y < 10 && this.x > (width/2-75) && this.x < (width/2+75) ) {
      s2 += 1;
    }
    if (this.y > 580 && this.x > (width/2-60) && this.x < (width/2+60) ) {
      score += 1;
      boink.play()
    }
  }

  display() {
    image(socc, this.x, this.y, this.r, this.r);
  }
  
  // collision detection ball with power up button
  checkCollision() {
    if ((mouseX >= this.x) && (mouseX <= this.x + this.r) && (mouseY >= this.y) && (mouseY <= this.y + this.r) ){
      this.masterXvelocity += .5;
      this.masterYvelocity += 1;
      this.xVelocity = this.masterXvelocity;
      this.yVelocity = this.masterYvelocity;
    }
  }  
  
}

