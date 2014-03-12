
State.Game = function (game) {

};

State.Game.prototype = {

  create: function () {
    gameObject['ground'] = this.add.tileSprite(0, 0, config.width, config.height, 'tile');

    gameObject['balls-group'] = this.add.group();
    gameObject['crystals-group'] = this.add.group();

    gameObject['score'] = this.add.text(this.world.centerX, 0, "000000", {
      font: "36px Arial",
      fill: "#ffffff"
    });

    gameObject['score'].fixedToCamera = true;

    this.timers = {};

    this.timers['ball-spawn'] = this.time.events.loop(Phaser.Timer.SECOND * 1.5, this.createBall, this);
    this.timers['crystal-spawn'] = this.time.events.loop(Phaser.Timer.SECOND * 5, this.createCrystal, this);
    this.timers['velocity'] = this.time.events.loop(Phaser.Timer.SECOND * 20, this.increaseVelocity, this);

    this.createLink();

    globalScore = 0;
  },

  quitGame: function() {
    this.time.events.remove(this.timers['ball-spawn']);
    this.time.events.remove(this.timers['crystal-spawn']);
    this.time.events.remove(this.timers['velocity']);

    this.input.keyboard.removeKey(Phaser.Keyboard.RIGHT);
    this.input.keyboard.removeKey(Phaser.Keyboard.LEFT);

    this.game.state.start('GameOver', true, false);
  },

  _objectVelocity: 300,
  _tileVelocity: 5,

  increaseVelocity: function() {
    this._objectVelocity += 20;
    this._tileVelocity += 0.02;
  },

  update: function () {
    var ground = gameObject['ground'];
    var link = gameObject['link'];
    var balls = gameObject['balls-group'];
    var crystals = gameObject['crystals-group'];

    ground.tilePosition.y += this._tileVelocity;

    this.physics.collide(link, balls, this.onBallCollision, null, this);
    this.physics.collide(link, crystals, this.onCrystalCollision, null, this);
  },

  onBallCollision: function(link, ball) {
    this.quitGame();
  },

  onCrystalCollision: function(link, crystal) {
    var tween;
    crystal.kill();
    if (crystal.frame === 1) {
      this.updateScore(100);
    } else {
      this.updateScore(5);
    }
  },

  linkIsMoving: false,

  createLink: function() {
    var link = gameObject['link'] = this.add.sprite(0, config.height - 20, 'link');
    var keyRight, keyLeft;

    link.anchor.y = 1;

    link.animations.add('walk');
    link.animations.play('walk', 8, true);
    link.body.immovable = true;

    keyRight = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    keyRight.onDown.add(this.moveToRight, this);

    keyLeft = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    keyLeft.onDown.add(this.moveToLeft, this);

    this.enableMoviment();
  },

  moveToRight: function() {
    var link = gameObject['link'],
      tween;

    if (!this.linkIsMoving && link.x + 64 < config.width) {
      this.linkIsMoving = true;

      tween = this.add.tween(link)
        .to({ x: '+64'}, 300, Phaser.Easing.Linear.None)
        .start();

      tween.onComplete.add(this.enableMoviment, this);
    }
  },

  moveToLeft: function() {
    var link = gameObject['link'],
      tween;

    if (!this.linkIsMoving && link.x - 64 >= 0) {
      this.linkIsMoving = true;

      tween = this.add.tween(link)
        .to({ x: '-64'}, 300, Phaser.Easing.Linear.None)
        .start();

      tween.onComplete.add(this.enableMoviment, this);
    }
  },

  enableMoviment: function() {
    this.linkIsMoving = false;
  },

  lastBallColumn: -1,
  lastBallIsBig: false,

  createBall: function() {
    var balls = gameObject['balls-group'];
    var column;
    var ball;
    var isBig = this.rnd.realInRange(0, 1)

    do {
      column = this.rnd.integerInRange(0, 3);
    } while (column === this.lastCrystalColumn);

    this.lastBallColumn = column;

    if (isBig >= 0.60) {
      if (column === 3) column = 2;
      ball = balls.create(64 * column, -128, 'ball-big');
      ball.body.setRectangle(104, 104, 12, 12);
      this.lastBallIsBig = true;
    } else {
      ball = balls.create(64 * column, -64, 'ball');
      ball.body.setRectangle(52, 52, 6, 6);
      this.lastBallIsBig = false;
    }

    ball.events.onOutOfBounds.add(this.onBallOutOfBounds, this);
    ball.outOfBoundsKill = true;

    ball.animations.add('roll');
    ball.animations.play('roll', 6, true);

    ball.body.velocity.y = this._objectVelocity;
  },

  onBallOutOfBounds: function(ball) {
    if (ball.key === 'ball-big') {
      this.updateScore(10);
    } else {
      this.updateScore(1);
    }
  },

  lastCrystalColumn: -1,

  createCrystal: function() {
    var crystals = gameObject['crystals-group'];
    var column;
    var crystal;
    var isRed = this.rnd.realInRange(0, 1);

    do {
      column = this.rnd.integerInRange(0, 3);
    } while (
      (this.lastBallIsBig &&
        (column === this.lastBallColumn || column === this.lastBallColumn + 1))
      ||column === this.lastBallColumn
    );

    this.lastCrystalColumn = column;

    crystal = crystals.create(64 * column, -64, 'crystal');

    if (isRed > 0.80) {
      crystal.frame = 1;
    }

    crystal.outOfBoundsKill = true;

    // setup collision of the crystals
    crystal.body.setRectangle(60, 60, 2, 2);
    crystal.body.velocity.y = this._objectVelocity + 100;
  },

  updateScore: function(value) {
    globalScore += value;
    gameObject['score'].content = Phaser.Utils.pad(globalScore + "", 6, "0", 1);
  }

};
