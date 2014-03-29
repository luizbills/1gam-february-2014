State.Help = function(game) {};

State.Help.prototype = {

  create: function() {
    var text = "Avoid balls and\ncollect crystals.\n\n";

    if (this.game.device.desktop && config.NotForceMobile) {
      text += "Controls:\nLEFT and RIGHT arrows";
    }

    this.add.text(this.world.centerX, 50, text, {
      font: "20px Arial bold",
      fill: "#888888",
      align: "center"
    }).anchor.x = 0.5;

    text = (this.game.device.desktop && config.NotForceMobile ? "ENTER" : "TOUCH") + " to return";

    this.add.text(this.world.centerX, config.height - 50, text, {
      font: "15px Arial",
      fill: "#888888",
      align: "center"
    }).anchor.x = 0.5;

    if (this.game.device.desktop && config.NotForceMobile) {
      this.keyEnter = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
      this.keyEnter.onDown.add(this.returnToMenu, this);
    } else {
      this.game.input.onTap.add(this.returnToMenu, this);
    }
  },

  returnToMenu: function() {
    this.input.keyboard.removeKey(Phaser.Keyboard.ENTER);
    this.game.state.start('MainMenu');
  }

};
