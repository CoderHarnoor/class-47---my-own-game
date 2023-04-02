var PLAY = 1;
var END = 0;
var gameState = PLAY;

var dino, dino_running, dino_collided;
var ground, invisibleGround, groundImage;


var obstaclesGroup, obstacle1, obstacle2, obstacle3;
var backgroundImg
var score=0;


var gameOver, restart;


function preload(){
  
  backgroundImg = loadImage("park.jpg")
 
  
  dino_running = loadAnimation("trex_2.png","trex_1.png","trex_3.png");
  dino_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground.png");
  
  
  
  obstacle1_img = loadImage("apple2.png");
  obstacle2_img = loadImage("banana2.png");
  obstacle3_img = loadImage("orange2.png");
  
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
 
  dino = createSprite(100,70,20,50);
  console.log(dino.x);
  
  dino.addAnimation("running", dino_running);
  dino.addAnimation("collided", dino_collided);
  dino.setCollider('circle',0,0,350)
  dino.scale = 0.2;


  
  invisibleGround = createSprite(width/2,height-10,width,125);  
  invisibleGround.shapeColor = "#f4cbaa";
  
  ground = createSprite(width/2,height,width,2);
  ground.addImage("ground",groundImage);
  ground.x = width/2
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;
  
 
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
 
  background(backgroundImg);
  textSize(20);
  fill("black")
  text("Score: "+ score,30,50);
  
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
    
   // if((touches.length > 0 || keyDown("SPACE")) && dino.y  >= height-120) {
    if(keyDown("SPACE"))
      //jumpSound.play( )
      dino.velocityY = -20;
       //touches = [];
    }
    
    dino.velocityY = dino.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
   dino.collide(invisibleGround);
   drawSprites();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(dino)){
        //collidedSound.play()
        gameState = END;
    }

  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    

    ground.velocityX = 0;
    dino.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    
    
   
    dino.changeAnimation("collided",dino_collided);
    
   
    obstaclesGroup.setLifetimeEach(-1);
    
    
    if(touches.length>0 || keyDown("SPACE") || mousePressedOver(restart)) {      
      reset();
      touches = []
    }
   
  }
  
  
 



function spawnObstacles() {
  if(frameCount % 100 === 0) {
    var obstacle1 = createSprite(500,180,20,30);
    obstacle1.addImage(obstacle1_img);
    obstacle1.scale = 1;
    obstacle1.setCollider('circle',0,0,45)
    obstacle1.velocityY = (6 + 3*score/100);
    obstacle1.x = Math.round(random(300,1000));
           
    obstacle1.scale = 0.7;
    obstacle1.lifetime = 300;
    obstacle1.depth = dino.depth;
    dino.depth +=1;
    
    obstaclesGroup.add(obstacle1);
  }

  if(frameCount % 80 === 0) {
    var obstacle2 = createSprite(600,height-95,20,30);
    obstacle2.addImage(obstacle2_img);
    obstacle2.scale = 2;
    obstacle2.setCollider('circle',0,0,45)
    obstacle2.velocityX = -(6 + 3*score/100);
           
    obstacle2.scale = 0.7;
    obstacle2.lifetime = 300;
    obstacle2.depth = dino.depth;
    dino.depth +=1;
    
    obstaclesGroup.add(obstacle2);
  }

  if(frameCount % 220 === 0) {
    var obstacle3 = createSprite(600,height-95,20,30);
    obstacle3.addImage(obstacle3_img);
    obstacle3.scale = 2;
    obstacle3.setCollider('circle',0,0,45)
    obstacle3.velocityX = -(6 + 3*score/100);
           
    obstacle3.scale = 0.7;
    obstacle3.lifetime = 300;
    obstacle3.depth = dino.depth;
    dino.depth +=1;
    
    obstaclesGroup.add(obstacle3);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();

  
  dino.changeAnimation("running",tdino_running);
  
  score = 0;
  
}}
