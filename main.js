
// Create my variables for...

// The map.
var map;
var layer;
var background;
var cursors;
var hitButton;

// The player.
var nemo;

// Enemies
var lizard;
var lizard1;
var lizard2;
var lizard3;

var mole;
var mole1;
var mole2;

var crusty;
var crusty1;
var crusty2;
var crusty3;
var crusty4;
var crusty5;
var crusty6;

var dragon;
var dragon1;
var dragon2;
var dragon3;
var dragon4;
var dragon5;

var bee;
var bee1;
var bee2;
var bee3;
var bee4;
var bee5;

var gorilla;

// sounds
var jumpSound;





var game = new Phaser.Game(320, 500, Phaser.AUTO, '', { preload: preload, create: create , update: update});


function preload() {
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
    //game.load.image('background', 'assets/nemoBackground.png');

    game.load.audio('jump', 'sounds/Jump.wav');

}

function create() {
    // Create the map.
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.input.onDown.add(gofull, this);

    //game.add.tileSprite(0, 0, game.width, game.height, [0, 1, 2], 'background');
    background = game.add.sprite(game.width, game.height, 'background');


    map = game.add.tilemap('level1');
    map.addTilesetImage('platformer_tiles', 'tiles');
    layer = map.createLayer('layer1');
    layer.resizeWorld();


    game.physics.startSystem(Phaser.Physics.ARCADE);
    jumpSound = game.add.audio('jump');



    // Create Nemo
    nemo = game.add.sprite(32, 3085, 'nemo');
    game.physics.enable(nemo, lizard, mole, crusty);
    game.physics.arcade.gravity.y = 700;
    nemo.body.collideWorldBounds = true;
    nemo.body.allowGravity = true;
    nemo.body.bounce.y = 0;
    game.camera.follow(nemo);

    nemo.anchor.x = 0.5;
    nemo.anchor.y = 0.5;

    // Make Nemo move
    nemo.animations.add('left', [3, 4, 5], 10, true);
    nemo.animations.add('wait', [0], 10, true);
    nemo.animations.add('jump', [2], 10, true);
    nemo.animations.add('duck', [1], 10, true);
    nemo.animations.add('hit', [11, 13, 14, 15, 16, 15, 14, 0], 20, true);
    nemo.body.fixedRotation = true;
    nemo.direction = 'right';
    nemo.body.setSize(30, 20, 0, 10);

    // Mole
    mole = game.add.sprite(263, 3061, 'mole');
    mole.animations.add('stand', [0, 1, 1, 2, 0], 2, true);
    mole.play('stand');


    //Mole1
    mole1 = game.add.sprite(198, 2933, 'mole1');
    mole1.animations.add('stand', [1, 2, 0, 0, 1], 2, true);
    mole1.play('stand');


    //Mole2
    mole2 = game.add.sprite(50, 2965, 'mole2');
    mole2.animations.add('stand', [2, 0, 0, 1, 1], 2, true);
    mole2.play('stand');


    // //Lizard  sprite creation
    lizard = game.add.sprite(240, 2715, 'lizard');
    lizard.animations.add('stand', [1, 4, 3, 5, 6], 2, true);
    lizard.play('stand');

    // Lizard 2
    lizard1 = game.add.sprite(65, 2603, 'lizard1');
    lizard1.animations.add('stand', [1, 4, 3, 5, 6], 2, true);
    lizard1.play('stand');

    // Lizard 2
    lizard2 = game.add.sprite(195, 2475, 'lizard2');
    lizard2.animations.add('stand', [1, 4, 3, 5, 6], 2, true);
    lizard2.play('stand');

    // Lizard 3
    lizard3 = game.add.sprite(16, 2379, 'lizard3');
    lizard3.animations.add('stand', [1, 4, 3, 4, 3, 4, 3, 4, 1, 5, 6], 2, true);
    lizard3.play('stand');


    //Crusty
    crusty = game.add.sprite(220, 2250, 'crusty');
    crusty.animations.add('stand', [0, 1, 2, 3, 4, 5], 2, true);
    crusty.play('stand');

  //Crusty1
    crusty1 = game.add.sprite(65, 2203, 'crusty1');
    crusty1.animations.add('stand', [0, 1, 2, 3, 4, 5], 2, true);
    crusty1.play('stand');

  //Crusty2
    crusty2 = game.add.sprite(49, 2106, 'crusty2');
    crusty2.animations.add('stand', [0, 1, 2, 3, 4, 5], 2, true);
    crusty2.play('stand');

    //Crusty3
    crusty3 = game.add.sprite(252, 1898, 'crusty3');
    crusty3.animations.add('stand', [0, 1, 2, 3, 4, 5], 2, true);
    crusty3.play('stand');

    //Crusty4
    crusty4 = game.add.sprite(32, 1850, 'crusty4');
    crusty4.animations.add('stand', [0, 1, 2, 3, 4, 5], 2, true);
    crusty4.play('stand');

    //Crusty5
    crusty5 = game.add.sprite(232, 1802, 'crusty5');
    crusty5.animations.add('stand', [0, 1, 2, 3, 4, 5], 2, true);
    crusty5.play('stand');

    //Crusty6
    crusty6 = game.add.sprite(3, 1626, 'crusty6');
    crusty6.animations.add('stand', [0, 1, 2, 3, 4, 5], 2, true);
    crusty6.play('stand');

    //Dragon
    dragon = game.add.sprite(232, 1538, 'dragon');
    dragon.animations.add('stand', [1, 2, 0, 3, 4], 2, true);
    dragon.play('stand');

    //Dragon1
    dragon1 = game.add.sprite(3, 1346, 'dragon1');
    dragon1.animations.add('stand', [1, 2, 0, 3, 4], 2, true);
    dragon1.play('stand');

    //Dragon
    dragon2 = game.add.sprite(74, 1234, 'dragon2');
    dragon2.animations.add('stand', [1, 2, 0, 3, 4], 2, true);
    dragon2.play('stand');

    //Dragon
    dragon3 = game.add.sprite(252, 1186, 'dragon3');
    dragon3.animations.add('stand', [1, 2, 0, 3, 4], 2, true);
    dragon3.play('stand');

    //Dragon
    dragon4 = game.add.sprite(48, 1154, 'dragon4');
    dragon4.animations.add('stand', [1, 2, 0, 3, 4], 2, true);
    dragon4.play('stand');

    //Dragon
    dragon5 = game.add.sprite(3, 930, 'dragon5');
    dragon5.animations.add('stand', [1, 2, 0, 3, 4], 2, true);
    dragon5.play('stand');

    // Bee
    bee = game.add.sprite(294, 758, 'bee');
    bee.animations.add('stand', [0, 1, 2, 3, 4, 5], 2, true);
    bee.play('stand');

    // Bee1
    bee1 = game.add.sprite(84, 726, 'bee1');
    bee1.animations.add('stand', [0, 1, 2, 3, 4, 5], 2, true);
    bee1.play('stand');

    // Bee2
    bee2 = game.add.sprite(31, 662, 'bee2');
    bee2.animations.add('stand', [0, 1, 2, 3, 4, 5], 2, true);
    bee2.play('stand');

    // Bee3
    bee3 = game.add.sprite(275, 566, 'bee3');
    bee3.animations.add('stand', [0, 1, 2, 3, 4, 5], 2, true);
    bee3.play('stand');

    // Bee4
    bee4 = game.add.sprite(27, 422, 'bee4');
    bee4.animations.add('stand', [0, 1, 2, 3, 4, 5], 2, true);
    bee4.play('stand');

    // Bee5
    bee5 = game.add.sprite(250, 342, 'bee5');
    bee5.animations.add('stand', [0, 1, 2, 3, 4, 5], 2, true);
    bee5.play('stand');


    //GORILLA

    gorilla = game.add.sprite(41, 192, 'gorilla');
    gorilla.animations.add('stand', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 , 11, 12 , 13, 14, 15 , 16, 17, 18, 19], 2, true);
    gorilla.play('stand');









    cursors = game.input.keyboard.createCursorKeys();
    hitButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    // Set collisions.
    map.setCollision([2, 3, 5, 41, 105, 106, 107, 108]);

}

function update() {

    game.physics.arcade.collide(nemo, layer);
    game.physics.arcade.collide(nemo, lizard);
    game.physics.arcade.collide(lizard, layer);
    // background.tilePosition.x = 0.5;

   // Make Nemo move
    nemo.body.velocity.x = 0;

    if (hitButton.justDown) {
            nemo.animations.play('hit', 10, false);
        }

    else if (cursors.up.justDown && nemo.body.onFloor()) {
        nemo.body.velocity.y = -275;
        nemo.animations.play('jump');

        jumpSound.play();
    }

    else if (cursors.left.isDown) {
        if (nemo.direction != 'left') {
            nemo.scale.x *= -1;
            nemo.direction = 'left';
        }
        if (nemo.body.velocity.x == 0 ||
            (nemo.animations.currentAnim.name != 'left' && (nemo.body.onFloor() || nemo.body.touching.down))) {
            nemo.animations.play('left', 10, true);
        }

        nemo.body.velocity.x -= 125;


    } else if (cursors.right.isDown) {
        if (nemo.direction != 'right') {
            nemo.scale.x *= -1;
            nemo.direction = 'right';
        }
        if (nemo.body.velocity.x == 0 ||
            (nemo.animations.currentAnim.name != 'left' && (nemo.body.onFloor() || nemo.body.touching.down))) {
            nemo.animations.play('left', 10, true);
        }
        nemo.body.velocity.x += 125;

     } else {
        nemo.animations.play('wait',1 ,true);
        }

        if (cursors.down.isDown){
            nemo.animations.play('duck', 1, true);
            nemo.body.velocity.x = 0;
        }




    map.forEach(function (through) {
        if (through) { through.collideDown = false;} }, game, 0, 0, map.width, map.height, layer);

}


function gofull() {

    if (game.scale.isFullScreen)
    {
        game.scale.stopFullScreen();
    }
    else
    {
        game.scale.startFullScreen(false);
    }

}



