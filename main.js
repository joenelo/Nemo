
// Create my variables for...

// The map.
var map;
var layer;
//var background;
var cursors;
var hitButton;



// The player.
var nemo;
var lizard;
var mole;
var mole1;

var jumpSound;





var game = new Phaser.Game(320, 500, Phaser.AUTO, '', { preload: preload, create: create , update: update});


function preload() {
    game.load.tilemap('level1', 'assets/nemo.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/platformer_tiles.png');
    game.load.spritesheet('nemo', 'assets/nemo1.png', 48, 30);
    game.load.spritesheet('lizard', 'assets/lizard.png', 35, 21);
    game.load.spritesheet('mole', 'assets/mole.png', 30, 27);
    game.load.spritesheet('mole1', 'assets/mole.png', 30, 27);
    //game.load.image('background', 'assets/nemoBackground.png');

    game.load.audio('jump', 'sounds/Jump.wav');

}

function create() {
    // Create the map.
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.input.onDown.add(gofull, this);

    map = game.add.tilemap('level1');
    map.addTilesetImage('platformer_tiles', 'tiles');
    layer = map.createLayer('layer1');
    layer.resizeWorld();

    game.physics.startSystem(Phaser.Physics.ARCADE);
    jumpSound = game.add.audio('jump');

    // Create Background
    //game.add.tileSprite(0, 0, 432, 512, "background");

    // Create Nemo
    nemo = game.add.sprite(32, 3085, 'nemo');
    game.physics.enable(nemo, lizard, mole);
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



    //
    // //Lizard  sprite creation
    lizard = game.add.sprite(55, 2971, 'lizard');
    lizard.animations.add('stand', [1, 4, 3, 5, 6], 2, true);
    lizard.play('stand');


    // Mole
    mole = game.add.sprite(275, 3075, 'mole');
    mole.anchor.x = 0.5;
    mole.anchor.y = 0.5;
    mole.scale.x *=-1;
    mole.animations.add('stand', [0, 1, 1, 2, 0], 2, true);
    mole.play('stand');


    //Mole1
    mole1 = game.add.sprite(255, 2995, 'mole1');


    // Bee

    // Crab

    //Fish

    //Dragon

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

    if (hitButton.isPressed || hitButton.isDown) {
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



