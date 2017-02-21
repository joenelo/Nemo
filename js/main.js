const LIZARD = 'lizard';
const MOLE = 'mole';
const CRUSTY = 'crusty';
const DRAGON = 'dragon';
const BEE = 'bee';

const Animations = {
    Nemo: {
        WALK: 'walk',
        WAIT: 'wait',
        JUMP: 'jump',
        DUCK: 'duck',
        HIT: 'hit',
        DIE: 'die'
    },
    Enemy: {
        STAND: 'stand'
    }
}
// Create my variables for...

// The map.
var map;
var layer;
var background;
var cursors;
var hitButton;

var bubbles;

// The player.
var nemo;

// Enemies
var enemies;

var mole;
var mole1;
var mole2;

var lizard;
var lizard1;
var lizard2;
var lizard3;

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

    // Nemo Spritesheet
    game.load.spritesheet('nemo', 'assets/nemo1.png', 48, 30);

    // Enemy spritesheets
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

    // sprite assets
    game.load.spritesheet('bubbles', 'assets/bubble.png', 16, 16);

    game.load.audio('jump', 'sounds/Jump.wav');
}

function create() {
    // Create the map.
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.input.onDown.add(gofull, this);

    background = game.add.sprite(0, 2700, 'background');
    background.animations.add('stars', [0, 1, 2, 1], 7, true);
    background.play('stars');
    background.fixedToCamera = true;
    background.cameraOffset.setTo(0, 0);


    map = game.add.tilemap('level1');
    map.addTilesetImage('platformer_tiles', 'tiles');
    layer = map.createLayer('layer1');
    layer.resizeWorld();

    game.physics.startSystem(Phaser.Physics.ARCADE);

    // add sound
    jumpSound = game.add.audio(Animations.Nemo.JUMP);

    // Create Nemo
    nemo = game.add.sprite(32, 3085, 'nemo');
    game.physics.enable(nemo);
    game.physics.arcade.gravity.y = 700;
    nemo.body.collideWorldBounds = true;
    nemo.body.allowGravity = true;
    nemo.body.bounce.y = 0;
    game.camera.follow(nemo);

    nemo.anchor.x = 0.5;
    nemo.anchor.y = 0.5;

    // Make Nemo move
    nemo.animations.add(Animations.Nemo.WALK, [3, 4, 5], 10, true);
    nemo.animations.add(Animations.Nemo.WAIT, [0], 10, true);
    nemo.animations.add(Animations.Nemo.JUMP, [2], 10, true);
    nemo.animations.add(Animations.Nemo.DUCK, [1], 10, true);
    nemo.animations.add(Animations.Nemo.HIT, [11, 13, 14, 15, 16, 15, 14, 0], 20, false);
    nemo.animations.add(Animations.Nemo.DIE, [21, 20, 10, 9, 21, 20, 10, 9], 4, false);

    nemo.body.fixedRotation = true;
    nemo.direction = 'right';
    nemo.body.setSize(20, 20, 14, 10);


    // Add Enemies
    enemies = game.add.group();

    function addMole(x, y, asset, animationFrames) {
        var mole = game.add.sprite(x, y, asset);
        game.physics.enable(mole);
        mole.animations.add(Animations.Enemy.STAND, animationFrames, 2, true);
        mole.play(Animations.Enemy.STAND);
        mole.body.allowGravity = false;
        mole.body.immovable = true;
        mole.shootFrame = 2;
        enemies.add(mole);
    }
    addMole(263, 3061, 'mole', [0, 1, 1, 2, 0]);
    addMole(198, 2933, 'mole1', [1, 2, 0, 0, 1]);
    addMole(50, 2965, 'mole2', [2, 0, 0, 1, 1]);

    function addLizard(x, y, asset, animationFrames) {
        var lizard = game.add.sprite(x, y, asset);
        game.physics.enable(lizard);
        lizard.animations.add(Animations.Enemy.STAND, animationFrames, 2, true);
        lizard.play(Animations.Enemy.STAND);
        lizard.body.allowGravity = false;
        lizard.body.immovable = true;
        enemies.add(lizard);
    }
    addLizard(240, 2715, 'lizard', [1, 4, 3, 5, 6]);
    addLizard(65, 2603, 'lizard1', [1, 4, 3, 5, 6]);
    addLizard(195, 2475, 'lizard2', [1, 4, 3, 5, 6]);
    addLizard(16, 2379, 'lizard3', [1, 4, 3, 5, 6]);

    function addCrusty(x, y, asset, animationFrames) {
        var crusty = game.add.sprite(x, y, asset);
        game.physics.enable(crusty);
        crusty.animations.add(Animations.Enemy.STAND, animationFrames, 2, true);
        crusty.play(Animations.Enemy.STAND);
        crusty.body.allowGravity = false;
        crusty.body.immovable = true;
        enemies.add(crusty);
    }
    addCrusty(220, 2250, 'crusty', [0, 1, 2, 3, 4, 5]);
    addCrusty(65, 2203, 'crusty1', [0, 1, 2, 3, 4, 5]);
    addCrusty(49, 2106, 'crusty2', [0, 1, 2, 3, 4, 5]);
    addCrusty(252, 1898, 'crusty3', [0, 1, 2, 3, 4, 5]);
    addCrusty(32, 1850, 'crusty4', [0, 1, 2, 3, 4, 5]);
    addCrusty(232, 1802, 'crusty5', [0, 1, 2, 3, 4, 5]);
    addCrusty(3, 1626, 'crusty6', [0, 1, 2, 3, 4, 5]);

    function addDragon(x, y, asset, animationFrames) {
        var dragon = game.add.sprite(x, y, asset);
        game.physics.enable(dragon);
        dragon.animations.add(Animations.Enemy.STAND, animationFrames, 2, true);
        dragon.play(Animations.Enemy.STAND);
        dragon.body.allowGravity = false;
        dragon.body.immovable = true;
        enemies.add(dragon);
    }
    addDragon(232, 1538, 'dragon', [1, 2, 0, 3, 4]);
    addDragon(3, 1346, 'dragon1', [1, 2, 0, 3, 4]);
    addDragon(74, 1234, 'dragon2', [1, 2, 0, 3, 4]);
    addDragon(252, 1186, 'dragon3', [1, 2, 0, 3, 4]);
    addDragon(48, 1154, 'dragon4', [1, 2, 0, 3, 4]);
    addDragon(3, 930, 'dragon5', [1, 2, 0, 3, 4]);


    function addBee(x, y, asset, animationFrames) {
        var bee = game.add.sprite(x, y, asset);
        game.physics.enable(bee);
        bee.animations.add(Animations.Enemy.STAND, animationFrames, 2, true);
        bee.play(Animations.Enemy.STAND);
        bee.body.allowGravity = false;
        bee.body.immovable = true;
        enemies.add(bee);
    }
    addBee(294, 758, 'bee', [0, 2, 1, 3, 4, 5]);
    addBee(84, 726, 'bee1', [0, 2, 1, 3, 4, 5]);
    addBee(31, 662, 'bee2', [0, 2, 1, 3, 4, 5]);
    addBee(275, 566, 'bee3', [0, 2, 1, 3, 4, 5]);
    addBee(27, 422, 'bee4', [0, 2, 1, 3, 4, 5]);
    addBee(250, 342, 'bee5', [0, 2, 1, 2, 1, 2, 1, 3, 4, 5]);

    // The enemy's attack
    bubbles = game.add.group();
    bubbles.enableBody = true;
    bubbles.physicsBodyType = Phaser.Physics.ARCADE;
    bubbles.createMultiple(20, 'bubbles');
    bubbles.speed = 200;
    bubbles.checkWorldBounds = true;
    bubbles.outOfBoundsKill = true;
    bubbles.exists = false;

    //GORILLA

    gorilla = game.add.sprite(41, 192, 'gorilla');
    gorilla.animations.add(Animations.Enemy.STAND, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 , 11, 12 , 13, 14, 15 , 16, 17, 18, 19], 2, true);
    gorilla.play(Animations.Enemy.STAND);

    // Controls
    cursors = game.input.keyboard.createCursorKeys();
    hitButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    // Set collisions.
    map.setCollision([2, 3, 5, 41, 105, 106, 107, 108]);

}

function canInterruptAnimation(nemo) {
    return !(nemo.animations.currentAnim.name === Animations.Nemo.HIT && nemo.animations.currentAnim.isPlaying)
        && !(nemo.animations.currentAnim.name === Animations.Nemo.DIE && nemo.animations.currentAnim.isPlaying);
}

function update() {

    game.physics.arcade.collide(nemo, layer);
    game.physics.arcade.collide(nemo, enemies, resolveEnemyCollision, null, this);
    game.physics.arcade.collide(bubbles, nemo, bubbleHitsNemo, null, this);

   // Make Nemo move
    nemo.body.velocity.x = 0;
    var nextAnimation = undefined;
    var nextXVelocity = undefined;
    var nextYVelocity = undefined;

    if (cursors.up.justDown && nemo.body.onFloor()) {
        nextYVelocity = -275;
        nextAnimation = Animations.Nemo.JUMP;
    }
    else if (cursors.left.isDown) {
        if (nemo.direction != 'left') {
            nemo.scale.x *= -1;
            nemo.direction = 'left';
        }
        if (nemo.animations.currentAnim.name != Animations.Nemo.WALK && (nemo.body.onFloor() || nemo.body.touching.down )) {
            nextAnimation = Animations.Nemo.WALK;
        }
        nextXVelocity = -125;
    } else if (cursors.right.isDown) {
        if (nemo.direction != 'right') {
            nemo.scale.x *= -1;
            nemo.direction = 'right';
        }
        if (nemo.animations.currentAnim.name != Animations.Nemo.WALK && (nemo.body.onFloor() || nemo.body.touching.down)) {
            nextAnimation = Animations.Nemo.WALK;
        }
        nextXVelocity = 125;
    } else if (nemo.body.onFloor() || nemo.body.touching.down){
        nextAnimation = Animations.Nemo.WAIT;
    }
    if (hitButton.justDown) {
        nextAnimation = Animations.Nemo.HIT;
        nextXVelocity = 0;
    }
    if (cursors.down.isDown && (nemo.body.onFloor() || nemo.body.touching.down)){
        nextAnimation = Animations.Nemo.DUCK;
        nextXVelocity = 0;
    }

    if (nextXVelocity) {
        nemo.body.velocity.x = nextXVelocity;
    }
    if (nextYVelocity) {
        nemo.body.velocity.y = nextYVelocity;
        jumpSound.play();
    }
    if (nextAnimation && canInterruptAnimation(nemo)) {
        nemo.animations.play(nextAnimation);
    } else if (!canInterruptAnimation(nemo)) {
        nemo.body.velocity.x = 0;
    }

    // Jump through the branches, only collide on top!
    map.forEach(function (through) {
        if (through) { through.collideDown = false;} }, game, 0, 0, map.width, map.height, layer);



}

function enemiesShootBubbles (mole){

        if (mole.animations.currentAnim.currentFrame === mole.shootFrame)
            debugger

            bubbles.fire();

}

function bubbleHitsNemo (nemo, bubbles) {
        nemo.play(Animations.Nemo.DIE);
        bubble.kill();
        nemo.animations.currentAnim.onComplete.add(function () {
            nemo.kill();
        }, this);
}

function resolveEnemyCollision(nemo, enemies) {
            nemo.play(Animations.Nemo.DIE);
            game.physics.arcade.checkCollision.down = false
            nemo.body.collideWorldBounds = false;
            nemo.animations.currentAnim.onComplete.add(function () {
                nemo.kill();
           }, this);
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