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

        for(var row in this.maze){
            for(var col in this.maze[row]){
                var tile = this.maze[row][col];

                //cria o x e y dos blocos
                var x = col *50;
                var y = row *50;

                if(tile ===1){
                    var block = this.blocks.create(x,y,'block');
                }
            }
        }
    }

};
