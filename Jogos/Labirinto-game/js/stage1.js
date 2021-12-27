var stage1State = {
    create:function(){
        //adicionar imagem de fundo
        game.add.sprite(0,0,'bg');

        //matrix do labirinto
        this.maze = [// 1 = bloco, 0 = caminho, 2 = player spawn, 3 =moedas spawn
            //ficam dentro de uma submatrix
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],//15 column 10 row
            [1,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
            [1,0,1,1,0,0,1,0,1,1,1,0,1,0,1],
            [1,0,0,0,0,1,0,0,1,2,1,0,0,0,1],
            [1,1,1,0,1,0,0,0,0,0,1,1,1,0,1],
            [1,0,0,0,1,0,1,0,1,1,1,0,1,0,1],
            [1,0,1,0,0,0,0,0,0,1,0,0,1,0,1],
            [1,0,1,0,1,1,0,1,0,1,1,0,1,0,1],
            [1,0,0,0,0,0,0,1,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]

        ];
        // grupo que é responsavel na criação dos blocos de labirinto
        this.blocks = game.add.group();
        //faz com q os blocos tem corpo fisico
        this.blocks.enableBody = true;

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
                }
            }
        }

        //controles do jogo
        this.controls = game.input.keyboard.createCursorKeys();
    },

    update: function(){
        game.physics.arcade.collide(this.player,this.blocks); //adicionaa a colisão do player ao bloco
        this.movePlayer();

    },
    movePlayer: function(){ //cria o movimento do personagem
        //reseta a velocidade do player
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;

    if(this.controls.left.isDown && !this.controls.right.isDown){
        this.player.body.velocity.x = -100;
    } //move pra esquerda
    if(this.controls.right.isDown && !this.controls.left.isDown){
        this.player.body.velocity.x = 100;
    } //move pra direita
    if(this.controls.up.isDown && !this.controls.down.isDown){
        this.player.body.velocity.y = -100;
    } //move pra cima
    if(this.controls.down.isDown && !this.controls.up.isDown){
        this.player.body.velocity.y = 100;
    } //move pra baixo
    


    }
};
