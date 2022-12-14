let cupImage;
let leaves = [];
let teaStrength = 10;
let waterAmount = 450;
let drainSpeed = 0.1;
let drinking = true;

let dateString = "";

let moonphase;

function preload() {

    cupImage = loadImage("./cup.png");
    moonphase = loadJSON("https://moonphases.co.uk/service/getMoonDetails.php");
}

function setup() {

    createCanvas(windowWidth, windowHeight);
    createBackground();

    imageMode(CENTER);
    rectMode(CENTER);
    angleMode(DEGREES);
    textAlign(CENTER, CENTER);
    noStroke();
    textFont("Alegreya SC");

    getDateString();
}

function draw() {

    if (leaves.length < 300) {
        leaves.push(new Leaf(0, 0));
    }

    updatePixels();
    drawCup();
    drawWater();
    displayText();

    for (let i = 0; i < leaves.length; i++) {
        leaves[i].update();
    }

    for (let i = 0; i < leaves.length; i++) {
        leaves[i].display();
    }

    let stillDrinking = false;

    for (let i = 0; i < leaves.length; i++) {

        if (!leaves[i].stuck) {
            stillDrinking += 1;
        }
    }

    if (teaStrength < 180) {
        teaStrength += 0.1;
    }

    if (teaStrength > 150 && stillDrinking > 10 && waterAmount > 230) {
        waterAmount -= drainSpeed;
        drainSpeed += 0.001;
    }

    if (teaStrength > 150 && stillDrinking <= 10) {
        drinking = false;
    }
}

function drawCup() {

    push();

    translate(width/2, height/2);
    image(cupImage, 0, 0, 600, 600);

    pop();
}

function drawWater() {

    push();

    translate(width/2, height/2);
    fill(122, 88, 0, teaStrength)
    ellipse(0, 0, waterAmount);

    pop();
}

function lerpColour(a, b, amount) {

    let ah = parseInt(a.replace(/#/g, ""), 16),
        ar = ah >> 16,
        ag = ah >> 8 & 0xff,
        ab = ah & 0xff,
        bh = parseInt(b.replace(/#/g, ""), 16),
        br = bh >> 16,
        bg = bh >> 8 & 0xff,
        bb = bh & 0xff,
        rr = ar + amount * (br - ar),
        rg = ag + amount * (bg - ag),
        rb = ab + amount * (bb - ab);

    return "#" + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1);
}

function createBackground() {

	for (let i = 0; i < width; i++) {
		for (let j = 0; j < height; j++) {

			if (random() > 0.5) {
				set(i, j, color("#6D6577"));
			} else {
				set(i, j, color("#746A80"));
			}
		}
	}
	updatePixels();
}

function displayText() {

    push();
    translate(width/2, height/2 - 340);

    fill("#544B60");
    textSize(30);
    text(dateString, 0, 0);
    pop();
}

function getDateString() {

    let string = "";
    let date = new Date();
    string += date.toLocaleString('default', {weekday: 'long'});
    string += " " + date.getDate();
    string += " " + date.toLocaleString('default', {month: 'long'});
    string += " " + date.getFullYear();
    string += "\n";

    string += moonphase.days[0].phase_name;
    string += " in " + moonphase.moonsign;

    dateString = string;
}
