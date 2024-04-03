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

function desenharRaquete() {
    rect(xRaquete, yRaquete, LARGURA_RAQUETE, ALTURA_RAQUETE);
}

function movimentarRaquete() {
    // Movimenta a raquete para cima e para baixo
    if (keyIsDown(UP_ARROW)) {
        yRaquete -= 10;
    }

    if (keyIsDown(DOWN_ARROW)) {
        yRaquete += 10;
    }
}

function verificarColisaoRaquete() {
    if (xBola - RAIO < xRaquete + LARGURA_RAQUETE && yBola - RAIO < yRaquete + ALTURA_RAQUETE && yBola + RAIO > yRaquete) {
        velocidadeXBola *= -1;
    }
}

function draw() {
    background(0);
    mostrarBola();
    desenharRaquete();
    movimentarRaquete();
    movimentarBola();
    verificarColisaoBola();
    verificarColisaoRaquete()
}
