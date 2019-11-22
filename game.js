var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'theGame', {
  preload: preload,
  create: create,
  update: update,
});

var player;

function preload() {

  game.load.image('background', 'assets/background.png');
  game.load.image('ground', 'assets/ground.png');
  game.load.spritesheet('playerWalking', 'assets/PlayerWalking.png', 320, 128);
  game.load.spritesheet('playerFighting', 'assets/playerFighting.png', 576, 128);
  game.load.spritesheet('TeacherWalking', 'assets/TeacherWalking.png', 320, 128);
  game.load.spritesheet('TeacherThrowing', 'assets/TeacherThrowing.png', 512, 128);
  game.load.image('Paper', 'assets/Paper.png');
}

function create() {
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

  //Phaser built in Keyboard manager
  cursors = game.input.keyboard.createCursorKeys();
}

function update() {

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
    }
    //allow the player to jump if they are touching the background
    if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
      player.body.velocity.y = -350;

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


}
