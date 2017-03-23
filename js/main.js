
// -- Create Constant Variables -- //
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
        STAND: 'stand',
        STILL: 'still',
        SLEEP: 'sleep'
    },
    Bubble: {
        FLOAT: 'float'
    },
    Stinger: {
        STING: 'sting'
    },
    Fireball: {
        EXHALE: 'exhale'
    }
};

// -- Create my variables for... -- //

// -- The map -- //
var map;
var layer;
var background;
var cursors;
var hitButton;

// -- Enemy attack variables -- //
var enemyBubbles;
var enemyBubble;
var stinger;
var stingers;
var fireball;
var fireballs;

// -- The player -- //
var nemo;
var nemoBubbles;
var nemoBubble;
var canHitGorilla = true;

// -- Enemies -- //
var enemies;
var dragons;
var bees;

// -- make shoot frames so enemies can attack when they open their mouths
var shootingFrames = {
    mole: { shootingFrame: 2, yOffset: 15 },
    lizard: { shootingFrame: 3, yOffset: 12 },
    crusty: { shootingFrame: 2, yOffset: 12 },
    dragon: { shootingFrame: 0, yOffset: 14 },
    bee: { shootingFrame: 1, yOffset: 20 },
    gorilla: { shootingFrame: 4, yOffset: 10 }
};

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

// -- Boss Variables -- //
var gorilla;
var gorillaHP = 3;
var gorillaSleeping = false;
var explosionPlayed = false;

// -- Gorilla being attacked sprites variables -- //
var explosion;
var banana;
var bananas;

// -- Variable to stop multiple Collisions during death animation -- //
var nemoCollides = false;

// -- Sounds -- //
var jumpSound;
var bubblePop;
var sleepSound;
var music;
var enemyGetsHit;
var bossGetsHit;
var bossDies;
var bossMusic;
var youWinSong;
var nemoDies;

// -- Win Banner - //
var youWinPhoto;

var game = new Phaser.Game(320, 500, Phaser.AUTO, '');

// -------------------------------------------------------------------------------//
// -Main State of Game so that the player can restart the game each time they die-//
// -------------------------------------------------------------------------------//

var mainState = {
    preload: function () {

    // -- Load the tile map, level, and background here -- //
    game.load.tilemap('level1', 'assets/nemo.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/platformer_tiles.png');
    game.load.spritesheet('background', 'assets/nemoBackground1.png', 320, 500);

    // -- Nemo Spritesheet --//
    game.load.spritesheet('nemo', 'assets/nemo1.png', 48, 30);

    // -- Enemy spritesheets --//
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
    game.load.spritesheet('banana', 'assets/banana.png',23, 22);

    // -- sprite assets --//
    game.load.image('nemoBubble', 'assets/nemoBubble.png', 16, 16);
    game.load.spritesheet('bubble', 'assets/bubble.png', 16, 16);
    game.load.spritesheet('bubblePop', 'assets/bubblepop.png', 16, 16);
    game.load.spritesheet('stinger', 'assets/stinger.png', 8, 5);
    game.load.spritesheet('fireball', 'assets/fireball.png', 21, 11);
    game.load.spritesheet('explosion', 'assets/explosion.png', 128, 128);

    // -- Load sounds --//
    game.load.audio('jump', 'sounds/Jump.wav');
    game.load.audio('pop', 'sounds/BubblePop.mp3');
    game.load.audio('sleep', 'sounds/KOSOund.mp3');
    game.load.audio('music', 'sounds/NightSea.mp3');
    game.load.audio('enemyGetsHit', 'sounds/EnemyGetsHit.wav');
    game.load.audio('bossGetsHit', 'sounds/BossGetsHit.wav');
    game.load.audio('bossDies', 'sounds/BossDies.wav');
    game.load.audio('bossMusic', 'sounds/peanutbutterjelly.mp3');
    game.load.audio('youWinMusic', 'sounds/NextLevel.wav');
    game.load.audio('nemoDies', 'sounds/HeroDies.wav');

    // -- Load Win Banner --//
    game.load.image('winBanner', 'assets/LittleNemoLogo.png');
},

create: function () {

    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL; // -- Create the map --//

    // -- Go full screen with click of the mouse(Literally click your mouse  --//
    game.input.onDown.add(this.gofull, this);

    // -- loading background and great background animation -- //
    background = game.add.sprite(0, 2700, 'background');
    background.animations.add('stars', [0, 1, 2, 1], 7, true);
    background.play('stars');
    background.fixedToCamera = true;
    background.cameraOffset.setTo(0, 0);

    // -- Add Map and Tile Map + layers -- //
    map = game.add.tilemap('level1');
    map.addTilesetImage('platformer_tiles', 'tiles');
    layer = map.createLayer('layer1');
    layer.resizeWorld();

    // -- start Arcade Physics Engine -- //
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // -- add sound to the game so its now useable  -- //
    jumpSound = game.add.audio(Animations.Nemo.JUMP);
    sleepSound = game.add.audio(Animations.Enemy.SLEEP);
    sleepSound.loop = true;
    music = game.add.audio('music');
    bubblePop = game.add.audio('pop');
    enemyGetsHit = game.add.audio('enemyGetsHit');
    bossGetsHit = game.add.audio('bossGetsHit');
    bossDies = game.add.audio('bossDies');
    bossMusic = game.add.audio('bossMusic');
    youWinSong = game.add.audio('youWinSong');
    nemoDies = game.add.audio('nemoDies');

    // -- Add and play Level Music -- //
    music.loop = true;
    music.play();

    //----------------------------------//
    //-------- Create Nemo Here --------//
    //----------------------------------//

    nemo = game.add.sprite(30, 3100, 'nemo');
    game.physics.enable(nemo);
    game.physics.arcade.gravity.y = 700;
    nemo.body.collideWorldBounds = true;
    nemo.body.allowGravity = true;
    nemo.body.bounce.y = 0;
    game.camera.follow(nemo);

    nemo.anchor.x = 0.5;
    nemo.anchor.y = 0.5;

    // -- Make Nemo animations for his movements -- //
    nemo.animations.add(Animations.Nemo.WALK, [3, 4, 5], 10, true);
    nemo.animations.add(Animations.Nemo.WAIT, [0], 10, true);
    nemo.animations.add(Animations.Nemo.JUMP, [2], 10, true);
    nemo.animations.add(Animations.Nemo.DUCK, [1], 10, true);
    nemo.animations.add(Animations.Nemo.HIT, [11, 13, 14, 15, 16, 15, 14, 0], 20, false);
    nemo.animations.add(Animations.Nemo.DIE, [21, 20, 10, 9, 21, 20, 10, 9], 4, false);

    // -- Allow his one directional sprite sheet to be used in the opposite direction -- //
    nemo.body.fixedRotation = true;
    nemo.direction = 'right';
    // -- set Nemo's body size -- //
    nemo.body.setSize(20, 20, 14, 10);

    //----------------------------------//
    //-------- Add Enemy groups --------//
    //----------------------------------//

    enemies = game.add.group();
    enemies.enableBody = true;
    bees = game.add.group();
    bees.enableBody = true;
    dragons = game.add.group();
    dragons.enableBody = true;

    // -----------------------------------------//
    // ------- Create Individual Enemies -------//
    // ------and add each enemy to a group------//
    // -----------------------------------------//

    function addMole(x, y, asset, animationFrames) {
        var mole = game.add.sprite(x, y, asset);
        mole.name = MOLE;
        game.physics.enable(mole);
        mole.animations.add(Animations.Enemy.STAND, animationFrames, 2, true);
        mole.animations.add(Animations.Enemy.SLEEP, [3, 4], 2, true);
        mole.play(Animations.Enemy.STAND);
        mole.body.allowGravity = false;
        mole.body.immovable = true;
        mole.shootFrame = 2;
        enemies.add(mole);
    }
    addMole(263, 3061, 'mole', [0, 0, 0, 0, 1, 1, 2, 0]);
    addMole(198, 2933, 'mole1', [1, 2, 0, 0, 1]);
    addMole(50, 2965, 'mole2', [2, 0, 0, 1, 1]);

    function addLizard(x, y, asset, animationFrames) {
        var lizard = game.add.sprite(x, y, asset);
        lizard.name = LIZARD;
        game.physics.enable(lizard);
        lizard.animations.add(Animations.Enemy.STAND, animationFrames, 4, true);
        lizard.animations.add(Animations.Enemy.SLEEP, [6, 5], 2, true);
        lizard.play(Animations.Enemy.STAND);
        lizard.body.allowGravity = false;
        lizard.body.immovable = true;
        enemies.add(lizard);
    }
    addLizard(240, 2715, 'lizard', [ 1, 1, 1, 1, 1, 1, 1, 1, 4, 2, 3]);
    addLizard(65, 2603, 'lizard1', [1, 1, 1, 1, 1, 1, 1, 4, 2, 3]);
    addLizard(195, 2475, 'lizard2', [1, 1, 1, 1, 1, 1, 1, 1, 4, 2, 3]);
    addLizard(16, 2379, 'lizard3', [1, 1, 1, 1, 1, 1, 4, 2, 3, 4, 2, 3, 4, 2, 3]);

    function addCrusty(x, y, asset, animationFrames) {
        var crusty = game.add.sprite(x, y, asset);
        crusty.name = CRUSTY;
        game.physics.enable(crusty);
        crusty.animations.add(Animations.Enemy.STAND, animationFrames, 2, true);
        crusty.animations.add(Animations.Enemy.SLEEP, [4, 5], 2, true);
        crusty.play(Animations.Enemy.STAND);
        crusty.body.allowGravity = false;
        crusty.body.immovable = true;
        enemies.add(crusty);
    }
    addCrusty(220, 2250, 'crusty', [0, 1, 0, 1, 0, 1, 0, 1, 3, 2]);
    addCrusty(65, 2202, 'crusty1', [0, 1, 0, 1, 1, 3, 2]);
    addCrusty(49, 2106, 'crusty2', [0, 1, 0, 1, 3, 2]);
    addCrusty(252, 1898, 'crusty3', [1, 0, 1, 0, 1, 0, 1, 3, 2]);
    addCrusty(32, 1850, 'crusty4', [1, 0, 1, 0, 1, 0, 1, 0, 1, 3, 2]);
    addCrusty(232, 1802, 'crusty5', [0, 1, 0, 1, 2, 3]);
    addCrusty(3, 1626, 'crusty6', [0, 1, 0, 1, 3, 2, 3, 2, 3, 2]);

    function addDragon(x, y, asset, animationFrames) {
        var dragon = game.add.sprite(x, y, asset);
        dragon.name = DRAGON;
        game.physics.enable(dragon);
        dragon.animations.add(Animations.Enemy.STAND, animationFrames, 2, true);
        dragon.animations.add(Animations.Enemy.SLEEP, [4, 3], 2, true);
        dragon.play(Animations.Enemy.STAND);
        dragon.body.allowGravity = false;
        dragon.body.immovable = true;
        dragons.add(dragon);
    }
    addDragon(232, 1538, 'dragon', [2, 1, 2, 1, 2, 1, 2, 0]);
    addDragon(3, 1346, 'dragon1', [2, 1, 2, 1, 2, 0]);
    addDragon(74, 1234, 'dragon2', [2, 1, 2, 1, 2, 1, 2, 0, 2, 1, 2, 1, 2, 1, 2, 0, 2, 0]);
    addDragon(252, 1186, 'dragon3', [2, 1, 2, 1, 2, 1, 2, 0, 2, 1, 2, 1, 2, 1, 2, 0, 2, 0, 2, 0]);
    addDragon(48, 1154, 'dragon4', [2, 1, 2, 1, 2, 1, 2, 0]);
    addDragon(3, 930, 'dragon5', [2, 1, 2, 0, 2, 1, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 2, 0, 2, 1, 2, 0, 2, 0, 2, 0]);


    function addBee(x, y, asset, animationFrames) {
        var bee = game.add.sprite(x, y, asset);
        bee.name = BEE;
        game.physics.enable(bee);
        bee.animations.add(Animations.Enemy.STAND, animationFrames, 2, true);
        bee.animations.add(Animations.Enemy.SLEEP, [4, 5], 2, true);
        bee.play(Animations.Enemy.STAND);
        bee.body.allowGravity = false;
        bee.body.immovable = true;
        bees.add(bee);
    }
    addBee(294, 758, 'bee', [2, 3, 0, 1]);
    addBee(84, 726, 'bee1', [2, 3, 0, 1, 2, 3, 0, 0, 1, 2, 3, 0, 0, 0, 1]);
    addBee(31, 662, 'bee2', [3, 0, 1, 2, 3, 0, 2, 3, 0, 1, 0, 1]);
    addBee(275, 566, 'bee3', [2, 3, 0, 3, 0, 1]);
    addBee(27, 422, 'bee4', [0, 2, 1, 3]);
    addBee(250, 342, 'bee5', [0, 2, 1, 2, 1, 2, 1, 3]);

    // -----------------------------------------//
    // -------- Create End off of Game ---------//
    // -----------------------------------------//
    gorilla = game.add.sprite(41, 222, 'gorilla');
    game.physics.enable(gorilla);
    gorilla.animations.add(Animations.Enemy.SLEEP, [5, 6], 2, true);
    gorilla.animations.add(Animations.Enemy.STAND, [2, 1], 1.75, true);
    gorilla.animations.add(Animations.Enemy.STILL, [1], 0, true);
    gorilla.play(Animations.Enemy.STILL);
    gorilla.body.fixedRotation = true;
    gorilla.body.collideWorldBounds = true;
    gorilla.anchor.x = 0.5;
    gorilla.anchor.y = 0.5;
    gorilla.body.setSize(35, 32, 3, 30);
    gorilla.facing = 'right';





    // -----------------------------------------//
    // ------- Turn on Keyboard and Mouse ------//
    // -----------------------------------------//
    cursors = game.input.keyboard.createCursorKeys();
    hitButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    // -----------------------------------------//
    // --------- Create Map Collisions ---------//
    // -----------------------------------------//

    map.setCollision([2, 3, 5, 41, 105, 106, 107, 108]);


    // -----------------------------------------//
    // -------- Add Enemy Attack Groups --------//
    // -----------------------------------------//


    enemyBubbles = game.add.group();
    game.physics.enable(enemyBubbles, Phaser.Physics.ARCADE);

    nemoBubbles = game.add.group();
    game.physics.enable(enemyBubbles, Phaser.Physics.ARCADE);

    stingers = game.add.group();
    game.physics.enable(stingers, Phaser.Physics.ARCADE);

    fireballs = game.add.group();
    game.physics.enable(fireballs, Phaser.Physics.ARCADE);

    bananas = game.add.group();
    game.physics.enable(bananas, Phaser.Physics.ARCADE);


    // -----------------------------------------//
    // --------- End of Create Section ---------//
    // -----------------------------------------//
},



// -----------------------------------------------------//
// --------- Create Interruptions for Controls ---------//
// -----------------------------------------------------//


    canInterruptAnimation: function (nemo) {
    return !(nemo.animations.currentAnim.name === Animations.Nemo.HIT && nemo.animations.currentAnim.isPlaying)
        && !(nemo.animations.currentAnim.name === Animations.Nemo.DIE && nemo.animations.currentAnim.isPlaying);
},


    // -----------------------------------------//
    // ------------ Start of Update  -----------//
    // -----------------------------------------//

    update: function () {



    // -----------------------------------------//
    // ----------- Calling functions -----------//
    // -----------------------------------------//

    if (nemoCollides === false) {
        this.gorillaPath();
    }

    this.enemiesShootBubble();
    this.dragonsFireBreath();
    this.beeStings();


    game.physics.arcade.collide(nemo, layer);
    game.physics.arcade.collide(gorilla, layer);

    // -- Wrap all things that kill Nemo in the Collide variable and set it to false, this will avoid multiple collisions and -- //
    // -- Stop your sounds from firing each time Nemo collides with something during his death animation  -- //
    if (nemoCollides === false) {
        game.physics.arcade.collide(nemo, enemies, this.resolveEnemyCollision, null, this);
        game.physics.arcade.collide(nemo, dragons, this.resolveDragonCollision, null, this);
        game.physics.arcade.collide(nemo, bees, this.resolveBeeCollision, null, this);
        game.physics.arcade.collide(enemyBubbles, nemo, this.bubbleHitsNemo, null, this);
        game.physics.arcade.collide(enemyBubbles, nemoBubbles, this.bubblesCollide, null, this);
        game.physics.arcade.collide(stingers, nemo, this.beeStingHitsNemo, null, this);
        game.physics.arcade.collide(fireballs, nemo, this.fireballHitsNemo, null, this);
        game.physics.arcade.collide(gorilla, nemo, this.resolveGorillaCollision, null, this);
    }
    if (canHitGorilla == true) {
        game.physics.arcade.collide(gorilla, nemoBubbles,  this.gorillaResolveNemoBubble, null, this);
    }
        game.physics.arcade.collide(nemoBubbles, enemies, this.enemiesResolveNemoBubbles, null, this);
        game.physics.arcade.collide(nemoBubbles, bees, this.beesNemoBubbles, null, this);
        game.physics.arcade.collide(nemoBubbles, dragons, this.dragonNemoBubbles, null, this);
    if (explosionPlayed === false) {
            game.physics.arcade.collide(bananas, nemo, this.bananaCollide, null, this);
    }


    // -----------------------------------------//
    // ------------- Nemo Controls -------------//
    // -----------------------------------------//

    nemo.body.velocity.x = 0;
    var nextAnimation = undefined;
    var nextXVelocity = undefined;
    var nextYVelocity = undefined;

    if (explosionPlayed === false) {

        if (gorillaHP <= 0) {
            this.gorillaDies();
        }


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
            nemoShoots();
            nextAnimation = Animations.Nemo.HIT;
            nextXVelocity = 0;
        }

        // -----------------------------------------//
        // - Create Nemo's attack in his Movements -//
        // -----------------------------------------//

        function nemoShoots () {
            if (nemo.direction === 'right') {
                nemoBubble = game.add.sprite(nemo.x +18, nemo.y -5, 'nemoBubble');
                game.physics.enable(nemoBubble, Phaser.Physics.ARCADE);

            }
            else {
                nemoBubble = game.add.sprite(nemo.x -18, nemo.y -5, 'nemoBubble');
                nemoBubble.scale.x *= -1;
                game.physics.enable(nemoBubble, Phaser.Physics.ARCADE);
            }

            game.physics.enable(nemoBubble, Phaser.Physics.ARCADE);
            nemoBubble.anchor.setTo(0.5, 0.5);
            nemoBubble.body.allowGravity = false;
            nemoBubble.lifespan = 200;

            nemoBubble.alpha = 0;
            nemoBubbles.add(nemoBubble);
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
        if (nextAnimation && this.canInterruptAnimation(nemo)) {
            nemo.animations.play(nextAnimation);
        } else if (!this.canInterruptAnimation(nemo)) {
            nemo.body.velocity.x = 0;
        }
    }

     // ---------------------------------------------------- //
    // -- Jump through the branches, only collide on top! -- //
    // ---------------------------------------------------- //

    map.forEach(function (through) {
        if (through) { through.collideDown = false;} }, game, 0, 0, map.width, map.height, layer);

},
// -----------------------------------------//
// ----------- End of Movements ------------//
// -----------------------------------------//


// -------------------------------------------------------------------//
// --------- This is where the enemy shoots their bubbles ------------//
// -------------------------------------------------------------------//

    enemiesShootBubble: function () {
    enemies.forEach(shouldEnemyShoot, this, true);
    function shouldEnemyShoot(enemy) {
        if (enemy.name && enemy.animations.currentFrame.index === shootingFrames[enemy.name].shootingFrame) {
            if (!enemy.hasFired) {
                enemy.hasFired = true;
                // -- Create enemyBubble attack. -- //
                if (enemy.position.x < 160) {
                    enemyBubble = game.add.sprite(enemy.x + 28, enemy.y + shootingFrames[enemy.name].yOffset, 'bubble');
                    game.physics.enable(enemyBubble, Phaser.Physics.ARCADE);
                    enemyBubble.body.velocity.x = 30;
                }
                // -- If Enemy is facing left, shoot the bubble the opposite way -- //
                else {
                    enemyBubble = game.add.sprite(enemy.x, enemy.y + shootingFrames[enemy.name].yOffset, 'bubble');
                    game.physics.enable(enemyBubble, Phaser.Physics.ARCADE);
                    enemyBubble.scale.x *= -1;
                    enemyBubble.body.velocity.x = -30;

                }
                // -- Add an animation to the attack bubble, and it to a group -- //
                enemyBubble.animations.add(Animations.Enemy.FLOAT, [0, 1], 3, true);
                enemyBubble.play(Animations.Enemy.FLOAT);
                enemyBubble.anchor.setTo(0.5, 0.5);
                enemyBubble.body.allowGravity = false;
                enemyBubble.checkWorldBounds = true;
                enemyBubble.outOfBoundsKill = true;
                enemyBubbles.add(enemyBubble);
            }
        } else {
            enemy.hasFired = false;
        }
    }
},

// -------------------------------------------------------------------//
// ------------ This is where the dragon shoots its fire  ------------//
// -------------------------------------------------------------------//
    dragonsFireBreath: function  () {

    dragons.forEach(shouldDragonBreath, this, true);
    function shouldDragonBreath(dragon) {
        if (dragon.name && dragon.animations.currentFrame.index === shootingFrames[dragon.name].shootingFrame) {
            if (!dragon.hasFired) {
                dragon.hasFired = true;
                // Create fireball.
                if (dragon.position.x < 160) {
                    fireball = game.add.sprite(dragon.x + 28, dragon.y + shootingFrames[dragon.name].yOffset, 'fireball');
                    game.physics.enable(fireball, Phaser.Physics.ARCADE);
                    fireball.body.velocity.x = 35;
                }
                // -- If the dragon is facing left, shoot the fire ball the other way -- //
                else {
                    fireball = game.add.sprite(dragon.x, dragon.y + shootingFrames[dragon.name].yOffset, 'fireball');
                    game.physics.enable(fireball, Phaser.Physics.ARCADE);
                    fireball.scale.x *= -1;
                    fireball.body.velocity.x = -35;
                }

                // -- Add animation to the fire balls so it change size & color  and add it to a group -- //
                fireball.animations.add(Animations.Enemy.EXHALE, [0, 1, 2, 3, 4, 5], 18, true);
                fireball.play(Animations.Enemy.EXHALE);
                fireball.anchor.setTo(0.5, 0.5);
                fireball.body.allowGravity = false;
                fireball.checkWorldBounds = true;
                fireball.outOfBoundsKill = true;
                fireballs.add(fireball);
            }
        } else {
            dragon.hasFired = false;
        }
    }
},

// -------------------------------------------------------------------//
// ------------ This is where the bee shoots its stinger  ------------//
// -------------------------------------------------------------------//
    beeStings: function  () {

    bees.forEach(shouldBeeSting, this, true);
    function shouldBeeSting(bee) {

        if (bee.name && bee.animations.currentFrame.index === shootingFrames[bee.name].shootingFrame) {
            if (!bee.hasFired) {
                bee.hasFired = true;
                // Create stinger.
                if (bee.position.x < 160) {
                    stinger = game.add.sprite(bee.x + 28, bee.y + shootingFrames[bee.name].yOffset, 'stinger');
                    game.physics.enable(stinger, Phaser.Physics.ARCADE);
                    stinger.body.velocity.x = 30;
                }
                // -- If the bee is facing left, shoot the stinger the other way -- //
                else {
                    stinger = game.add.sprite(bee.x, bee.y + shootingFrames[bee.name].yOffset, 'stinger');
                    game.physics.enable(stinger, Phaser.Physics.ARCADE);
                    stinger.scale.x *= -1;
                    stinger.body.velocity.x = -30;
                }
                // -- Add animation to the stinger so it change color and add it to a group -- //
                stinger.animations.add(Animations.Enemy.STING, [0, 1, 2, 3, 4, 5, 6, 7], 21, true);
                stinger.play(Animations.Enemy.STING);
                stinger.anchor.setTo(0.5, 0.5);
                stinger.body.allowGravity = false;
                stinger.checkWorldBounds = true;
                stinger.outOfBoundsKill = true;
                stingers.add(stinger);
            }
        } else {
            bee.hasFired = false;
        }
    }
},


// --------------------------------------------------------------------------//
// ------------ This is where the nemo and enemy bubbles collide ------------//
// --------------------------------------------------------------------------//
bubbleHitsNemo: function  (nemo, bubbles) {
    // -- Make nemo collision true -- //
    nemoCollides = true;
    bubblePop.play();
    nemoDies.play();
    bubbles.kill();
    music.stop();
    bubbles.body = null;
    nemo.play(Animations.Nemo.DIE);
    game.physics.arcade.checkCollision.down = false;
    nemo.body.collideWorldBounds = false;
    nemo.animations.currentAnim.onComplete.add(function () {
        // -- when animation is complete, kill nemo and restart the level -- //
        nemo.kill();
        this.restartLevel();
    }, this);
},


// --------------------------------------------------------------------------//
// ------------ This is where the nemo and fireballs collide ----------------//
// --------------------------------------------------------------------------//
fireballHitsNemo: function  (nemo, fireballs) {
    // -- Make nemo collision true -- //
    nemoCollides = true;
    nemoDies.play();
    music.stop();
    fireballs.kill();
    fireballs.body = null;
    nemo.play(Animations.Nemo.DIE);
    game.physics.arcade.checkCollision.down = false;
    nemo.body.collideWorldBounds = false;
    // -- when animation is complete, kill nemo and restart the level -- //
    nemo.animations.currentAnim.onComplete.add(function () {
        nemo.kill();
        this.restartLevel();
    }, this);
},

// --------------------------------------------------------------------------//
// ------------ This is where the nemo and stingers collide ------ ----------//
// --------------------------------------------------------------------------//
beeStingHitsNemo: function  (nemo, stingers) {
    // -- Make nemo collision true -- //
    nemoCollides = true;
    nemoDies.play();
    music.stop();
    stingers.kill();
    stingers.body = null;
    nemo.play(Animations.Nemo.DIE);
    game.physics.arcade.checkCollision.down = false;
    nemo.body.collideWorldBounds = false;
    nemo.animations.currentAnim.onComplete.add(function () {
    // -- when animation is complete, kill nemo and restart the level -- //
        nemo.kill();
        this.restartLevel();
    }, this);
},


// --------------------------------------------------------------------------//
// ----------------- This is where the nemo Ko's Enemies  -------------------//
// --------------------------------------------------------------------------//
enemiesResolveNemoBubbles: function  (nemoBubbles, enemy) {
    // -- Play sounds -- //
    enemyGetsHit.play();
    sleepSound.play();
    // -- kill Nemos translucent bubble so no more collisions happen -- //
    nemoBubbles.kill();
    // -- play enemy sleep animation for 5 seconds -- //
    enemy.play(Animations.Enemy.SLEEP);
    game.time.events.add(Phaser.Timer.SECOND * 5, playSleepAnimation, this);
    function playSleepAnimation () {
        // -- restart the enemy animation -- //
        enemy.play(Animations.Enemy.STAND);
        // -- stop the sleep sound -- //
        sleepSound.stop();
    }
},

// --------------------------------------------------------------------------//
// ----------------- This is where the nemo Ko's dragons  -------------------//
// --------------------------------------------------------------------------//
dragonNemoBubbles: function  (nemoBubbles, dragon) {
    // -- Play sounds -- //
    enemyGetsHit.play();
    sleepSound.play();

    nemoBubbles.kill(); // -- kill Nemos translucent bubble so no more collisions happen -- //

    // -- play dragon sleep animation for 5 seconds -- //
    dragon.play(Animations.Enemy.SLEEP);
    game.time.events.add(Phaser.Timer.SECOND * 5, playSleepAnimation, this);
    function playSleepAnimation () {
        dragon.play(Animations.Enemy.STAND); // -- restart the dragon animation -- //
        sleepSound.stop(); // -- stop the sleep sound -- //
    }
},

// -----------------------------------------------------------------------//
// ----------------- This is where the nemo Ko's bees  -------------------//
// -----------------------------------------------------------------------//
beesNemoBubbles: function  (nemoBubbles, bee) {
    // -- Play sounds -- //
    enemyGetsHit.play();
    sleepSound.play();

    nemoBubbles.kill(); // -- kill Nemos translucent bubble so no more collisions happen -- //

    // -- play bee sleep animation for 5 seconds -- //
    bee.play(Animations.Enemy.SLEEP);
    game.time.events.add(Phaser.Timer.SECOND * 5, playSleepAnimation, this);
    function playSleepAnimation () {
        bee.play(Animations.Enemy.STAND); // -- restart the bee animation -- //
        sleepSound.stop(); // -- stop the sleep sound -- //
    }
},

// ---------------------------------------------------------------------------------//
// ----------------- This is where the nemo attack kills bubbles -------------------//
// ---------------------------------------------------------------------------------//
bubblesCollide: function  (nemoBubbles, enemyBubbles) {
    bubblePop.play(); // -- Play sound -- //
    // -- kill bubbles -- //
    nemoBubbles.kill();
    enemyBubbles.kill();
},


// ---------------------------------------------------------------------------------//
// ----------------- Kill Nemo if he makes contact with enemies --------------------//
// ---------------------------------------------------------------------------------//
resolveEnemyCollision: function (nemo, enemies) {

    nemoCollides = true; // -- Make nemo collision true -- //
    music.stop(); // -- stop level music -- //
    nemoDies.play(); // -- play death scene music -- //
    nemo.play(Animations.Nemo.DIE); // -- play death animation -- //

    // -- remove other possible collisions -- //
    game.physics.arcade.checkCollision.down = false;
    nemo.body.collideWorldBounds = false;
    nemo.animations.currentAnim.onComplete.add(function () {
        // -- kill nemo and restart the level -- //
        nemo.kill();
        this.restartLevel();
    }, this);
},

// ---------------------------------------------------------------------------------//
// ----------------- Kill Nemo if he makes contact with Dragons --------------------//
// ---------------------------------------------------------------------------------//
resolveDragonCollision: function (nemo, dragons) {
    nemoCollides = true; // -- Make nemo collision true -- //
    nemoDies.play(); // -- play death scene music -- //
    music.stop(); // -- stop level music -- //
    nemo.play(Animations.Nemo.DIE); // -- play death animation -- //

    // -- remove other possible collisions -- //
    game.physics.arcade.checkCollision.down = false;
    nemo.body.collideWorldBounds = false;
    nemo.animations.currentAnim.onComplete.add(function () {
        // -- kill nemo and restart the level -- //
        nemo.kill();
        this.restartLevel();
    }, this);
},


// ------------------------------------------------------------------------------//
// ----------------- Kill Nemo if he makes contact with Bees --------------------//
// ------------------------------------------------------------------------------//
resolveBeeCollision: function (nemo, bees) {
    nemoCollides = true;     // -- Make nemo collision true -- //
    nemoDies.play();     // -- play death scene music -- //
    music.stop();     // -- stop level music -- //
    // -- play death animation -- //
    nemo.play(Animations.Nemo.DIE);
    // -- remove other possible collisions -- //
    game.physics.arcade.checkCollision.down = false;
    nemo.body.collideWorldBounds = false;
    nemo.animations.currentAnim.onComplete.add(function () {
        // -- kill nemo and restart the level -- //
        nemo.kill();
        this.restartLevel();
    }, this);
},

// ------------------------------------------------------------------------------//
// ---------------- Kill Nemo if he makes contact with Gorilla ------------------//
// ------------------------------------------------------------------------------//

    resolveGorillaCollision: function (gorilla, nemo) {
        nemoCollides = true;// -- Make nemo collision true -- //
        music.stop(); // -- stop level music -- //
        nemoDies.play(); // -- play death scene music -- //

        // -- stop Gorilla movement and Animation
        gorilla.body.velocity = 0;
        gorilla.play(Animations.Enemy.STILL);
        nemo.play(Animations.Nemo.DIE);// -- play death animation -- //
        
        // -- remove other possible collisions -- //
        game.physics.arcade.checkCollision.down = false;
        nemo.body.collideWorldBounds = false;
        nemo.animations.currentAnim.onComplete.add(function () {
            // -- kill nemo and restart the level -- //
            nemo.kill();
            this.restartLevel();
        }, this);
    },

// ------------------------------------------------------------------------------//
// ---------------- Kill Nemo if he makes contact with Banana -------------------//
// ------------------------------------------------------------------------------//


    bananaCollide: function  (nemo, banana) {
    nemoCollides = true; // -- Make nemo collision true -- //
    music.stop(); // -- stop music -- //
    nemoDies.play(); // -- play nemo die tune -- //
    gorilla.body.velocity.x = 0; // -- stop gorilla from chasing you -- //
    gorilla.play(Animations.Enemy.STILL); // -- make his animation still -- //
    sleepSound.stop(); // -- if the Gorilla is Ko'ed, stop the sleep sound -- //
    nemo.play(Animations.Nemo.DIE); // -- play Nemo die animation -- //

    // -- turn banana body to null to stop multiple collisions -- //
    banana.body = null;
    game.physics.arcade.checkCollision.down = false;
    nemo.body.collideWorldBounds = false;

    // -- kill nemo and restart the level -- //
    nemo.animations.currentAnim.onComplete.add(function () {
        nemo.kill();
        this.restartLevel();

    }, this);
},

// ------------------------------------------------------------------------------//
// -------------------- Goriila and Nemo's attack  Collision --------------------//
// ------------------------------------------------------------------------------//


    gorillaResolveNemoBubble: function  (boss, nemoBubbles) {
        // -- Kill Nemo translucent attack bubble -- //
        nemoBubbles.kill();
        // -- play boss gets hit sound -- //
        bossGetsHit.play();
        gorillaSleeping = true;
        sleepSound.play();
        canHitGorilla = false;
        // -- take away 1 HP for each time Gorilla is hit with cane -- //
        gorillaHP --;
        //--  play boss KO animation and stop his velocity -- //
        boss.play(Animations.Enemy.SLEEP);
        boss.body.velocity.x = 0;
        // -- drop a banana everytime the gorilla gets hit -- //
        banana = game.add.sprite(gorilla.x, gorilla.y + 9, 'banana');
        game.physics.enable(banana, Phaser.Physics.ARCADE);
        banana.body.allowGravity = false;
        banana.body.immovable = true;
        // -- add banana to a group -- //
        bananas.add(banana);

        // -- After 5 seconds make gorilla move again. -- //
        game.time.events.add(Phaser.Timer.SECOND * 5, playSleepAnimation, this);
        function playSleepAnimation () {
            boss.play(Animations.Enemy.STAND);
            gorillaSleeping = false;
            canHitGorilla = true;
            sleepSound.stop();
        }
    },


// ------------------------------------------------------------------------------//
// --------------------------  Gorilla Dies Function ----------------------------//
// ------------------------------------------------------------------------------//

    gorillaDies: function  () {
        explosionPlayed = true;   // -- Check to make sure the explosion is playing -- //
        sleepSound.stop();  // -- stop sleep sound if Gorilla is asleep -- //
        music.stop(); // -- stop game music -- //
        bossDies.play(); // -- play boss dies sound -- //
        youWinSong.play();  // -- You win song -- //
        explosion = game.add.sprite(gorilla.body.x -26, gorilla.body.y -32, 'explosion'); // -- add explosion for when Gorilla dies -- //
        gorilla.destroy(); // -- destroy gorilla behind explosion -- //
        game.physics.enable(explosion, Phaser.Physics.ARCADE); // -- Add Physics to the explosion sprite-- //
        explosion.body.allowGravity = false;  // -- remove explosion gravity -- //
        // -- Add, play, and time the explosion animation -- //
        explosion.animations.add('death', null, 14);
        explosion.animations.play('death');
        setTimeout(function() {game.world.remove(explosion);}, 1000);

        // ---Create a You win Image---//
        youWinPhoto = game.add.image(0, 70, 'winBanner');
        youWinPhoto.fixedToCamera = true;
        youWinPhoto.scale.setTo(0.57,0.57);

    },

gorillaPath: function  () {
        // -- If Nemo is below the gorilla, Gorilla doesnt move -- //
    if (nemo.position.y <= 250 && gorillaSleeping === false) {
        gorilla.play(Animations.Enemy.STAND);
        if (gorilla.position.x > nemo.position.x) { // -- if Gorilla is to the right of Nemo -- //
            if (gorilla.facing === 'right') { // -- and Gorilla is facing right -- //
                gorilla.scale.x *= -1; // -- reverse the sprite animation -- //
                gorilla.body.velocity.x = -50; // -- start gorillas horizontal movement to the left -- //
                gorilla.facing = 'left'; // -- and make Gorilla face left -- //
            }
            else {
                gorilla.body.velocity.x = -50;
            }
        }
        else {
            if (gorilla.facing === 'left') { // -- if Gorilla is to the left of Nemo -- //
                gorilla.scale.x *= -1;  // -- reverse the sprite animation -- //
                gorilla.body.velocity.x = 50; // -- start gorillas horizontal movement to the right -- //
                gorilla.facing = 'right'; // -- and make Gorilla face right -- //
            }
            else {
                gorilla.body.velocity.x = 50;
            }
        }

    }
},

//full screen when mouse is click on screen
gofull: function () {

    if (game.scale.isFullScreen)
    {
        game.scale.stopFullScreen();
    }
    else
    {
        game.scale.startFullScreen(false);
    }
},

    restartLevel: function() {
        // -- Create a fade to black transition before restarting. -- //
        game.camera.fade(0x000000, Phaser.Timer.SECOND, false);
        game.camera.onFadeComplete.addOnce(function() {

            // -- restart state. -- //
            game.state.start('main');
            // -- stop all music and possible sounds -- //
            music.stop();
            sleepSound.stop();


            // Reset variables.
            canHitGorilla = true;
            gorillaHP = 3;
            explosionPlayed = false;
            gorillaSleeping = false;
            explosionPlayed = false;
            nemoCollides = false;
        });
    }

};

// -- Add the 'mainState' and call it 'main' -- //
game.state.add('main', mainState);

// -- Start the state to actually start the game -- //
game.state.start('main');





