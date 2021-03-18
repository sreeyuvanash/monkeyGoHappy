var backImage,backgr;
var player, player_running;
var ground,ground_img;
var myFont,font;
var bananaImage,stoneImage1,stoneImage2;

var FoodGroup,stoneGroup,stoneGroup2;

var END =0;
var PLAY =1;

var score=0
var survivalTime=0;
var size = 5
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png")
  stoneImage1 = loadImage("stone.png")
  stoneImage2 = loadImage("rock20.png")
  myFont = loadFont('pdark.ttf');
  font = loadFont('ARCADECLASSIC.TTF')
}

function setup() {
  createCanvas(800,500);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
 
  stoneGroup = createGroup();
  stoneGroup2 = createGroup();
  FoodGroup = createGroup();
  
}

function draw() { 
  background(0);



  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }

    if (keyDown("UP_ARROW")&&player.y >= 250){
      player.y = player.y-5
    }

    if (keyDown("DOWN_ARROW")&&player.y <= 440){
      player.y = player.y+5
    }
    if(frameCount % 32 === 0){
      //survivalTime = second()
      survivalTime = survivalTime+1;
  
    }
  
    if (player.isTouching(FoodGroup)){
      FoodGroup.destroyEach()
      score++
      player.scale=player.scale + 0.01
      size++
    }
    if(player.isTouching(stoneGroup)){
      player.scale=player.scale - 0.01
      stoneGroup.destroyEach()
      size--;
    }
    if(player.isTouching(stoneGroup2)){
      player.scale=player.scale - 0.01
      stoneGroup2.destroyEach()
      size--;
    }    
    if(size === 0){
      gameState = END
    }
  }else if(gameState === END){
    backgr.visible = false;
    player.visible = false;
    stoneGroup2.destroyEach()
    stoneGroup.destroyEach()
    FoodGroup.destroyEach()
    textSize(50)
    textFont(myFont)
    text("YOU LOOSE",250,300)

    textFont(myFont)

    stroke("white")
    fill("white")
    strokeWeight(0);
    textSize(20)
    text("sec "+survivalTime,300,200)
  
    strokeWeight(0);
    textSize(20)
    text("score  "+score,450,200)
  }


  spamBlock();  
  drawSprites();
  spambanana();
  spamBlock2();

  textFont(font)

  stroke("white")
  fill("black")
  strokeWeight(0);
  textSize(20)
  text("sec "+survivalTime,700,30)

  strokeWeight(0);
  textSize(20)
  text("score  "+score,550,30)

  strokeWeight(0);
  textSize(20)
  text("size  "+size,450,30)

  textFont(myFont)
  text("up and down arrow to move",200,480)

}

function spambanana() {

  if (frameCount % 150 === 0) {

    var banana = createSprite(850, 200, 30, 30);


    banana.y = random(250, 480);
    banana.addImage("bananaImage", bananaImage);
    banana.scale = 0.03;
    banana.velocityX = -5;

    //banana.debug=true;
  FoodGroup.add(banana);
  console.log("hi")
  }
  }

function spamBlock() {

    if (frameCount %150 === 0) {
  
      var block = createSprite(850, 375, 50, 50);
      block.y = random(250, 480);
      block.velocityX = -5;
      block.scale = random(0.2,0.3);
      block.lifeTime = 100;
      // block.debug=true;
      block.setCollider("circle", 0, 0.5);
      stoneGroup.add(block);

      var rand = Math.round(random(1,2));
      switch(rand) {
        case 1: block.addImage(stoneImage1);
                break;
        case 2: block.addImage(stoneImage1);
                break;
       
     
      }
  
    }
  }

  function spamBlock2() {

    if (frameCount %150 === 0) {
  
      var block = createSprite(1350, 375, 50, 50);
      block.y = random(250, 480);
      block.velocityX = -5;
      block.scale = random(0.01,0.007);
      block.lifeTime = 100;
      // block.debug=true;
      block.setCollider("circle", 0, 0.5);
      stoneGroup2.add(block);

      var rand = Math.round(random(1,2));
      switch(rand) {
        case 1: block.addImage(stoneImage2);
                break;
        case 2: block.addImage(stoneImage2);
                break;
       
     
      }
  
    }
  }


