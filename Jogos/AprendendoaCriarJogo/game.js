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
canvas.width = 384;
canvas.height = 256;
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

//imagem do monstro
let monsterReady = false;
const monsterImage = new Image()
monsterImage.onload = function(){
    monsterReady = true;
}
monsterImage.src = './monster.png'

//objetos do jogo
const hero = {
    speed: 256 // movimento de pixel por segundo

}
const monster = {

}

let monsterPego = 0;

// controle do teclado para movimento
const keysDown = {

}

window.addEventListener('keydown', function (e){ 
    keysDown[e.keyCode] = true;

}, false)

window.addEventListener('keyup', function (e){ 
    delete keysDown[e.keyCode];

}, false)

// reseta o jogo quando o jogador pega o monstro
const reset = function (){
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;

    //posiciona monstros randomicamente na tela
    monster.x = 44 + (Math.random() * (canvas.width - 75)) // 44 é o tamanho da sprite e 75 é pra ele n grudar e cortar o mosntro no meio caso ele spawne perto

    monster.y = 70 + (Math.random() * (canvas.height - 75)) 

}

//atualiza os objetos do jogo
const update = function(modifier){
    if (38 in keysDown){ // press seta pra cima
        hero.y -= hero.speed * modifier // ele subtrai o valor de hero.y, com sua speed


    } 
    if (40 in keysDown){ // tecla pra baixo
        hero.y += hero.speed * modifier
    }
    if (37 in keysDown){ // seta pra esquerda
        hero.x -= hero.speed * modifier
    }
    if (39 in keysDown){ // tecla pra direita
        hero.x += hero.speed * modifier
    }

    //saber se os personagens se encontam
    if(
        hero.x <= (monster.x + 44) && monster.x <= (hero.x + 44) && hero.y <= (monster.y + 70) && monster.y <= (hero.y + 70)
    ){
        ++monsterPego
        reset()
    
    }

}

// renderiza o jogo
const render = function(){
    if (bgReady){
        ctx.drawImage(bgImage, 0, 0);

    }

    if (heroReady){
        ctx.drawImage(heroImage, hero.x, hero.y);

    }

    if (monsterReady){
        ctx.drawImage(monsterImage, monster.x, monster.y)
    }

    ctx.fillStyle = 'rgb(250, 250, 250)'
    ctx.font = '24px Helvetica'
    ctx.tetAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('Monstros pegos: ' + monsterPego, 32, 32);

}

//controla o loop do jogo
const main = function(){
    const now = Date.now();
    const delta = now - then;
    update(delta / 1000);
    render()
    then = now;

    //executa isso o mais breve possivel
    requestAnimationFrame(main);

}
// suporte cross-browser para requestAnimationFrame
const w = window;
const requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame

//que comece o jogo
let then = Date.now();
reset();
main();


