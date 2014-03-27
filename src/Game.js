State.Game = function(game) {};

State.Game.prototype = {

  create: function() {
    gameObject['ground'] = this.add.tileSprite(0, 0, config.width, config.height, 'tile');

    gameObject['big-balls-group'] = this.add.group();
    gameObject['small-balls-group'] = this.add.group();
    gameObject['crystals-group'] = this.add.group();

    gameObject['score'] = this.add.text(this.world.centerX, 0, "000000", {
      font: "36px Arial",
      fill: "#ffffff"
    });

    this.physics.startSystem(Phaser.Physics.ARCADE);

    gameObject['score'].fixedToCamera = true;

    this.timers = {};

    this.timers['ball-spawn'] = this.time.events.loop(Phaser.Timer.SECOND * 1.5, this.createBall, this);
    this.timers['crystal-spawn'] = this.time.events.loop(Phaser.Timer.SECOND * 5, this.createCrystal, this);
    this.timers['velocity'] = this.time.events.loop(Phaser.Timer.SECOND * 10, this.increaseVelocity, this);

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

  _objectVelocity: 350,
  _tileVelocity: 5,

  increaseVelocity: function() {
    this._objectVelocity += 50;
    this._tileVelocity += 0.5;
  },

  update: function() {
    var ground = gameObject['ground'];
    var link = gameObject['link'];
    var bigBalls = gameObject['big-balls-group'];
    var smallBalls = gameObject['small-balls-group'];
    var crystals = gameObject['crystals-group'];

    ground.tilePosition.y += this._tileVelocity;

    this.physics.arcade.collide(link, bigBalls, this.onBallCollision, null, this);
    this.physics.arcade.collide(link, smallBalls, this.onBallCollision, null, this);
    this.physics.arcade.collide(link, crystals, this.onCrystalCollision, null, this);
  },

  onBallCollision: function(link, ball) {
    this.quitGame();
  },

  onCrystalCollision: function(link, crystal) {
    crystal.kill();
    if (crystal.isRed) {
      this.updateScore(50);
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

    this.physics.arcade.enable(link);

    link.body.moves = false;
    link.body.immovable = true;

    keyRight = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    keyRight.onDown.add(this.moveToRight, this);

    keyLeft = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    keyLeft.onDown.add(this.moveToLeft, this);

    this.linkIsMoving = false;
  },

  moveToRight: function() {
    var link = gameObject['link'],
      tween;

    if (!this.linkIsMoving && link.x + 64 !== config.width) {
      this.linkIsMoving = true;

      var tween = this.add.tween(link);

      tween.to({
        x: '+64'
      }, 300, Phaser.Easing.Linear.None, true);

      tween.onComplete.add(this.enableMoviment, this);
    }
  },

  moveToLeft: function() {
    var link = gameObject['link'],
      tween;

    if (!this.linkIsMoving && link.x - 64 >= 0) {
      this.linkIsMoving = true;

      var tween = this.add.tween(link);

      tween.to({
        x: '-64'
      }, 300, Phaser.Easing.Linear.None);

      tween.onComplete.add(this.enableMoviment, this);
      tween.start();
    }
  },

  enableMoviment: function() {
    this.linkIsMoving = false;
  },

  lastBallColumn: -1,
  lastBallIsBig: false,

  createBall: function() {
    var column;
    var isBig = this.rnd.realInRange(0, 1) > 0.7;
    var ball;

    do {
      column = this.rnd.integerInRange(0, 3);
    } while (column === this.lastCrystalColumn);

    this.lastBallColumn = column;

    if (isBig) {
      if (column === 3) {
        column = 2;
      }
      ball = this._createBigBall(column);
      this.lastBallIsBig = true;
    } else {
      ball = this._createSmallBall(column);
      this.lastBallIsBig = false;
    }

    ball.body.velocity.y = this._objectVelocity;
  },

  _createSmallBall: function(column) {
    var balls = gameObject['small-balls-group'];
    var ball = balls.getFirstExists(false);

    if (ball) {
      ball.reset(64 * column, -64);
    } else {
      ball = balls.create(64 * column, -64, 'ball');
      this.physics.arcade.enable(ball);
      this.lastBallIsBig = false;
      ball.checkWorldBounds = true;
      ball.outOfBoundsKill = true;
      ball.events.onOutOfBounds.add(this.onBallOutOfBounds, this);
      ball.animations.add('roll');
    }

    ball.animations.play('roll', 6, true);
    ball.body.setSize(52, 52, 6, 6);

    return ball;
  },

  _createBigBall: function(column) {
    var balls = gameObject['big-balls-group'];
    var ball = balls.getFirstExists(false);

    if (ball) {
      ball.reset(64 * column, -128);
    } else {
      ball = balls.create(64 * column, -128, 'ball-big');
      this.physics.arcade.enable(ball);
      this.lastBallIsBig = false;
      ball.checkWorldBounds = true;
      ball.outOfBoundsKill = true;
      ball.events.onOutOfBounds.add(this.onBallOutOfBounds, this);
      ball.animations.add('roll');
    }

    ball.animations.play('roll', 6, true);
    ball.body.setSize(104, 104, 12, 12);

    return ball;
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
    var rnd = this.rnd.realInRange(0, 1);

    do {
      column = this.rnd.integerInRange(0, 3);
    } while ((this.lastBallIsBig && (column === this.lastBallColumn || column === this.lastBallColumn + 1)) || column === this.lastBallColumn);

    this.lastCrystalColumn = column;

    crystal = crystals.getFirstExists(false);

    if (crystal) {
      crystal.reset(64 * column, -64);
    } else {
      crystal = crystals.create(64 * column, -64, 'crystal');
      crystal.checkWorldBounds = true;
      crystal.outOfBoundsKill = true;
      this.physics.arcade.enable(crystal);
    }

    crystal.body.setSize(60, 60, 2, 2);
    crystal.body.velocity.y = this._objectVelocity + 100;

    crystal.isRed = (rnd > 0.8 ? true : false);
    crystal.frame = (crystal.isRed ? 1 : 0);
  },

  updateScore: function(value) {
    globalScore += value;
    gameObject['score'].text = Phaser.Utils.pad(globalScore + "", 6, "0", 1);
  }

};
