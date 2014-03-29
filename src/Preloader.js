State.Preloader = function(game) {};

State.Preloader.prototype = {

  preload: function() {
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
    this.load.spritesheet('control', 'images/mobile-control.png', 80, 80);
  },

  create: function() {
    this.game.state.start('MainMenu');
  }

};
