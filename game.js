var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'theGame', {
  preload: preload,
  create: create,
  update: update
});
var boss;
var slime;
var stacked slime;
var skeleton
var player;
var up;
var down;
var left;
var right;


function preload() {
  game.load.image('/.png');
  game.load.image('/.png');
  game.load.image('/.png');
  game.load.image('/.png');

}

function create() {
  game.add.image('/.png');
  game.add.sprite('/.png');
  game.add.spritesheet('/.png');
  game.add.spritesheet('/.png');

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

  var player();
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
    if (cursors.up.isDown && player.body.touching.down && hitPlatform)
  }
}
