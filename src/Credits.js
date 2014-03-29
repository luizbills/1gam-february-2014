State.Credits = function(game) {};

State.Credits.prototype = {

  create: function() {
    var text =
      "Coder & Design\n" +
      "  Luiz P. \"Bills\"\n\n" +
      "Art\n" +
      "  User Interface by Kenney\n" +
      "  Sprites of The Legend of Zelda\n\n" +
      "Testers\n" +
      "  Carlos Eduardo \"Dudu\" Papa\n" +
      "  Marlon Renan M. da Costa";

    this.add.text(20, 50, text, {
      font: "16px Arial bold",
      fill: "#888888",
      align: "left"
    });

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
