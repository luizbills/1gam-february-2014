State.Boot = function(game) {};

State.Boot.prototype = {

  create: function() {
    this.input.maxPointers = 1;
    this.stage.disableVisibilityChange = false;

    // debug only
    if (this.game.net.getHostName() === 'localhost') { // debug
      var viewportStyle = document.querySelector('#' + config.id).style;
      this.game.canvas.style.border = '1px solid white';
      console.log('DEBUG MODE');
    }

    this.game.stage.smoothed = true;

    if (this.game.device.desktop) {
      this.scale.maxWidth = config.width;
      this.scale.maxHeight = config.height;

      // configuration to itch.io
      if (document.URL.indexOf('itchio') !== -1) {
        document.body.style.margin = "0";
        document.body.style.width = config.width + 'px';
        document.body.style.height = config.height + 'px';
      } else {
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
      }

      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    } else {
      // mobile
      this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT
      this.scale.forceOrientation(false, true);
    }

    this.scale.setScreenSize(true);

    this.state.start('Preloader');
  }
};
