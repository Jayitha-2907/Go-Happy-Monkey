var bananaImage, obstacleImage, backImage
var obstaclesGroup, banana, bananaGroup, obstacle
var score


function preload() {
 
player_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
bananaImage = loadImage("banana.png");
  
obstacleImage = loadImage("stone.png");  

backImg = loadImage("jungle.jpg");
  
}


function setup() {
  createCanvas(600, 500);
  
backImage = createSprite(250, 300);
backImage.addImage("background", backImg);
backImage.velocityX = -3;
  
player = createSprite(50, 180, 10, 10);
player.addAnimation("player_running", player_running);
player.scale = 0.3;
  
ground = createSprite(200, 480, 600, 5);
ground.visible = false;
  
obstaclesGroup = new Group();
bananaGroup = new Group();
  
score = 0
    
}




function draw() {

  background(220);
  
  player.collide(ground);
    
  
  if (backImage.x < 100){
      backImage.x = backImage.width/2;   
    }
  
  console.log(player.y);
  
  
  if(player.y >= 385){
   
   //jumping when space pressed
if(keyDown("space")) {
    player.velocityY = -17;
  }
  
   }
  
  
  if(obstaclesGroup.isTouching(player)){  

   player.scale = 0.2; 
  }
  
  //gravity
  player.velocityY = player.velocityY + 0.6
  
  //collision to the ground
  player.collide(ground);
  
  
  bananas();
  Obstacles();
  
  
  //getting points
  if(bananaGroup.isTouching(player)){
    score = score+2;
    bananaGroup.destroyEach();
  } 
  

  
  //collision with obstacles 
  if(obstaclesGroup.collide(player)){
   
    obstaclesGroup.destroyEach();
    
  }
  
      
  switch (score) {
      
    case 10: player.scale = 0.12;
      break;
     case 20: player.scale = 0.14;
      break;
       case 30: player.scale = 0.16;
      break;
       case 40: player.scale = 0.18;
      break;
       case 50: player.scale = 0.20;
      break;
      default: break;
      
  }
    
  
  
  
  drawSprites();
  
  //text for score
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 500, 50);
  
}




function bananas(){
 
  if(frameCount % 80 === 0) {
  
    var banana = createSprite(600, Math.round(random(190, 270)), 10, 10);
    banana.addImage(bananaImage);
    
    banana.scale = 0.06;
    
    banana.velocityX = -5;
    
    banana.lifetime = 189;
    
    bananaGroup.add(banana);
    
  }
  
}




function Obstacles() {
  if(frameCount % 150 === 0) {
    
    var obstacle = createSprite(600,465,10,40);
    obstacle.velocityX = -6;
    
    obstacle.addAnimation("stone_Img",obstacleImage);
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 189;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}



