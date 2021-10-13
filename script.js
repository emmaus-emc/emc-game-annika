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

var vijandX2 = 350;
var vijandX3 = 500;

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
  vijandY = vijandY + 8;
  if (vijandY > 745) {
    vijandY = -25;
  }
  // kogel

  // speler
  var ArrowLeft = 37;
  var ArrowRight = 39;
  var ArrowUp = 38;
  var ArrowDown = 40;


  if (keyIsDown(ArrowLeft)) {
    spelerX = spelerX - 10;
  }
  if (keyIsDown(ArrowRight)) {
    spelerX = spelerX + 10;
  }
  if (keyIsDown(ArrowUp)) {
    spelerY = spelerY - 10;
  }
  if (keyIsDown(ArrowDown)) {
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
  if (spelerX - vijandX < 50 && spelerY - vijandY < 50 && spelerX - vijandX > -50 && spelerY - vijandY > -50) {
    console.log("you died :(")
    spelerX = 1400;
    health = health - 1;
  }
  if (spelerX - vijandX2 < 50 && spelerY - vijandY < 50 && spelerX - vijandX2 > -50 && spelerY - vijandY > -50) {
    console.log("you died :(")
    spelerX = 1400;
    health = health - 1;
  }
  if (spelerX - vijandX3 < 50 && spelerY - vijandY < 50 && spelerX - vijandX3 > -50 && spelerY - vijandY > -50) {
    console.log("you died :(")
    spelerX = 1400;
    health = health - 1;
  }

  // botsing kogel tegen vijand

};

/**
 * Tekent spelscherm
 */
var tekenAlles = function () {
  // achtergrond
  fill("cyan");
  rect(0, 0, 1280, 720);

  // vijand
  fill("yellow");
  rect(vijandX - 25, vijandY - 25, 50, 50);
  fill(255, 95, 31);
  ellipse(vijandX, vijandY, 15, 15);

  fill("yellow");
  rect(vijandX2 - 25, vijandY - 25, 50, 50);
  fill(255, 95, 31);
  ellipse(vijandX2, vijandY, 15, 15);

  fill("yellow");
  rect(vijandX3 - 25, vijandY - 25, 50, 50);
  fill(255, 95, 31);
  ellipse(vijandX3, vijandY, 15, 15);
  // kogel

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
