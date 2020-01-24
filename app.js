const WIDTH = 1000;
const HEIGHT = 1000;

class Turtle {
  constructor(pos = { x: 0, y: 0 }, size = 1) {
    this.pos = pos;
    this.size = size;
  }

  angleToMouse() {
    const [x, y] = [this.pos.x, this.pos.y];
    const rise_over_run = (mouseY - y) / (mouseX - x);
    return Math.atan(rise_over_run) + (mouseX < x ? 3.14 : 0);
  }

  draw() {
    const [x, y] = [this.pos.x, this.pos.y];
    push();

    translate(createVector(x, y));
    rotate(this.angleToMouse()); // rotate in direction d

    ellipse(-12, 15, 15); // back right foot
    ellipse(-12, -15, 15); // back left foot
    ellipse(12, 15, 15); // front right foot
    ellipse(12, -15, 15); // front left foot
    ellipse(0, 0, 35); // body
    ellipse(20, 0, 18); // head
    ellipse(0, 0, 4); // spot

    pop(); // undoes the translate and rotate
  }

  dash(dist = 1) {
    const r = this.angleToMouse();
    this.pos.x += Math.cos(r) * dist;
    this.pos.y += Math.sin(r) * dist;
  }
}

const things = [new Turtle({ x: WIDTH / 2, y: HEIGHT / 2 })];

function setup() {
  const canvas = createCanvas(WIDTH, HEIGHT);
  // canvas.parent("app");
}

function draw() {
  background("white");
  things.map(t => t.draw());
}

function mouseClicked() {
  things.forEach(t => {
    t.dash(50);
  });
}

setInterval(() => {
  things.forEach(t => {
    t.dash(1);
  });
}, 100);
