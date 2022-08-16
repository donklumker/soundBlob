/* slob {sound + blob = slob} responds to sound thanks to 
Daniel Shiffman's youtube videos continuing 
to work through possible permutations */

let mic;
let vol;
let slobs = []; // variable for Slob class;
let pg;
let clrC;

function setup() {



  createCanvas(windowWidth, windowHeight);
  mic = new p5.AudioIn();
  mic.start();
  vol = mic.getLevel();

  let numberOf = 10;

  for (let i = 0; i < numberOf; i++) {

    let rings = i * 30;


    
    slobs[i] = new Slob(width / 2, height / 2, rings, -0.0006, i*55, random(100,220), random (150, 250));
    print (clrC);
    

  }

 //rameRate(15);
}

function draw() {
  background(15);

  
 

  for (let i = 0; i < slobs.length; i++) {
    slobs[i].drawSlob();
  }
}

class Slob {
  constructor(xPos, yPos, dim, lerp, clrA, clrB, clrC) {

    
    this.clrA = clrA;
    this.clrB = clrB;
    this.clrC = clrC;
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
    this.phase = 40;

  }

  drawSlob() {


    
    
   
   // strokeWeight(.5);

    this.vol = mic.getLevel();
    this.smoothVol = lerp(this.start, this.vol, this.lerp);
    this.smoothMap = map(this.smoothVol, 0, 1, 0, 300);
    this.radius = this.smoothMap * 400;
    //fill(this.fl);
    pg = createGraphics(windowWidth, windowHeight);
    
    
    push();
    pg.translate(this.xPos, this.yPos);

   
   pg.beginShape();
   pg.fill(this.clrA, this.clrB, this.clrC);
   

    
    //this.noiseMax = this.smoothMap * 20;

    for (let a = 0; a < TWO_PI; a += TWO_PI / 40) {
      this.xoff = map(cos(a + this.phase), -1, 1, 0, this.noiseMax);
      this.yoff = map(sin(a + this.phase), -1, 1, 0, this.noiseMax);
      this.r = map(noise(this.xoff, this.yoff), 0, 1, 300, this.radius + this.dim);
      this.x = this.r * cos(a);
      this.y = this.r * sin(a);
      pg.vertex(this.x, this.y);
    }

    pg.endShape(CLOSE);



    pg.beginShape();
  
    pg.fill(0);
    pg.blendMode(REMOVE);
   
    this.noiseMax = this.smoothMap * 500;

    for (let a = 0; a < TWO_PI; a += TWO_PI / 80) {
      this.xoff = map(cos(a + this.phase), -1, 1, 0, this.noiseMax);
      this.yoff = map(sin(a), -1, 1, 0, this.noiseMax);
      this.r = map(noise(this.xoff, this.yoff), 0, 1, 50, this.radius + this.dim);
      this.x = this.r * cos(a);
      this.y = this.r * sin(a);
      pg.vertex(this.x, this.y);
      
    }

    pg.endShape(CLOSE);




    this.phase += this.noiseMax  * 0.02;

    image(pg, 0, 0);

    //pg.fill(this.clr);

    
  }

  writeText() {
    text(this.radius, 150, 110);
    text("radius =", 40, 110);
    text(this.smoothMap, 150, 100);
    text("smoothMap =", 40, 100);

  }
  
}