State.Help = function(game) {};

State.Help.prototype = {

  create: function() {
    var text =
      "Avoid of balls and\n" +
      "collect crystals.\n\n" +
      "Controls:\n" +
      "LEFT and RIGHT arrows";

    this.add.text(this.world.centerX, 50, text, {
      font: "20px Arial bold",
      fill: "#888888",
      align: "center"
    }).anchor.x = 0.5;

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
