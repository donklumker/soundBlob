// blob responds to sound thanks to Daniel Shiffman, continuing to work through possible permutations
// next step classify the blob 
// push to github test
// again 
// aaaaaagain


let mic;
let yoff = 0;
let noiseMax = 0;
let phase = 0;
let start = 0;
let zoff = 0;

function setup() {

  createCanvas(400, 400, );

  // initiated p5 Audio mic
  mic = new p5.AudioIn();
  mic.start();

}

function draw() {
  background(220);


  let vol = mic.getLevel(); //get volume value between 0 and 1.
  let smoothVol = lerp(start, vol, 0.00028);
  let smoothMap = map(smoothVol, 0, 1, 0, 8000); // map values to larger values

  let radius = smoothMap * 1000; //


  translate(width / 2, height / 2.62);

  noStroke();
  fill(0);
  beginShape();
  let noiseMax = smoothMap * 90;
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
    let xoff = map(cos(a + phase), -1, 1, 0, noiseMax);
    let yoff = map(sin(a + phase), -1, 1, 0, noiseMax);
    let r = map(noise(xoff, yoff, zoff), 0, 1, 100, radius + 50);
    let x = r * cos(a);
    let y = r * sin(a);

    vertex(x, y);




  }
  endShape(CLOSE);
  zoff += smoothMap *2;
  phase += smoothMap * 2;

}
