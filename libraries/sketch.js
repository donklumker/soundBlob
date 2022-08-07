// blob responds to sound thanks to Daniel Shiffman, continuing to work through possible permutations
// next step classify the blob 

let mic;
let blob0;
let blob1;
let vol;
// let xx = width/2;
// let yy = height/2;
// let start = 0;



function setup() {

  createCanvas(300, 300);

  // initiated p5 Audio mic
  mic = new p5.AudioIn();
  mic.start();
  vol = mic.getLevel();



  blob0 = new Slob(0, 0, 20, 0.002, 220);
  blob1 = new Slob(100, 125, 75, 0.001, 60);

}

function draw() {
  background(220);
  blob1.drawBlob();
  blob0.drawBlob();
 

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
    this.phase = .01;




  }

  drawBlob() {
    //get volume value between 0 and 1.
    this.vol = mic.getLevel();

    this.smoothVol = lerp(this.start, this.vol, this.lerp);
    //print(this.smoothVol);

    this.smoothMap = map(this.smoothVol, 0, 1, 0, 800);
    //print(this.smoothMap); // map values to larger values

    text(this.smoothMap, 150, 100);
    text("smoothMap =", 40, 100);



    this.radius = this.smoothMap * 100;
    text(this.radius, 150, 110);
    text("radius =", 40, 110);


    //text(this.noiseMax, 20, 120);




    translate(this.xPos, this.yPos);



    // print(translate);

    noStroke();
    fill(this.fl);
    beginShape();
    this.noiseMax = this.smoothMap * 400;
    //print (this.noiseMax);

    //text('this.noiseMax', 40, 120);



    for (let a = 0; a < TWO_PI; a += TWO_PI / 300) {
      this.xoff = map(cos(a + this.phase), -1, 1, 0, this.noiseMax);
      this.yoff = map(sin(a + this.phase), -1, 1, 0, this.noiseMax);
      this.r = map(noise(this.xoff, this.yoff), 0, 1, 100, this.radius + this.dim);
      this.x = this.r * cos(a);
      //print (this.x);
      this.y = this.r * sin(a);

      vertex(this.x, this.y);




    }
    endShape(CLOSE);
    this.phase += .01;
  }
}