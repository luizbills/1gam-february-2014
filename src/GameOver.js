State.GameOver = function(game) {};

State.GameOver.prototype = {

  create: function() {
    var msg = "GAME OVER\nscore:\n" + globalScore;

    var t1 = this.add.text(this.world.centerX, this.world.centerY - 75, msg, {
      font: "36px Arial",
      fill: "#ffffff",
      align: "center"
    });

    t1.anchor.x = 0.5;

    msg = "ENTER to restart";

    var t2 = this.add.text(this.world.centerX, t1.y + t1._height + 50, msg, {
      font: "20px Arial",
      fill: "#ffffff",
      align: "center"
    });

    t2.anchor.x = 0.5;

    this.add.tween(t2.scale)
      .to({
        x: '+0.2',
        y: '+0.2'
      }, 500, Phaser.Easing.Linear.None)
      .to({
        x: '-0.2',
        y: '-0.2'
      }, 500, Phaser.Easing.Linear.None)
      .loop()
      .start();

    this.keyEnter = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    this.keyEnter.onDown.add(this.returnToMenu, this);
  },

  returnToMenu: function() {
    this.input.keyboard.removeKey(Phaser.Keyboard.ENTER);
    this.game.state.start('MainMenu');
  }
};
