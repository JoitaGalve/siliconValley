var PLAY = 1
var END = 0
var gameState = 3

var bg, bgI, bg1, bg1I;
var player, playerI;
var edges;

var virus, virusI, virusG;
var virus1, virusI1, virus1G;
var mask, maskI, maskG;
var oxygenCylinder, oxygenCylinderI, oxygenCylinderG;

var playB, playBI;
var score = 0
var points = 0
var life = 3
var last, lastI;
var restart, restartI;
var go, goI;
var help1, helpI1;
var help2, helpI2;
var back, backI;
var city, cityS;
var yw, ywI;
var r, rI;
var checkPointS;
var dieS;
var crashS;
var clickS;
var winS;
function preload(){
  //load images
  bgI = loadImage("bg2.png")
  bg1I = loadImage("covid.jpg")
  playerI = loadImage("Player.png")
  playBI = loadImage("play.png")
  virusI = loadImage("corona.gif")
  virusI1 = loadImage("Obstacle1.png")
  maskI = loadImage("mask.gif")
  oxygenCylinderI = loadImage("oxygenCylinder.png")
  lastI = loadImage("last.gif")
  restartI = loadImage("restart.png")
  goI = loadImage("go-1.gif")
  helpI1 = loadImage("ButtonHelp.png")
  helpI2 = loadImage("help.png")
  backI = loadImage("back.png")
  cityS = loadSound("city.mp3")
  ywI = loadImage("yw1.jpg")
  rI = loadImage("replay.png")
  checkPointS = loadSound("checkPoint.mp3")
  dieS = loadSound("die.mp3")
  crashS = loadSound("punch.mp3")
  clickS = loadSound("push.mp3")
  winS = loadSound("Woosh.mp3")
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  //creating background
  bg = createSprite(300, 250, 10,10)
  bg.addImage(bgI)
  bg.scale = 1.5
  bg.velocityX = 0
  
 
  
  //creating player
  player = createSprite(150, 250, 10,10)
  player.addImage(playerI)
  player.scale = 0.4
  
  player.visible = false
  
  player.setCollider("rectangle",20,-25,300, 180);
  player.debug = false
    
  // creating background before playing
  bg1 = createSprite(650, 250, 10,10)
  bg1.addImage(bg1I)
  bg1.scale = 2.5
  
  
  // creating play button
  play = createSprite(1000, 350, 10,10)
  play.addImage(playBI)
  play.scale = 0.4
  
  //creating last image
  last = createSprite(680, 350, 10,10)
  last.addImage(lastI)
  last.scale = 1.7
  last.visible = false
  
  
  //creating restart button
  restart = createSprite(680, 620, 10,10)
  restart.addImage(restartI)
  restart.scale = 0.7
  restart.visible = false
  
  // creating game over
  go = createSprite(680, 50, 10,10)
  go.addImage(goI)
  go.scale = 0.7
  go.visible = false
  
  help1 = createSprite(130, 25, 10,10)
  help1.addImage(helpI1)
  help1.scale = 0.2
  help1.visible = true
  
  help2 = createSprite(680, 300, 10,10)
  help2.addImage(helpI2)
  help2.scale = 1
  help2.visible = false
  
  back = createSprite(820, 580, 10,10)
  back.addImage(backI)
  back.scale = 0.3
  back.visible = false
  
  yw = createSprite(680, 300, 10, 10)
  yw.addImage(ywI)
  yw.scale = 2.2
  yw.visible = false
  
  r = createSprite(680, 590, 10, 10)
  r.addImage(rI)
  r.scale = 0.2
  r.visible = false
  //creating groups
  virusG = createGroup()
  virus1G = createGroup()
  maskG = createGroup()
  oxygenCylinderG = createGroup()

}

function draw() {
  background(0);
 
  if(gameState===PLAY) {
  
  player.velocityY = 0
  help1.visible = false
  
  //creating edges
  edges = createEdgeSprites()
  player.collide(edges)
  
  //resetting the background
  if(bg.x<130) {
    bg.x = width/2
  }
  
  //moving the player with up arrow key
  if(keyDown(UP_ARROW)) {
    player.velocityY = -6
  }

  //moving the player with down arrow key  
  if(keyDown(DOWN_ARROW)){
    player.velocityY = 6
  }
    
  bg.velocityX = -(3 + 2* score/20)
  bg.velocityX = -(3 + 2* points/10)
    
  if(virusG.isTouching(player)) {
  virusG.destroyEach()
  life-=1
  virusG.destroyEach()
  virus1G.destroyEach()
  maskG.destroyEach()
  oxygenCylinderG.destroyEach()
  crashS.play()
    } 
    
  if(virus1G.isTouching(player)) {
     virus1G.destroyEach()
     //giving scores
     score+=10
     checkPointS.play()

  
    } 
    
  if(maskG.isTouching(player)) {
     maskG.destroyEach()
     //giving scores
     points+=2
     checkPointS.play()
  } 
    
  if(score===100) {
    yw.visible = true
    r.visible = true
    player.visible = false
    virusG.destroyEach()
    virus1G.destroyEach()
    maskG.destroyEach()
    oxygenCylinderG.destroyEach()
    bg.velocityX = 0
    player.velocityY = 0
    help1.visible = false
    cityS.stop()
   }
   
   if(points===100) {
    yw.visible = true
    r.visible = true
    player.visible = false
    virusG.destroyEach()
    virus1G.destroyEach()
    maskG.destroyEach()
    oxygenCylinderG.destroyEach()
    bg.velocityX = 0
    player.velocityY = 0
    help1.visible = false
    cityS.stop()
   }
   
  if(life===0) {
     dieS.play()
     gameState = END
    }
    
  if(oxygenCylinderG.isTouching(player)) {
     oxygenCylinderG.destroyEach()
     //giving scores
     points+=4
     checkPointS.play()
    }  
  }
  
  if(gameState===END) {
    last.visible = true
    restart.visible = true
    go.visible = true
    player.visible = false
    virusG.destroyEach()
    virus1G.destroyEach()
    maskG.destroyEach()
    oxygenCylinderG.destroyEach()
    bg.velocityX = 0
    player.velocityY = 0
    help1.visible = false
    cityS.stop() 
    winS.play()
    checkPointS.stop()
    
    
  }
  
  if(mousePressedOver(play) && play.visible===true) {
    Play() 
    clickS.play()
  }
  
  if(mousePressedOver(restart) && restart.visible===true) {
    Restart()
    clickS.play()
  }
  
  if(mousePressedOver(back) && back.visible===true) {
    Back()
    clickS.play()
  }
  
  if(keyDown("ENTER") && play.visible===true) {
    Play() 
  }

  if(mousePressedOver(help1) && play.visible===true) {
    Help()
    clickS.play()
  }
    
  if(mousePressedOver(r) && r.visible===true) {
    replay()
    clickS.play()
  }
    
     Virus()
     Virus1()
     Mask() 
     Oxygencylinder()
     drawSprites()
     //text for points
     fill("black")
     textSize(25)
     text("VIRUS POINTS: " +score, 1140, 25)
     fill("blue")
     textSize(25)
     text("EXTRA POINTS: " +points, 1140, 50)
     fill("red")
     textSize(25)
     text("LIFE: " +life, 10, 25)
}

  function Play() {
    gameState = PLAY
    bg.velocityX = -2
    player.visible = true
    play.visible = false
    bg1.visible = false
    virusG.destroyEach()
    virus1G.destroyEach()
    oxygenCylinderG.destroyEach()
    maskG.destroyEach()
    cityS.loop()
    
     
    
  }

function Restart() {
  gameState = PLAY
  player.visible = true
  restart.visible = false
  go.visible = false
  last.visible = false
  bg.velocityX = -2
  virusG.destroyEach()
  virus1G.destroyEach()
  maskG.destroyEach()
  oxygenCylinderG.destroyEach()
  score = 0
  points = 0
  life = 3
  cityS.loop()
}

function Help() {
  help2.visible = true
  back.visible = true
  virusG.destroyEach()
  virus1G.destroyEach()
  oxygenCylinderG.destroyEach()
  maskG.destroyEach()
  cityS.stop()
  bg.velocityX = 0
}

function Back() {
  help2.visible = false
  virusG.destroyEach()
  virus1G.destroyEach()
  oxygenCylinderG.destroyEach()
  maskG.destroyEach()
  back.visible = false
  
}

function replay() {
  gameState = PLAY
  player.visible = true
  yw.visible = false
  r.visible = false
  bg.velocityX = -2
  virusG.destroyEach()
  virus1G.destroyEach()
  maskG.destroyEach()
  oxygenCylinderG.destroyEach()
  score = 0
  points = 0
  life = 3
  cityS.loop()
}

function Oxygencylinder() {
  if (frameCount % 200 === 0 && gameState===PLAY) {
    oxygenCylinder = createSprite(1400,100);
    oxygenCylinder.y = Math.round(random(300,700));
    oxygenCylinder.addImage(oxygenCylinderI);
    oxygenCylinder.scale = 0.09;
    oxygenCylinder.velocityX = -(3 + 2* score/20)
    oxygenCylinder.lifetime = 400
    oxygenCylinder.depth = player.depth;
    player.depth = player.depth + 1;
    oxygenCylinderG.add(oxygenCylinder);
  }
}

function Mask() {
  if (frameCount % 400 === 0 && gameState===PLAY) {
  
    mask = createSprite(1400,100);
    mask.y = Math.round(random(10,900));
    mask.addImage(maskI);
    mask.scale = 0.4;
    mask.velocityX = -(3 + 2* score/20)
    mask.lifetime = 400
    mask.depth = player.depth;
    player.depth = player.depth + 1;
    maskG.add(mask);
  }
}

function Virus1() {
  if (frameCount % 600 === 0 && gameState===PLAY) {
    virus1 = createSprite(1400,100);
    virus1.y = Math.round(random(200,500));
    virus1.addImage(virusI1);
    virus1.scale = 0.3;
    virus1.velocityX = -(3 + 2* score/20)
    virus1.lifetime = 400
    virus1.depth = player.depth;
    player.depth = player.depth + 1;
    virus1G.add(virus1);
  }
}

function Virus() {
  if (frameCount % 800 === 0 && gameState===PLAY) {
    virus = createSprite(1400,100);
    virus.y = Math.round(random(30,600));
    virus.addImage(virusI);
    virus.scale = 0.3;
    virus.velocityX = -(3 + 2* score/20)
    virus.lifetime = 400
    virus.depth = player.depth;
    player.depth = player.depth + 1;
    virusG.add(virus);
  }
}

