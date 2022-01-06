var endState = {

    create: function(){
        game.add.sprite(0,0,'end');

        var txtEnd = game.add.text(game.world.centerX,250,'PRESSIONE ENTER',{font:'20px emulogic', fill:'#f00'});
        txtEnd.anchor.set(.5);
        txtEnd.alpha = 0;

        game.time.events.add(3000,function(){
            game.add.tween(txtEnd).to({alpha:1},500).to({alpha:0},500).loop().start();

            var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
            enterKey.onDown.addOnce(this.backToMenu,this);
        },this);
    },

    backToMenu: function(){
        game.state.start('menu');
    }
};
