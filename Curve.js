class Curve {
  constructor() {
    this.path = []; //holds vectors
    this.current = createVector(); //Current vector which is used to update path
  }

  addPoint() {
    this.path.push(this.current);
  }

  setX(x) { this.current.x = x; }
  setY(y) { this.current.y = y; }

  show(j, i) {
    var c = 256 / (i+j);
    stroke(c, 255, 255); //TODO be thoughtful about color
    strokeWeight(1);
    noFill();

    beginShape()
    for(var v of this.path) { vertex(v.x, v.y); }
    endShape();

    strokeWeight(5);
    stroke(255);
    point(this.current.x, this.current.y);
    this.current = createVector();
  }
}
