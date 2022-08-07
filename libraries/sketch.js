// blob responds to sound thanks to Daniel Shiffman, continuing to work through possible permutations
// next step classify the blob 

let mic;
let yoff = 0;
let blob0;
let vol;
// let start = 0;



function setup() {

  createCanvas(400, 400, );

  // initiated p5 Audio mic
  mic = new p5.AudioIn();
  mic.start();
  vol = mic.getLevel();
  


  blob0 = new Slob();

}

function draw() {
  background(220);
  blob0.drawBlob();

}

class Slob {
  constructor() {
    this.start = 0;
    this.vol;
   
    

  }

  drawBlob() {
    //get volume value between 0 and 1.
    this.vol = mic.getLevel();
  
    this.smoothVol = lerp(this.start, this.vol, 0.00028);
    //print (this.smoothVol);
 
    this.smoothMap = map(this.smoothVol, 0, 1, 0, 8000);
    print (this.smoothMap); // map values to larger values
    text (this.smoothMap, 0, 100,);
    this.radius = this.smoothMap * 1000; //
 

    translate(width / 2, height / 2.62);

    noStroke();
    fill(0);
    beginShape();
    this.noiseMax = this.smoothMap * 90;
    push();
    
    translate(0, 100);
    text('noiseMax =', -50, 100);
    text(noiseMax, 25, 100);

    text('radius =', -50, 110);
    text(radius, 25, 110);

    text('phase =', -50, 120);
    text(phase, 25, 120);
    pop();


    for (let a = 0; a < TWO_PI; a += TWO_PI / 600) {
      this.xoff = map(cos(a + this.phase), -1, 1, 0, this.noiseMax);
      this.yoff = map(sin(a + this.phase), -1, 1, 0, this.noiseMax);
      let r = map(noise(this.xoff, this.yoff), 0, 1, 100, this.radius + 50);
      let x = this.r * cos(a);
      let y = this.r * sin(a);

      vertex(this.x, this.y);


    }
    endShape(CLOSE);
    this.zoff += this.smoothMap * 2;
    this.phase += this.smoothMap * 2;
  }
}