var BootState = {


    init: function() {

        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;

    },
    preload: function() {
    game.load.image('preloadbar', 'assets/bar.png');
    game.load.image('logo', 'assets/LittleNemoLogo.png');
    },
    create: function() {
        game.stage.backgroundColor = '#000';

        game.state.start('PreloadState')
    }

};
