var angle = 0;
var w; // width of the circle should be a ratio to screen
var rows;
var cols;
var cx, cy; //center x,y
var x, y; //polar coords
var d, d; //diameter, radius
var off; //offset
var curves; //2D array of curves
var c;

function setup() {
  createCanvas(windowHeight, windowHeight );

  colorMode(HSB);
  w = width / 12;
  cols = floor(width / w) - 1;
  rows = floor(height / w) - 1;
  d = w - .2 * w; //diameter
  r = d / 2;
  // depricate
  curves = [];
  for (var j = 0; j < rows; j++) {
    curves[j] = [];

    for (var i = 0; i < cols; i++) {
      curves[j][i] = new Curve();
    }
  }
}

function draw() {
  background(20);
  //configure draw settings
  stroke(255);
  noFill();

  drawCols();
  drawRows();
  drawPaths();

  //increase da angle, yo
  if (angle <= TWO_PI) {
    angle += .01;
  }

}


//Helper methods
function drawCols() {
  //Draw cols
  for (var i = 0; i < cols; i++) {
    //get color
    c = 256 / (i+1);

    strokeWeight(1);
    stroke(c, 255 ,255);
    cx = w + i * w + w / 2;
    cy = w / 2;
    ellipse(cx, cy, d, d); //big circle

    //draw points
    strokeWeight(8);
    x = r * cos(angle * (i + 1) - PI / 2); //polar conversion
    y = r * sin(angle * (i + 1) - PI / 2);
    stroke(255, 150);
    point(cx + x, cy + y);

    //draw tracer lines //TODO cMOD HERE
    strokeWeight(1);
    line(cx + x, cy + y, cx + x, height);

    //prep curves
    for (var j = 0; j < rows; j++) {
      stroke(i%256, 255, 255)
      curves[j][i].setX(cx + x);
    }

  }
}

function drawRows() {
  for(var j = 0; j < rows; j++) {
    c = 256 / (j);

    strokeWeight(1);
    stroke(c, 255, 255);
    cx = w / 2;
    cy = w + j * w + w / 2;
    ellipse(cx, cy, d, d); //big circle

    //draw points
    strokeWeight(8);
    x = r * cos(angle * (j + 1) - HALF_PI); //polar conversion
    y = r * sin(angle * (j + 1) - HALF_PI);
    stroke(255, 150);
    point(cx + x, cy + y);

    //draw tracer lines //TODO cMOD HERE
    strokeWeight(1);
    line(cx + x, cy + y, width, cy + y);

    //Draw curves
    for(var i = 0; i < cols; i++) {
      curves[j][i].setY(cy + y);
    }
  }
}

function drawPaths() {
  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      curves[j][i].addPoint();
      curves[j][i].show(j, i);
    }
  }
}
