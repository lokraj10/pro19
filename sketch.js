var dino, dinoImg
var backDrop,backDropImg
var human, humanImg,deadhumanImg
var rockObstacle,rockObstacle2, obstaclesGroup
var gameState = "play"
var score
var invisble_ground
var jumpSound
var gameover, gameoverImg
var cover, coverImg
var dieSound
function preload(){
    dinoImg = loadImage("ezgif.com-gif-maker.gif")
    humanImg = loadImage("1_MZkYbiidokxTmuTfYhA4RA.gif")
    backDropImg = loadImage("360_F_136893040_rrGzTIulop7TfMHkMGAjiHQybsoDxl6f.jpg")
    rockObstacle = loadImage("Stealing_Creation_large_rock.png")
    rockObstacle2 = loadImage("obstacle-rock.png")
    deadhumanImg = loadImage("output-onlinepngtools (1).png")
    jumpSound = loadSound("jump.mp3")
    coverImg = loadImage("maxresdefault.jpg")
    gameoverImg = loadImage("output-onlinepngtools (1)1.png")
    dieSound = loadSound("die.mp3")
}
function setup() {
  createCanvas(480,300)

    backDrop = createSprite(300,150)
    backDrop.addImage(backDropImg)

    invisble_ground = createSprite(200,300,600,10)

    dino = createSprite(70,250)
    dino.addImage(dinoImg)
    dino.scale = .15

    human = createSprite(240,220)
    human.addImage(humanImg)
    human.scale = 0.5

    obstaclesGroup = createGroup();

    dino.setCollider("circle")
    human.setCollider("rectangle",0,0,175,300)

    invisble_ground.visible = false;

    cover = createSprite(250,150,480,300)
    cover.scale = .42
    cover.visible = false
    cover.addImage(coverImg)

    score = 0

    gameover = createSprite(250,250,300,200)
    gameover.addImage(gameoverImg)
    gameover.scale = .25
    gameover.visible = false;

};
function draw() {
    background(0)
    
    if(gameState === "play"){
        score = score + Math.round(getFrameRate()/60);

        backDrop.velocityX = -(4 + 3* score/100)
        if (backDrop.x <195) {
            backDrop.x = backDrop.width / 2;
          }

          if(keyDown("space")&& human.y >= 200) {
            human.velocityY = -15;
            jumpSound.play();
        }


        human.velocityY = human.velocityY + 0.8
        human.collide(invisble_ground);
        if(dino.isTouching(obstaclesGroup)){

            dino.velocityY = -12
        }
        dino.velocityY = dino.velocityY + 0.8
        dino.collide(invisble_ground)

        if(human.isTouching(obstaclesGroup)){
            human.velocityX = 0
            dino.x = human.x
            gameState = "end"
            backDrop.velocityX = 0
            obstaclesGroup.velocityX = 0
            obstaclesGroup.setVelocityXEach(0);
            obstaclesGroup.setLifetimeEach(0);
            human.velocityY = 0
            dino.velocityX = 0
            dino.velocityY = 0
            human.velocityY = 5
            human.addImage(deadhumanImg)
            setTimeout(cover1,900)
            score = 0
            setTimeout(gameover1,900)
            dieSound.play();
            
        }

    } 

    if(gameState === "end"){
        obstaclesGroup.setVelocityXEach(0);
        if(mousePressedOver(gameover)) {
            reset();
          }
    }

    drawSprites();
    spawnObstacles();
    fill("red")
    text("Score: "+ score, 370,20);
}


function spawnObstacles(){
    
    if (frameCount % 60 === 0){ 
        var obstacle = createSprite(600,270,200,200)
        obstacle.velocityX = -(6 + score/100);

        var rand = Math.round(random(1,2))
        switch(rand){
    case 1: obstacle.addImage(rockObstacle2);
            break;
    case 2: obstacle.addImage(rockObstacle);
            break;
    default: break;

        }
        obstacle.scale = 0.125;
        obstacle.lifetime = 200;
        obstaclesGroup.add(obstacle)
    }
}

function cover1(){

    cover.visible = true

}

function gameover1(){

    gameover.visible = true;

}

function reset(){

    cover.visible = false;
    gameover.visible = false;
    obstaclesGroup.destroyEach();
    human.addImage(humanImg)
    human.x = 240
    human.y = 220
    gameState = "play"
    dino.x = 70

}