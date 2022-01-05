var menuState = {

    create: function(){
        //cria o objeto musica quando carrega
        this.music   = game.add.audio('music');
        this.music.loop = true; // deixa em loop
        this.music.volume = .5; // vai de 0 a 1 
        this.music.play();//agr sim toca a musica


        //verifica se tem score registrado no storage do navegador
        if(!localStorage.getItem('Labirinto_highScore')){
            localStorage.setItem('Labirinto_highScore',0); // cria caso não tenha

        }

        if(game.global.highScore > localStorage.getItem('Labirinto_highScore')){ //se o record atual for maior  q o armazenado ent...

            localStorage.setItem('Labirinto_highScore',game.global.highScore);

        } else {
            game.global.highScore = localStorage.getItem('Labirinto_highScore');
        }

        var txtHighScore = game.add.text(game.world.centerX,350,'Pontos: ' + game.global.highScore,{font:'20px emulogic',fill:'#D16111'});
        txtHighScore.anchor.set(.5);
        txtHighScore.alpha = 0;


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
            game.add.tween(txtHighScore
            ).to({alpha:1},800).to({alpha:0},800).loop().start(); //faz o texto do highscore piscar


            var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER); // recebe e entende o enter
            enterKey.onDown.addOnce(this.startGame,this);//chama a funcção startGame

            game.add.tween(txtPressStart
                ).to({alpha:1},500).to({alpha:0},500).loop().start()
        },this);

    },

    startGame:function(){// chama o stage 1 quando clicar no enter e para a musica
        this.music.stop();
        game.state.start('stage1');
    }

};
