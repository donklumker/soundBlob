/* slob {sound + blob = slob} responds to sound thanks to 
Daniel Shiffman's youtube videos continuing 
to work through possible permutations */

let mic;
let vol;
let slobs = []; // variable for Slob class;

function setup() {

  createCanvas(600, 600);
  mic = new p5.AudioIn();
  mic.start();
  vol = mic.getLevel();

  let numberOf = 100;

  for (let i = 0; i < numberOf; i++) {

    let rings = i * 10;
    slobs[i] = new Slob(width / 2, height / 2, rings, 0.0005, 20);

  }
}

function draw() {
  background(120);

  for (let i = 0; i < slobs.length; i++) {
    slobs[i].drawSlob();
  }
}

class Slob {
  constructor(xPos, yPos, dim, lerp, fl) {

    this.fl = fl;
    this.dim = dim;
    this.lerp = lerp;
    this.xPos = xPos;
    this.yPos = yPos;
    this.x = 0;
    this.y = 0;
    this.start = 0;
    this.vol;
    this.xoff = 0;
    this.yoff = 0;
    this.noiseMax;
    this.phase = .1;

  }

  drawSlob() {


    noFill();
    stroke(255);
    strokeWeight(.5);

    this.vol = mic.getLevel();
    this.smoothVol = lerp(this.start, this.vol, this.lerp);
    this.smoothMap = map(this.smoothVol, 0, 1, 0, 400);
    this.radius = this.smoothMap * 10;
    //fill(this.fl);

    push();
    translate(this.xPos, this.yPos);
    beginShape();
    this.noiseMax = this.smoothMap * 400;

    for (let a = 0; a < TWO_PI; a += TWO_PI / 600) {
      this.xoff = map(cos(a + this.phase), -1, 1, 0, this.noiseMax);
      this.yoff = map(sin(a), -1, 1, 0, this.noiseMax);
      this.r = map(noise(this.xoff, this.yoff), 0, 1, 50, this.radius + this.dim);
      this.x = this.r * cos(a);
      this.y = this.r * sin(a);
      vertex(this.x, this.y);

    }
    endShape(CLOSE);
    this.phase += this.noiseMax * 0.1;
    pop();
  }

  writeText() {
    text(this.radius, 150, 110);
    text("radius =", 40, 110);
    text(this.smoothMap, 150, 100);
    text("smoothMap =", 40, 100);

  }
}