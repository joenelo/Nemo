var PreloadState = {


    preload: function() {
        game.load.tilemap('level1', 'assets/nemo.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'assets/platformer_tiles.png');
        game.load.spritesheet('background', 'assets/nemoBackground1.png', 320, 500);
        game.load.spritesheet('nemo', 'assets/nemo1.png', 48, 30);
        game.load.spritesheet('lizard', 'assets/leftLizard.png', 35, 21);
        game.load.spritesheet('lizard1', 'assets/lizard.png', 35, 21);
        game.load.spritesheet('lizard2', 'assets/leftLizard.png', 35, 21);
        game.load.spritesheet('lizard3', 'assets/lizard.png', 35, 21);
        game.load.spritesheet('mole', 'assets/leftMole.png', 30, 27);
        game.load.spritesheet('mole1', 'assets/leftMole.png', 30, 27);
        game.load.spritesheet('mole2', 'assets/mole.png', 30, 27);
        game.load.spritesheet('crusty', 'assets/leftCrusty.png', 28, 23);
        game.load.spritesheet('crusty1', 'assets/Crusty.png', 28, 23);
        game.load.spritesheet('crusty2', 'assets/Crusty.png', 28, 23);
        game.load.spritesheet('crusty3', 'assets/leftCrusty.png', 28, 23);
        game.load.spritesheet('crusty4', 'assets/Crusty.png', 28, 23);
        game.load.spritesheet('crusty5', 'assets/leftCrusty.png', 28, 23);
        game.load.spritesheet('crusty6', 'assets/Crusty.png', 28, 23);
        game.load.spritesheet('dragon', 'assets/leftDragon.png', 25, 30);
        game.load.spritesheet('dragon1', 'assets/Dragon.png', 25, 30);
        game.load.spritesheet('dragon2', 'assets/Dragon.png', 25, 30);
        game.load.spritesheet('dragon3', 'assets/leftDragon.png', 25, 30);
        game.load.spritesheet('dragon4', 'assets/Dragon.png', 25, 30);
        game.load.spritesheet('dragon5', 'assets/Dragon.png', 25, 30);
        game.load.spritesheet('bee', 'assets/leftBee.png', 25, 26);
        game.load.spritesheet('bee1', 'assets/Bee.png', 25, 26);
        game.load.spritesheet('bee2', 'assets/Bee.png', 25, 26);
        game.load.spritesheet('bee3', 'assets/leftBee.png', 25, 26);
        game.load.spritesheet('bee4', 'assets/Bee.png', 25, 26);
        game.load.spritesheet('bee5', 'assets/leftBee.png', 25, 26);
        game.load.spritesheet('gorilla', 'assets/Gorilla.png', 52, 63);

        game.load.spritesheet('moleBubble', 'assets/enemyBubble.png', 30, 27);


        game.load.audio('jump', 'sounds/Jump.wav');
    },
    create: function() {
    game.state.start('HomeState')
}

};