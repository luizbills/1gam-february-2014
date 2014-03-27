window.addEventListener('load', function() {

  var game = new Phaser.Game(config.width, config.height, Phaser.AUTO, config.id);

  game.state.add('Boot', State.Boot);
  game.state.add('Preloader', State.Preloader);
  game.state.add('MainMenu', State.MainMenu);
  game.state.add('Game', State.Game);
  game.state.add('GameOver', State.GameOver);
  game.state.add('Help', State.Help);
  game.state.add('Credits', State.Credits);

  // Now start the Boot state.
  game.state.start('Boot');

}, false);
