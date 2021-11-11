var gruponuvens
var grupocactos
var trex, trex_correndo
var gameover
var bordas
var solo 
var soloinvisivel 
var nuvem_imagem
var obstacle_imagem
var obstacle2_imagem
var obstacle3_imagem
var obstacle4_imagem
var obstacle5_imagem
var obstacle6_imagem
var pontuacao = 0
var estadojogo = 'jogar'
var trexm_imagem
var gameover_imagem
var restart
var restart_imagem

function preload(){
  obstacle_imagem = loadImage ('obstacle1.png')
  obstacle2_imagem = loadImage ('obstacle2.png')
  obstacle3_imagem = loadImage ('obstacle3.png')
  obstacle4_imagem = loadImage ('obstacle4.png')
  obstacle5_imagem = loadImage ('obstacle5.png')
  obstacle6_imagem = loadImage ('obstacle6.png')
  trexm_imagem = loadAnimation ('trex_collided.png')
  gameover_imagem = loadImage ('gameOver-1.png')
  restart_imagem = loadImage ('restart.png')
  
  nuvem_imagem = loadImage ('cloud.png')

  solo_imagem = loadImage('ground2.png')
  
  trex_correndo = loadAnimation("trex1.png","trex3.png","trex4.png")

}


function setup(){
  createCanvas(600,200)

  bordas = createEdgeSprites()
  
  restart = createSprite (300, 100)
  gameover = createSprite (300,50)
  solo = createSprite(300, 180, 600, 10)
  solo.addImage(solo_imagem)
  gameover.addImage(gameover_imagem)
  restart.addImage (restart_imagem)
  gruponuvens = new Group()
  grupocactos = new Group ()
  //criar um sprite do trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("Correndo",trex_correndo)
  trex.scale = 0.6
  trex.addAnimation("morto",trexm_imagem)
  trex.setCollider("circle",0,0,40)
  
  
  soloinvisivel = createSprite (300, 185, 600, 5)
  soloinvisivel.visible = false
}

function draw(){
  background("white")
  
  reset()
  if (estadojogo == 'jogar'){  
  gerarnuvens()
  gerarcactos()
  restart.visible = false
  pontuacao =  Math.round (pontuacao  + (frameCount / 60))
  gameover.visible = false
  if(keyDown("space")&& (trex.y > 150)){              
    trex.velocityY = -13
  }
  
  trex.velocityY +=0.8
  solo.velocityX = -8
    
  if (trex.isTouching(grupocactos)){
  estadojogo = 'encerrar'
  trex.velocityY = 0
    
    
  }
  }
  
  else if (estadojogo == 'encerrar'){
   solo.velocityX = 0 
   gruponuvens.setVelocityXEach(0)
   grupocactos.setVelocityXEach(0)
   trex.changeAnimation ('morto')
   grupocactos.setLifetimeEach(-1)
   gruponuvens.setLifetimeEach(-1)
   gameover.visible = true
   restart.visible = true
  }
  
  text (pontuacao, 500, 10)
   
  
  
  if (solo.x < 0){
    solo.x = solo.width/2
  }
  
  
  drawSprites();
  trex.collide(soloinvisivel)
  
  
  

}

  function gerarnuvens(){
  if (frameCount %100==0){
  var nuvem = createSprite (550, random (1, 100), 10, 10)
  nuvem.addImage(nuvem_imagem)
  nuvem.velocityX = -3
  nuvem.depth = trex.depth
  trex.depth = trex.depth + 1
  nuvem.lifetime = 200
  gruponuvens.add(nuvem)
  }
 
}


function gerarcactos(){
  if (frameCount %90==0){
     var cacto = createSprite (600, 160, 10, 10)
 cacto.addImage(obstacle_imagem)
 
    var rand = Math.round(random(1,6))
 grupocactos.add (cacto)
    
 switch (rand){
   case 1: cacto.addImage(obstacle_imagem);
   cacto.setCollider("rectangle",0,0,40,60)
   break
   case 2: cacto.addImage(obstacle2_imagem);
   cacto.setCollider("rectangle",0,0,80,70)
   break
   case 3: cacto.addImage(obstacle3_imagem);
   cacto.setCollider("rectangle",0,0,100,70)
   break
   case 4: cacto.addImage(obstacle4_imagem);
   cacto.setCollider("rectangle",0,0,50,100)
   break
   case 5: cacto.addImage(obstacle5_imagem);
   cacto.setCollider("rectangle",0,0,110,100)
   break
   case 6: cacto.addImage(obstacle6_imagem);
   cacto.setCollider("rectangle",0,0,100,100)
   break
                  
  
}
 cacto.velocityX = -8
 cacto.scale = 0.7
 cacto.lifetime = 100
  }
 
}
function reset(){
  if ((mousePressedOver(restart) || keyDown ('space')) && estadojogo == 'encerrar'){
  estadojogo = 'jogar'
  grupocactos.destroyEach()
  gruponuvens.destroyEach()
  pontuacao = 0
  trex.changeAnimation ('Correndo')
  }
}