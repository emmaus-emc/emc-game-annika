/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */

/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */

const SPELEN = 1;
const GAMEOVER = 2;
var spelStatus = SPELEN;

var spelerX = 600; // x-positie van speler
var spelerY = 600; // y-positie van speler

var vijandX = 200;
var vijandY = 25;

const x = [100, 200, 300, 400, 500, 600, 700, 800];
const y = [25, 26, 27, 28, 29, 30, 31, 32];
const kogelY = [];
const kogelX = [];
var j = 0;

var health = 5;
var punten = 0;
var score = 0;
var puntX = 1200;

/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */

var beweegAlles = function () {
  // vijand

  // vijandY = vijandY + 8;
  //if (vijandY > 745) {
  //  vijandY = -25; }

  for (var i = 0; i < y.length; i++) {
    y[i] = y[i] + 8;
    if (y[i] > 720) {
      y[i] = 25;
    }
  }

  // kogel

  //kogelY = kogelY - 12;
  var Space = 32;

  //if(keyIsDown(Space)) {
  //  kogelX = spelerX;
  //  kogelY = spelerY - 40;
  //}

  if (keyIsDown(Space)) {
    kogelY.push(spelerY);
    kogelX.push(spelerX);
  }

  for (var i = 0; i < kogelY.length; i++) {
    kogelY[i] = kogelY[i] - 12;

  }

  // speler

  if (keyIsDown(LEFT_ARROW)) {
    spelerX = spelerX - 10;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    spelerX = spelerX + 10;
  }
  if (keyIsDown(UP_ARROW)) {
    spelerY = spelerY - 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    spelerY = spelerY + 10;
  }

  if (spelerX < 25) {
    spelerX = 25;
  }
  if (spelerX > 1255) {
    spelerX = 1255;
  }
  if (spelerY < 25) {
    spelerY = 25;
  }
  if (spelerY > 695) {
    spelerY = 695;
  }


};

/**
 * Checkt botsingen
 * Verwijdert neergeschoten vijanden
 * Updatet globale variabelen punten en health
 */
var verwerkBotsing = function () {
  // botsing speler tegen vijand
  /* let i = 0;
   for(i=0; i < 8; i++){
     if (spelerX - (vijandX + i*100) < 50 && 
          spelerY - vijandY < 50 && 
          spelerX - (vijandX + i*100) > -50 && 
          spelerY - vijandY > -50) {
      console.log("you died :(" + "i =" + i);
      spelerX = 1400;
      health = health - 1;
       } 
   } */

  for (var j = 0; j < y.length; j++) {
    if ((spelerX - x[j]) < 50 &&
      (spelerY - y[j]) < 50 &&
      (spelerX - x[j]) > -50 &&
      (spelerY - y[j]) > -50) {
      console.log("you died :(" + "j=" + j);
      spelerX = 1400;
      health = health - 1;
    }
  }

  // botsing kogel tegen vijand
  for (var i = 0; i < y.length; i++) { // vijanden
    for (var j = 0; j < kogelX.length; j++) { // kogels
      if ((kogelX[j] - x[i]) < 30 &&
        (kogelY[j] - y[i]) < 30 &&
        (kogelX[j] - x[i]) > -30 &&
        (kogelY[j] - y[i]) > -30) {
        console.log("direct hit");
        y[i] = -99999999;
        // kogel weghalen met splice ;
        kogelX.splice(j, 1);
        kogelY.splice(j, 1);
        punten = punten + 50;
      }
    }
  }

};

/**
 * Tekent spelscherm
 */
var tekenAlles = function () {
  // achtergrond
  fill("cyan");
  rect(0, 0, 1280, 720);

  // vijand

  for (let j = 0; j < x.length; j++) {
    fill("yellow");
    rect(x[j] - 25, y[j] - 25, 50, 50);
    fill(255, 95, 31);
    ellipse(x[j], y[j], 15, 15);
  }

  // kogel
  for (var j = 0; j < kogelX.length; j = j + 1) {
    fill("black");
    ellipse(kogelX[j], kogelY[j], 17, 17);
  }

  // speler
  fill("fuchsia");
  rect(spelerX - 25, spelerY - 25, 50, 50);
  fill("purple");
  ellipse(spelerX, spelerY, 15, 15);

  // punten en health
  textSize(40)
  text(health, 20, 50)
  score = floor(punten);
  text(score, puntX, 50)
  punten = punten + 1 / 50;
  if (punten > 10) {
    puntX = 1175;
  }
  if (punten > 100) {
    puntX = 1150;
  }
};



/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */

/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

  // Kleur de achtergrond blauw, zodat je het kunt zien
  background('cyan');
}

/**
 * draw
 * de code in deze functie wordt 50 keer per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  if (spelStatus === SPELEN) {
    beweegAlles();
    verwerkBotsing();
    tekenAlles();
    if (health <= 0) {
      spelStatus = GAMEOVER;
    }
  }
  if (spelStatus === GAMEOVER) {
    // teken game-over scherm
    console.log("gameover")
    fill("red");
    textSize(80);
    text("GAMEOVER", 350, 200);
    fill("black");
    textSize(40);
    text(score, 350, 250);
  }
}
