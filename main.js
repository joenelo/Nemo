
var game = new Phaser.Game(320, 500, Phaser.AUTO, '', { preload: preload, create: create , update: update});

// Create my variables for...

// The map.
var map;
var layer;
//var background;
var cursors;
var hitButton;


// The player.
var nemo;





function preload() {
    game.load.tilemap('level1', 'assets/nemo.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/platformer_tiles.png');
    game.load.spritesheet('nemo', 'assets/nemo1.png', 48, 30);
    //game.load.image('background', 'assets/nemoBackground.png');


}

function create() {
    // Create the map.
    map = game.add.tilemap('level1');
    map.addTilesetImage('platformer_tiles', 'tiles');
    layer = map.createLayer('layer1');
    layer.resizeWorld();

    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Create Background
    //game.add.tileSprite(0, 0, 432, 512, "background");

    // Create Nemo
    nemo = game.add.sprite(32, 3085, 'nemo');
    game.physics.enable(nemo, Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 700;
    nemo.body.collideWorldBounds = true;
    nemo.body.allowGravity = true;
    nemo.body.bounce.y = 0;
    nemo.body.linearDamping = 1;
    game.camera.follow(nemo);
    // nemo.scale.x *= -1;

    //nemo.sprite.scale.setTo(0.47, 0.47);
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

    cursors = game.input.keyboard.createCursorKeys();
    hitButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    // Set collisions.
    map.setCollision([2, 3, 5, 41, 105, 106, 107, 108]);

    // Create the enemy.
}

function update() {

    game.physics.arcade.collide(nemo, layer);
    // background.tilePosition.x = 0.5;

   // make Nemo move

    nemo.body.velocity.x = 0;

    if (cursors.left.isDown) {
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

        if (cursors.up.justDown) {
        if (nemo.body.onFloor() || nemo.body.touching.down) {
            nemo.body.velocity.y = -275;
            nemo.animations.play('jump', 20, true);
            //jumpsound.play();
        }
    }
    // if (hitButton.justDown) {
    //         nemo.animations.play('hit', 10, false);
    //     }
    //  else if (hitButton.isDown) {
    //     if (nemo.animations.currentAnim.isPlaying) {
    //     }
    // }
    // if (!cursors.isDown && !(currentAnim = 'hit' && currentAnim = isPlaying && currentAnim.isPlaying = 'jump')) {
    //     nemo.animations.stop();
    //
    // }

    map.forEach(function (through) {
        if (through) { through.collideDown = false;} }, game, 0, 0, map.width, map.height, layer);

}





