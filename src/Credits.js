
State.Credits = function (game) {
};

State.Credits.prototype = {

  create: function () {
    var text =
      "Coder & Design\n" +
      "  Luiz P. \"Bills\" Brandao\n\n" +
      "Music by\n" +
      "  \"FoxSynergy\"\n\n" +
      "Art by\n" +
      "  The Legend of Zelda ALttP\n\n" +
      "Special Thanks to\n" +
      "  Carlos \"Dudu\"";

    this.add.text(20, 50, text, {
      font: "20px Arial bold",
      fill: "#888888",
      align: "left"
    });

    this.add.text(this.world.centerX, config.height - 50, "press ENTER to return", {
      font: "15px Arial",
      fill: "#888888",
      align: "center"
    }).anchor.x = 0.5;

    this.keyEnter = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    this.keyEnter.onDown.add(this.returnToMenu, this);
  },

  returnToMenu: function() {
    this.input.keyboard.removeKey(Phaser.Keyboard.ENTER);
    this.game.state.start('MainMenu');
  }

};
