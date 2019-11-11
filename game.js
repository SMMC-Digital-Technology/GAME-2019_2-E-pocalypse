var game = new Phaser.Game(800, 600, Phaser.AUTO, 'theGame', {
  preload: preload,
  create: create,
  update: update
});
var background;
var player;
var evilteacher

function preload() {

  game.load.image('background', 'assets/background.png');
  game.load.image('ground', 'assets/ground.png');
  game.load.spritesheet('EvilTeacher', 'assets/EvilTeacher.png');
  game.load.spritesheet('player', 'assets/player.png', 32, 48);
}

function create() {

  game.add.image('assets/background.png');
  game.add.image('assets/ground.png');
  game.add.spritesheet('assets/EvilTeacher.png');
  game.add.spritesheet('assets/player.png');

  //this is text for the game, not sure if this will work or not
  title = game.add.text(game.world.centerX, game.world.centerY - 100, 'E-pocalypse', {
    font: '50px Arial',
    fill: '#00ff00'
  });
  title.anchor.setTo(0.5, 0.5);

  //we're going to be using physics, so enable the Arcade Physics system
  game.physics.startSystem(Phaser.Physics.ARCADE);
  // a simple background for the game
  game.add.sprite(0, 0, 'background');
  //the platforms group contains the ground and the 2 ledges we can jump on
  platforms = game.add.group();
  //we will enable physics for any object that is created in this group
  platforms.enableBody = true;
  //here we create the ground
  var ground = platforms.create(0, game.world.height - 64, 'ground');
  //scale it to fit the width of the game
  ground.scale.setTo(2, 2);
  //this stops it from falling away when you jump on it
  ground.body.immovable = true;

  var player;
  //the player and it's settings
  player = game.add.sprite(32, game.world.height - 150);
  //we need to enable physics on the player
  game.physics.arcade.enable(player);
  //player physics properites. Give the little guy a slight bounce
  player.body.collideWorldBounds = true;
  //our two animations, walking left and right.
  player.animations.add('left', [, , ], 10, true);
  player.animations.add('right', [, , ], 10, true);

  //Phaser built in Keyboard manager
  cursors = game.input.keyboard.createCursorKeys();

  //begin game button
  button = game.add.button(game.world.centerX, game.world.centerY, 'button');
  button.anchor.setTo(0.5, 0.5);
  button.onInputUp.add(myFunction);
  var text = game.add.text(button.z, button.y, 'Beginning');
  text.anchor.setTo(0.5, 0.5);

// for when people attack the thing they're attacking with will launch like a bullet
  weapon.bulletKillType = Phaser.weapon.KILL_WORLD_BOUNDS;
  weapon.bulletKillType = Phaser.Weapon.KILL_DISTANCE;
  weapon.bulletSpeed = 200;
  weapon.fireRate = 500;
}

function update() {
  //reset the players velocity (movement)
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

  function removeHealth(player, slime) {
    health -= 1;
    healthIcons[health] alpha = 0;
    player.body.velocity.x = -player.body.velocity.x;
    player.body.velocity.y = -150;
    if (health == 0) {
      game.state.restart();
    }
  }

  function collectHealth(player, healthPickup) {
    if (healthPickup.alpha > 0.8) {
      healthPickup.tween.pause();
      healthPickup.alpha = 0;
      healthIcons[health].alpha = 1;
      health += 1;
    }
  }

  function showHealthPickup() {
    if (healthPickup.tween.isPaused) {
      healthPickup.tween.start();
    }
  }

  function myFunction() {
if
  }
}
