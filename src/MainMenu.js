State.MainMenu = function(game) {};

State.MainMenu.prototype = {

  create: function() {
    var title, start, credits, help;

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
    this.options = [start, help, credits]; // menu options

    if (this.game.device.desktop && config.NotForceMobile) {
      this.keyUp = this.input.keyboard.addKey(Phaser.Keyboard.UP);
      this.keyUp.onDown.add(this.processKey, this);

      this.keyDown = this.input.keyboard.addKey(Phaser.Keyboard.DOWN);
      this.keyDown.onDown.add(this.processKey, this);

      this.keyEnter = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
      this.keyEnter.onDown.add(this.changeState, this);
    } else {
      var i = 0;
      for (; i < this.options.length; i++) {
        this.options[i].__optionIndex = i;
        this.options[i].inputEnabled = true;
        this.options[i].events.onInputDown.add(this.processTouch, this);
      }
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
    this.options[this.currentOption].setStyle(this._styleNormal);

    if (this.keyUp.isDown) {
      this.currentOption--;
    } else if (this.keyDown.isDown) {
      this.currentOption++;
    }

    this.currentOption = Phaser.Math.clamp(this.currentOption, 0, 2);

    this.options[this.currentOption].setStyle(this._styleSelected);
  },

  processTouch: function(object, pointer) {
    this.currentOption = object.__optionIndex;
    this.changeState();
  },

  changeState: function() {
    this.input.keyboard.removeKey(Phaser.Keyboard.UP);
    this.input.keyboard.removeKey(Phaser.Keyboard.DOWN);
    this.input.keyboard.removeKey(Phaser.Keyboard.ENTER);

    switch (this.currentOption) {
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
