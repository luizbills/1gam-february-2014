
State.MainMenu = function (game) {

	this.music = null;

};

State.MainMenu.prototype = {

	create: function () {
		var title, start, credits, help;

		// start music
		if (!this.music) {
			this.music = this.add.audio('gameMusic', 1, true);
			this.music.play();
		}

		title = this.add.text(this.world.centerX, 120,
			"Run Link!", {
      font: "50px Arial bold",
      fill: "#60BF49",
      align: "center"
    });
    title.anchor.x = 0.5;

    start = this.add.text(this.world.centerX, this.world.centerY, "start game", this._styleSelected);
    start.anchor.x = 0.5;

    help = this.add.text(this.world.centerX, start.y + 40, "how to play", this._styleNormal);
    help.anchor.x = 0.5;

    credits = this.add.text(this.world.centerX, help.y + 40, "credits", this._styleNormal);
    credits.anchor.x = 0.5;

    this.currentOption = 0;

    if (this.game.device.desktop) {
      this.options = [start, help, credits];

      this.keyUp = this.input.keyboard.addKey(Phaser.Keyboard.UP);
      this.keyDown = this.input.keyboard.addKey(Phaser.Keyboard.DOWN);
      this.keyEnter = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);

      this.keyUp.onDown.add(this.processKey, this);
      this.keyDown.onDown.add(this.processKey, this);
      this.keyEnter.onDown.add(this.changeState, this);
    }
	},

  _styleNormal: {
    font: "20px Arial",
    fill: "#ffffff",
    align: "center"
  },

  _styleSelected: {
    font: "20px Arial",
    fill: "#E0D314",
    align: "center"
  },

  processKey: function() {
    this.options[this.currentOption].font = this._styleNormal;

    if (this.keyUp.isDown) {
      this.currentOption--;
    } else if (this.keyDown.isDown) {
      this.currentOption++;
    }

    this.currentOption = Phaser.Math.clamp(this.currentOption, 0, 2);

    this.options[this.currentOption].font = this._styleSelected;
  },

  processTouch: function() {
    // TODO: implement mobile input
  },

	changeState: function (pointer) {
    this.input.keyboard.removeKey(Phaser.Keyboard.UP);
    this.input.keyboard.removeKey(Phaser.Keyboard.DOWN);
    this.input.keyboard.removeKey(Phaser.Keyboard.ENTER);

    switch(this.currentOption) {
      case 0:
        this.game.state.start('Game');
        break;
      case 1:
        this.game.state.start('Help');
        break;
      case 2:
        this.game.state.start('Credits');
        break;
      default:
        this.game.state.start('Game');
    }
	}

};
