State.Boot = function (game) {
};

State.Boot.prototype = {

    preload: function () {

        //Here we load the assets required for our preloader (in this case a background and a loading bar)
        //this.load.image('preloaderBackground', 'images/preloader_background.jpg');
        //this.load.image('preloaderBar', 'images/preloadr_bar.png');

    },

    create: function () {
        this.game.input.maxPointers = 1;
        this.game.stage.disableVisibilityChange = false;

        this.game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;

        this.game.stage.scale.minWidth = config.width;
        this.game.stage.scale.minHeight = config.height;
        this.game.stage.scale.maxWidth = config.width;
        this.game.stage.scale.maxHeight = config.height;

        this.game.stage.scale.pageAlignHorizontally = true;
        this.game.stage.scale.pageAlignVertically = true;
        this.game.stage.scale.setScreenSize(true);
        this.game.stage.scale.hasResized.add(this.gameResized, this);

        if (!this.game.device.desktop) {
            this.game.stage.scale.forceOrientation(false, true);
            this.game.stage.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.game.stage.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
        }

        this.game.state.start('Preloader');
    },

    gameResized: function (width, height) {
        // This could be handy if you need to do any extra processing if the game resizes.
        // A resize could happen if for example swapping orientation on a device.
    },

    enterIncorrectOrientation: function () {

    },

    leaveIncorrectOrientation: function () {

    }

};
