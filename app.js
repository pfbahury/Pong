// Dimensões do Canvas
const LARGURA_CANVAS = 600;
const ALTURA_CANVAS = 400;

// Dimensões da Bola
const DIAMETRO_BOLA = 15;
const RAIO = DIAMETRO_BOLA / 2;

//Posição da Bola
let xBola = LARGURA_CANVAS/2;
let yBola = ALTURA_CANVAS/2;

//Velocidade da Bola
let velocidadeXBola = 4;
let velocidadeYBola = 4;

// Dimensões da Raquete
const LARGURA_RAQUETE = 10;
const ALTURA_RAQUETE = 90;

// Posição da Raquete
let xRaquete = 5;
let yRaquete = yBola - ALTURA_RAQUETE/2;

// Dimensões da Raquete do Oponente
const LARGURA_RAQUETE_OPOSTO = LARGURA_RAQUETE;
const ALTURA_RAQUETE_OPOSTO = ALTURA_RAQUETE;

// Posição da Raquete do Oponente
let xRaqueteOposto = LARGURA_CANVAS - LARGURA_RAQUETE - 5;
let yRaqueteOposto = yBola - ALTURA_RAQUETE_OPOSTO/2;

// Velocidade do Oponente
let velocidadeYOposto = 1;

//Placar
let placarJogador = 0
let placarOponente = 0

let chanceDeErrar = 30;

function setup() {
  createCanvas(LARGURA_CANVAS, ALTURA_CANVAS);
}

function mostrarBola() {
    circle(xBola, yBola, DIAMETRO_BOLA);
}

function movimentarBola(){
    xBola += velocidadeXBola;
    yBola += velocidadeYBola;
}

function verificarColisaoBola() {
    if (xBola + RAIO > LARGURA_CANVAS || xBola - RAIO < 0) {
        velocidadeXBola *= -1;
    }

    if (yBola + RAIO > ALTURA_CANVAS || yBola - RAIO< 0) {
        velocidadeYBola *= -1;
    }
}

function desenharRaquete(x, y) {
    rect(x, y, LARGURA_RAQUETE, ALTURA_RAQUETE);
}

function movimentarRaquete() {
    // Movimenta a raquete para cima e para baixo
    if (keyIsDown(UP_ARROW)) {
        yRaquete -= 10;
    }

    if (keyIsDown(DOWN_ARROW)) {
        yRaquete += 10;
    }

    yRaquete = constrain(yRaquete, 0, ALTURA_CANVAS - ALTURA_RAQUETE);
}

function verificarColisaoRaquete() {
    if (xBola - RAIO < xRaquete + LARGURA_RAQUETE && 
        yBola - RAIO < yRaquete + ALTURA_RAQUETE && 
        yBola + RAIO > yRaquete) {
        velocidadeXBola *= -1;
    }
}

function calculaChanceDeErrar() {
    if (placarOponente > placarJogador) {
      chanceDeErrar = 60;
    }
    if (placarOponente < placarJogador && chanceDeErrar > 50) {
        chanceDeErrar -=3;
  }

}
function movimentarRaqueteOponente() {
    // Movimenta a raquete para cima e para baixo
    velocidadeYOposto = yBola - yRaqueteOposto - ALTURA_RAQUETE_OPOSTO / 2 - chanceDeErrar;
    yRaqueteOposto += velocidadeYOposto;
    calculaChanceDeErrar()

    yRaqueteOposto = constrain(yRaqueteOposto, 0, ALTURA_CANVAS - ALTURA_RAQUETE_OPOSTO);
}

function verificarColisaoRaqueteOposto() {
    if (xBola + RAIO > xRaqueteOposto && 
        xBola - RAIO < xRaqueteOposto + LARGURA_RAQUETE_OPOSTO && 
        yBola + RAIO > yRaqueteOposto && 
        yBola - RAIO < yRaqueteOposto + ALTURA_RAQUETE_OPOSTO) {
        velocidadeXBola *= -1;
    }
}
function bolaNaoFicaPresa(){
    if (xBola - RAIO < 0){
    xBola = 23
    }
}



function incluiPlacar() {
    stroke(255);
    textAlign(CENTER);
    textSize(16);
    fill(color(255, 140, 0));
    rect(150, 10, 40, 20);
    fill(255);
    text(placarJogador, 170, 26);
    fill(color(255, 140, 0));
    rect(450, 10, 40, 20);
    fill(255);
    text(placarOponente, 470, 26);
}


function marcarPonto(){
    if(xBola >= LARGURA_CANVAS - RAIO){
        placarJogador += 1
    }
    if (xBola < RAIO){
        placarOponente += 1
    }
}

function draw() {
    background(0);
    mostrarBola();
    desenharRaquete(xRaquete, yRaquete);
    desenharRaquete(xRaqueteOposto, yRaqueteOposto);
    movimentarRaquete();
    movimentarBola();
    verificarColisaoBola();
    movimentarRaqueteOponente();
    verificarColisaoRaquete();
    verificarColisaoRaqueteOposto();
    incluiPlacar()
    marcarPonto();
    bolaNaoFicaPresa();
}