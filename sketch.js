var backImage, backgr;
var player, player_running;
var ground, ground_img;
var END = 0;
var PLAY = 1;
var gameState = PLAY;

function preload() {
  backImage = loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  bananaImg = loadImage("banana.png");
  stoneImg = loadImage("stone.png")
  gameOverImg = loadImage("gameOver.png")
}

function setup() {
  createCanvas(800, 400);

  backgr = createSprite(0, 0, 800, 400);
  backgr.addImage(backImage);
  backgr.scale = 1.5;
  backgr.x = backgr.width / 2;
  backgr.velocityX = -4;

  player = createSprite(100, 340, 20, 50);
  player.addAnimation("Running", player_running);
  player.scale = 0.1;

  ground = createSprite(400, 350, 800, 10);
  ground.x = ground.width / 2;
  ground.visible = false;

  bananaGroup = new Group()
  obstacleGroup = new Group()

  gameOver = createSprite(400,100,100,50)
  gameOver.addImage(gameOverImg)
  gameOver.visible = false;
}

function draw() {
  background(0);
  if (gameState === PLAY) {
    if (backgr.x < 100) {
      backgr.x = backgr.width / 2;
    }
    if (keyDown("space")) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
    player.collide(ground);

    spawnFood();
    spawnObstacle();

    if (bananaGroup.isTouching(player)) {
      bananaGroup[0].destroy()
    }
    
    if (obstacleGroup.isTouching(player)) {
      gameOver.visible = true;
      obstacleGroup.setVelocityXEach(0)
      bananaGroup.setVelocityXEach(0)
      player.visible = false
    }
  }
  drawSprites();
}
function spawnFood() {
  if (frameCount % 100 === 0) {
    var banana = createSprite(900, 165, 10, 40);
    banana.addImage(bananaImg)
    banana.velocityX = -6;
    banana.lifetime = 300;
    banana.scale = 0.05;
    bananaGroup.add(banana);
  }
}

function spawnObstacle() {
  if (frameCount % 60 === 0) {
    var stone = createSprite(950, 300, 10, 40);
    stone.addImage(stoneImg)
    stone.velocityX = -6;
    stone.lifetime = 300;
    stone.scale = 0.09;
    obstacleGroup.add(stone)
  }
}