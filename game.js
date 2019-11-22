var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'theGame', {
  preload: preload,
  create: create,
  update: update,
});

var player;
var ground;

var MAX_HEALTH = 3;
var health = MAX_HEALTH;
var healthIcons = [];
var healthPickup;

function preload() {

  game.load.image('background', 'assets/background.png');
  game.load.image('ground', 'assets/ground.png');
  game.load.spritesheet('playerWalking', 'assets/PlayerWalking.png', 64, 128);
  game.load.spritesheet('playerFighting', 'assets/playerFighting.png', 64, 128);
  game.load.spritesheet('TeacherWalking', 'assets/TeacherWalking.png', 64, 128);
  game.load.spritesheet('TeacherThrowing', 'assets/TeacherThrowing.png', 64, 128);
  game.load.image('Paper', 'assets/Paper.png');
  game.load.image('health', 'assets/Health.png');
}

function create() {
  //we're going to be using physics, so enable the Arcade Physics system
  game.physics.startSystem(Phaser.Physics.ARCADE);
  // a simple background for the game
  game.add.sprite(0, 0, 'background');
  ground = game.add.sprite(600, 0, 'ground');
  ground.body.immovable = true;

  player = game.add.sprite(64, game.world.height - 150, 'player');
  game.physics.arcade.enbale(player);
  player.body.bounce.y - 0.2;
  player.body.gravity.y - 300;
  player.body.collideWorldBounds = true;

  player.animations.add('left', [0, 1], 10, true);
  player.animations.add('right', [3, 4], 10, true);

  healthPickup = game.add.sprite(700, 500, 'health');
  game.physics.arcade.enable(healthPickup);
  healthPickup.alpha = 0;
  healthPickup.tween = game.add.tween(healthPickup).to({
    alpha: 1
  }, 1500, Phaser.Easing.Sinusoidal.InOut, true, 0, 1500, true);
  game.time.events.loop(15000, showHealthPickup, this);

  health = MAX_HEALTH;
  for (var i = 0; i < MAX_HEALTH; i++) {
    healthIcons[i] = game.add.sprite(game.world.width - 48 * (i + 1), 16, 'health');
  }

  cursors = game.input.keyboard.createCursorKeys();
}

function update() {
  var hitGround = game.physics.arcade.collide(player, ground);

  player.body.velocity.x = 0;

  if (cursors.left.isDown) {
    //Move to the left
    player.body.velocity.x = -150;
    player.animations.play('left');
  } else if (cursors.right.isDown) {
    //move to the right
    player.body.velocity.x = 150;
    player.animations.play('right');
  } else {
    {
      //stand still
      player.animations.stop();
      player.frame = 4;
    }
    //allow the player to jump if they are touching the background
    if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
      player.body.velocity.y = -350;

    }
  }

  game.physics.arcade.overlap(player, healthPickup, collectHealth, null, this);
}
