var stage1State = {
    create:function(){
        //adicionar imagem de fundo
        game.add.sprite(0,0,'bg');

        //matrix do labirinto
        this.maze = [// 1 = bloco, 0 = caminho, 2 = player spawn, 3 =moedas spawn
            //ficam dentro de uma submatrix
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],//15 column 10 row
            [1,3,0,3,1,0,0,0,0,0,0,0,0,0,1],
            [1,0,1,1,0,0,1,0,1,1,1,0,1,0,1],
            [1,0,0,0,0,1,0,0,1,2,1,3,0,0,1],
            [1,1,1,0,1,0,0,0,0,0,1,1,1,0,1],
            [1,0,0,0,1,0,1,3,1,1,1,3,1,0,1],
            [1,0,1,0,0,0,0,0,0,1,0,0,1,0,1],
            [1,0,1,0,1,1,0,1,0,1,1,0,1,0,1],
            [1,3,0,0,0,0,0,1,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]

        ];
        // grupo que é responsavel na criação dos blocos de labirinto
        this.blocks = game.add.group();
        //faz com q os blocos tem corpo fisico
        this.blocks.enableBody = true;

        //cria o array que mostra todas as posiveis posição das moedas
        this.coinPositions = [];

        for(var row in this.maze){
            for(var col in this.maze[row]){
                var tile = this.maze[row][col];

                //cria o x e y dos blocos
                var x = col *50;
                var y = row *50;

                if(tile ===1){//cria os blocos
                    var block = this.blocks.create(x,y,'block');
                    block.body.immovable = true; //impede que os blocos sejam empurrados pelo playerr
                }else if(tile ===2){//adiciona o personagem
                    this.player = game.add.sprite(x + 25,y + 25,'player');
                    this.player.anchor.set(.5);
                    //avisa que os recursos de fisica funcona para o player
                    game.physics.arcade.enable(this.player);

                    //animação de movimento do persona
                    this.player.animations.add('goDown',[0,1,2,3,4,5,6,7],12,true); //o 12 é velocidade de frame por segundo, e o true é pra estar em loop
                    this.player.animations.add('goUp',[8,9,10,11,12,13,14,15],12,true); 
                    this.player.animations.add('goLeft',[16,17,18,19,20,21,22,23],12,true); 
                    this.player.animations.add('goRight',[24,25,26,27,28,29,30,31],12,true); 
                } else if (tile === 3){//cria as moedas
                var position = {
                    x: x + 25,
                    y: y +25,
                };
                this.coinPositions.push(position);

                }
            }
        }
        //cria a moeda de fato, o objeto em si
        this.coin = {};
        this.coin.position = this.newPosition();
        this.coin = game.add.sprite(this.coin.position.x,this.coin.position.y,'coin');//cria a image
        this.coin.anchor.set(.5);
        this.coin.animations.add('spin',[0,1,2,3,4,5,6,7,8,9],10,true).play();// cria a animação
        game.physics.arcade.enable(this.coin); // cria a fisica na moeda


        //coletar a moeda
        this.coins = 0; //cria a variavel de pontos de coins
        this.txtCoins = game.add.text(15,15,'Moedas: ' + this.getText(this.coins),{font:'15px emulogic', fill:'#fff'}); //cria o texto na tela



        //controles do jogo
        this.controls = game.input.keyboard.createCursorKeys();

        //inimigo
        this.enemy = game.add.sprite(75,75,'enemy'); // adiciona o sprite
        this.enemy.anchor.set(.5); //centraliza
        game.physics.arcade.enable(this.enemy); //adiciona fisica ao inimigo

        //animação de movimento do inimigo
        this.enemy.animations.add('goDown',[0,1,2,3,4,5,6,7],12,true); 
        this.enemy.animations.add('goUp',[8,9,10,11,12,13,14,15],12,true); 
        this.enemy.animations.add('goLeft',[16,17,18,19,20,21,22,23],12,true); 
        this.enemy.animations.add('goRight',[24,25,26,27,28,29,30,31],12,true); 
        this.enemy.direction = "DOWN"; //direção de movimento inicial do enemy


    },

    update: function(){
        game.physics.arcade.collide(this.player,this.blocks); //adicionaa a colisão do player ao bloco

        this.movePlayer();
        this.moveEnemy();
        

        game.physics.arcade.overlap(this.player,this.coin,this.getCoin,null,this); // colisão com a moeda

    },

    //atualiza o texto das moedas para 3 digitos
    getText: function(value){
        if(value < 10){
            return '00' + value.toString();
        } else if(value < 100){
            return '0' + value.toString();
        } else {
            return value.toString();
        }

    },

    //faz o person pegar a moeda
    getCoin: function(){
        this.coins++;//adiciona moeda
        this.txtCoins.text = 'Moedas: ' + this.getText(this.coins);//atualiza o texto
        this.coin.position = this.newPosition(); // coloca em outra posição a moeda

    },

    moveEnemy: function(){//inteligencia do enemy

        if(Math.floor(this.enemy.x - 25)%50 === 0 && Math.floor(this.enemy.y - 25)%50 === 0){ //vê se o player esta no meio de uma celula
            var enemyCol = Math.floor(this.enemy.x/50); //pega o x que o player está e abaixo pega o Y
            var enemyRow = Math.floor(this.enemy.y/50);

            var validPath = []; //faz o inimigo escolher um caminho

            if(this.maze[enemyRow][enemyCol -1] !== 1 && this.enemy.direction !== 'RIGHT'){//faz ele verificar o caminho q esta indo
                validPath.push('LEFT');
            }
            if(this.maze[enemyRow][enemyCol +1] !== 1 && this.enemy.direction !== 'LEFT'){
                validPath.push('RIGHT');
            }
            if(this.maze[enemyRow -1][enemyCol] !== 1 && this.enemy.direction !== 'DOWN'){
                validPath.push('UP');
            }
            if(this.maze[enemyRow +1][enemyCol] !== 1 && this.enemy.direction !== 'UP'){
                validPath.push('DOWN');
            }

            //faz ele ir pra direção que puder exceto o caminho q já veio
            this.enemy.direction = validPath[Math.floor(Math.random()*validPath.lenght)];

        }
        //move o enemy e muda a animação
        switch(this.enemy.direction){
            case 'LEFT':
                this.enemy.x -=1;
                this.enemy.animations.play('goLeft');
                break;
            case 'RIGHT':
                this.enemy.x +=1;
                this.enemy.animations.play('goRight');
                break;
            case 'UP':
                this.enemy.y -=1;
                this.enemy.animations.play('goUp');
                break;
            case 'DOWN':
                this.enemy.y +=1;
                this.enemy.animations.play('goDown');
                break;
        }

    },

    movePlayer: function(){ //cria o movimento do personagem
        //reseta a velocidade do player
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;

    if(this.controls.left.isDown && !this.controls.right.isDown){
        this.player.body.velocity.x = -100;
        this.player.direction = "left";
    } else //move pra esquerda
    if(this.controls.right.isDown && !this.controls.left.isDown){
        this.player.body.velocity.x = 100;
        this.player.direction = "right";
    }  //move pra direita
    if(this.controls.up.isDown && !this.controls.down.isDown){
        this.player.body.velocity.y = -100;
        this.player.direction = "up";
    } else//move pra cima
    if(this.controls.down.isDown && !this.controls.up.isDown){
        this.player.body.velocity.y = 100;
        this.player.direction = "down";
    }; //move pra baixo
    
    //faz a animação acontecer na direção q o person olha
    switch(this.player.direction){
        case "left":
            this.player.animations.play('goLeft');
            break;
        case "right":
            this.player.animations.play('goRight');
            break;
        case "up":
            this.player.animations.play('goUp');
            break;
        case "down":
            this.player.animations.play('goDown');
            break;
    }

    //faz a animação parar quando ele parar

    if(this.player.body.velocity.x === 0 && this.player.body.velocity.y ===0){
        this.player.animations.stop();
    }

    },

    //novas posiçoes da moeda ao pegar
    newPosition: function(){
        var pos = this.coinPositions[Math.floor(Math.random() * this.coinPositions.length)]; // sortei uma posição nova pra moeda

        while(this.coin.position === pos){ // caso seja a mesma posição ele sorteia novamente
            pos = this.coinPositions[Math.floor(Math.random() * this.coinPositions.length)];
        }

        return pos;
    }
};
