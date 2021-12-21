//uma forma de usar o if em texto é o '?' e ':', seria algo como:
//document.write((1>2 ? 'é maior' : 'é menor'))
//escreva 1 é maior q 2? se sim ele mostra o primeiro, senão(:) mostra o segundo resultado
// um outro jeito de usar a função seria:
/*
let quadrado = num => {
    return num * num
}

isso quando tem 1 valor, quando tiver mais coloque assim:

let quadrado = (num1, num2) => {
    return num1 * num2
}

*/ 

//============================================
//cria o canvas, é meio q um quadro para trabalhar com fisica e deixar com cara de jogo

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas)

//imagem de fundo
let bgReady = false;
const bgImage = new Image();

bgImage.onload = function(){
    bgReady = true;

}
bgImage.src = './fundo.jpg';


//imagem do heroi
let heroReady = false;
const heroImage = new Image()
heroImage.onload = function(){
    heroReady = true;
}
heroImage.src = './player.png'