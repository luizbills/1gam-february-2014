State.Preloader = function (game) {

	//this.background = null;
	//this.preloadBar = null;

};

State.Preloader.prototype = {

	preload: function () {

		var t = this.add.text(this.world.centerX, this.world.centerY, "LOADING", {
	      font: "18px Arial",
	      fill: "#ffffff",
	      align: "center"
	    });

	    t.anchor.setTo(0.5, 0.5);

		this.load.image('tile', 'images/tile.png');
		this.load.spritesheet('ball', 'images/balls.png', 64, 64);
		this.load.spritesheet('ball-big', 'images/balls-big.png', 128, 128);
		this.load.spritesheet('link', 'images/link.png', 64, 96);
		this.load.spritesheet('crystal', 'images/crystals.png', 64, 64);
		this.load.audio('gameMusic', 'audio/LastManStandingv1__byFoxSynergy.mp3');
	},

	create: function () {
		//this.game.state.start('MainMenu');
	},

	update: function () {
		if (this.cache.isSoundDecoded('gameMusic')) {
			this.game.state.start('MainMenu');
		}
	}

};
