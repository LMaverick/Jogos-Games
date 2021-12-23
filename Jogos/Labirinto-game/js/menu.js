var menuState = {

    create: function(){
        //cria o objeto musica quando carrega
        this.music   = game.add.audio('music');
        this.music.loop = true; // deixa em loop
        this.music.volume = .5; // vai de 0 a 1 
        this.music.play();//agr sim toca a musica



        //cria o texto
        var txtLabirinto = game.add.text(game.world.centerX,150,'Labirinto',{font:'40px emulogic', fill:'#fff'});
        txtLabirinto.anchor.set(.5);

        //cria o pressione enter
        var txtPressStart = game.add.text(game.world.centerX,550,'Pressione Enter',{font:'20px emulogic',fill:'#fff'});
        txtPressStart.anchor.set(.5);

        //cria o efeito para o texto aparecer
        game.add.tween(txtPressStart).to({y:250},1000).start();//o Y significa que vc quer q a posição final dele seja no numero em questão, o 1000 é 1s q é o tempo que ele tem para finalizar a animação, e o start significa q ele pode iniciar assim q carregar

        //permite apertar enter pra iniciar o jogo
        game.time.events.add(1000,function(){
            var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER); // recebe e entende o enter
            enterKey.onDown.addOnce(this.startGame,this);//chama a funcção startGame
        },this);

    },

    startGame:function(){// chama o stage 1 quando clicar no enter e para a musica
        this.music.stop();
        game.state.start('stage1');
    }

};
