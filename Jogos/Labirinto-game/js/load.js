var loadState = {
    preload: function(){
        var txtLoading = game.add.text(game.world.centerX,150,'CARREGANDO...',{font:'15px emulogic', fill:'#fff'});//cria o texto
        txtLoading.anchor.set(.5);


        var progressBar = game.add.sprite(game.world.centerX, 250,'progressBar');//cria a sprite pro load
            progressBar.anchor.set(.5);
            game.load.setPreloadSprite(progressBar); // coloca a progressBar carregando para mostrar o load, pra n ficar tela preta 
            

            //carrega as imagens que nã osão sprites, as imagens normais

            game.load.image('bg','img/bg.png');
            game.load.image('block','img/block.png');
            game.load.image('end','img/end.png');
            game.load.image('part','img/part.png');

            //carrega as sprites
            game.load.spritesheet('coin', 'img/coin.png', 32,32);
            game.load.spritesheet('enemy', 'img/enemy.png', 24,40);
            game.load.spritesheet('player', 'img/player.png', 24,32);

            //carrega os audios
            game.load.audio('getitem', 'sfx/getitem.ogg');
            game.load.audio('loseitem', 'sfx/loseitem.ogg');
            game.load.audio('music', 'sfx/music.ogg');


    }

};
