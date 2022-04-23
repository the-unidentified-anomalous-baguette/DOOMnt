//global general variables
let tick = 0
let gamePart = 0 //menu, in-game, paused etc.
let currentMap = [] //gets filled with "block" objects 
let testRandom
//end of global general variables 

//gameplay variables
let rifle
let player
let minimap
let amo
let invMaxes = [10]
//end of gameplay variables

//general functions
function mean(list){
  let sum = 0
  for (let i = 0; i < list.length; i++){
    sum += list[i]
  }
  return sum/list.length
} //just returns the mean of a list
function isEven(n) {
   return n % 2 == 0;
} //checks if a number is even
function isOdd(n) {
   return Math.abs(n % 2) == 1;
} //checks if a number is odd
//end of general functions

//other gameplay functions
function walkingSounds(){
  // switch (currentMap[player.coords[0]][player.coords[1]].material){
  //   case 'grass':
  //     footsGrass.play()
  //     break;
  //   case 'mud':
  //     footsMud.play()
  //     break;
  //   case 'shingle':
  //     footsShingle.play()
  //     break;
  //   case 'snow':
  //     footsSnow.play()
  //     break;
  //   case 'solid':
  //     footsSolid.play()
  //     break;
  // }
} //controls player footstep sounds
function isMoveValid(mC, mV){
  if (mV == 'north' && currentMap[mC[0]][mC[1]].solidNorth == 0 && currentMap[mC[0] - 1][mC[1]].solidSouth == 0){
    return true
  }
  else if (mV == 'south' && currentMap[mC[0]][mC[1]].solidSouth == false && currentMap[mC[0] + 1][mC[1]].solidNorth == false){
    return true
  }
  else if (mV == 'east' && currentMap[mC[0]][mC[1]].solidEast == false && currentMap[mC[0]][mC[1] + 1].solidWest == false){
    return true
  }
  else if (mV == 'west' && currentMap[mC[0]][mC[1]].solidWest == false && currentMap[mC[0]][mC[1] - 1].solidEast == false){
    return true
  }
  else {return false}
}
//end of other gameplay functions

function setup(){
  angleMode(DEGREES)
  textAlign(CENTER, CENTER)
  canvas = createCanvas(1024, 576)
  canvas.parent('sketch-holder')
  frameRate(5)
  strokeWeight(1)
  demoImp = new enemy(8, 16, 1, {direction: 4, spriteSheet: impSs, activeArea: [8, 8, 16, 21]}, 900 * 42/61, 900)
  greenImp = new enemy(11, 12, 5, {spriteSheet: greenImpSs, activeArea: [8, 8, 16, 16]}, 850 * 42/61, 850)
  noEnemy = new enemy(0, 0, 5, {spriteSheet: blankSs}, 0, 0)
  amo = new entity(8, 8, {spriteSheet: amoSs, spriteWidth: 25, spriteHeight: 25, xFrame: 0, yFrame: 0, animation: 'c', inv: [5]}, 300, 300)
  rifle = new weapon('basic', gunSs, 4, 1, 0, 0)
  player = new playerClass([0, 0], 0, rifle, {})
}

function draw(){
  switch(gamePart) {
    case 0:
      background(0)
      fill(pureRed)
      textSize(50)
      text('GAME', 512, 50)
      rect(10, 100, 100, 50)
      fill(neutralGrey)
      textSize(25)
      text('play', 60, 125)
      minimap = 1
      break;
    case 1: //loading a level
      //document.getElementById('sketch-holder').style.cursor = 'none'
      background(0)
      currentMap = [[bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk],
                    [bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk],
                    [bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk],
                    [bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk],
                    [bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk],
                    [bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk],
                    [bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk],
                    [bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, fB, bk, bk, bk, fB, fB, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk],
                    [bk, bk, bk, bk, bk, bk, bk, bk, fC, sW, sW, sW, sW, sW, sW, sW, sW, sW, sW, sW, sW, fC, bk, bk, bk, bk, bk, bk, bk, bk],
                    [bk, bk, bk, bk, bk, bk, bk, bk, eW, fC, sW, sW, sW, sW, sW, sW, sW, sW, sW, sW, fC, wW, bk, bk, bk, bk, bk, bk, bk, bk],
                    [bk, bk, bk, bk, bk, bk, bk, bk, eW, eW, fC, sW, sW, sW, sW, sW, sW, sW, sW, fC, wW, wW, bk, bk, bk, bk, bk, bk, bk, bk],
                    [bk, bk, bk, bk, bk, bk, bk, bk, eW, eW, eW, fC, sW, sW, sW, sW, sW, sW, fC, wW, wW, wW, bk, bk, bk, bk, bk, bk, bk, bk],
                    [bk, bk, bk, bk, bk, bk, bk, fB, eW, eW, eW, eW, fC, fC, fC, fC, fC, wW, wW, wW, wW, wW, bk, bk, bk, bk, bk, bk, bk, bk],
                    [bk, bk, bk, bk, bk, bk, bk, bk, eW, eW, eW, eW, fC, nW, nW, nW, nW, nW, fC, wW, wW, wW, bk, bk, bk, bk, bk, bk, bk, bk],
                    [bk, bk, bk, bk, bk, bk, bk, bk, eW, eW, eW, fC, nW, nW, nW, nW, nW, nW, nW, fC, wW, wW, bk, bk, bk, bk, bk, bk, bk, bk],
                    [bk, bk, bk, bk, bk, bk, bk, bk, eW, eW, fC, nW, nW, nW, nW, nW, nW, nW, nW, nW, fC, wW, bk, bk, bk, bk, bk, bk, bk, bk],
                    [bk, bk, bk, bk, bk, bk, bk, bk, eW, fC, nW, nW, nW, nW, nW, nW, nW, nW, nW, nW, nW, fC, bk, bk, bk, bk, bk, bk, bk, bk],
                    [bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk],
                    [bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk],
                    [bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk],
                    [bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, fB, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk],
                    [bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk],
                    [bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk],
                    [bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk],
                    [bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk]
                   ] //loads a map
      for (let i = 0; i < currentMap.length; i++){
        for (let j = 0; j < currentMap[i].length; j++){
          currentMap[i][j] = Object.assign({}, currentMap[i][j])
          currentMap[i][j].floorC = [random(127, 256), random(127, 256), random(0, 127)]
          currentMap[i][j].material = ['grass', 'mud', 'shingle', 'snow', 'solid'][Math.floor(random(0, 5))]
        }
      } //runs through the entire map and converts each block from references to prefabs to unique objects
      currentMap[12][13].northShinC = neutralGrey
      currentMap[8][8].hasProp = 1
      currentMap[8][8].prop = amo
      currentMap[8][8].prop.lootable = true
      currentMap[12][13].westMid = 0
      currentMap[12][13].eastMid = 0
      currentMap[12][13].westFace = 0
      currentMap[12][13].eastFace = 0
      currentMap[13][13].northMid = 1
      currentMap[12][13].knee = 1
      currentMap[12][13].head = 1
      currentMap[12][8].floorC = pureRed
      currentMap[12][13].head = 1
      currentMap[11][13].southMid = 1
      currentMap[11][13].northMidC = pureRed
      currentMap[11][13].southMidC = pureRed
      currentMap[13][13].northMidC = neutralGrey
      currentMap[16][8].hasEnemy = true
      //currentMap[12][11].hasEnemy = true
      currentMap[16][8].enemy = demoImp
      //currentMap[12][11].enemy = greenImp
      player.coords = [12, 17]
      player.direction = 6
      gamePart = 2
      demoImp.bfsToPlayer()
      //demoImp.path = [[-1, 0], [-1, 0], [-1, 0], [0, 1], [0, 1], [0, 1]]
      textSize(30)
      break;
    case 2:
      //testRandom = Math.floor(random(0, 4))
      player.turn()
      image(skySs, //image to be used
                0, 0, //where to place top-left corner
                1024, 576, //how big to draw
                player.direction * 1024, 0, //which part of spritesheet to take
                1024, 576) //how big the sprite being used is
      enviroRender()
      player.equipped.render()
      uiDraw()
      if (keyIsDown(80)){
        gamePart = 3
        exitPointerLock()
      }
      if (demoImp.path.length > 0){
        demoImp.animation = 'm'
        demoImp.execPath(demoImp.path[0][0], demoImp.path[0][1])
      }
      else if (this.x != player.coords[1] && this.y != player.coords[0]){
        demoImp.bfsToPlayer()
      }
      // console.log(demoImp.path)
      break;
    case 3:
      fill(pureRed)
      rect(10, 100, 100, 50)
      fill(neutralGrey)
      textSize(25)
      text('resume', 60, 125)
      break;
  }
}

function mousePressed(){
  switch (gamePart){
    case 0:
      if (mouseX > 10 && mouseX < 110 && mouseY > 100 && mouseY < 150){
        gamePart = 1
        requestPointerLock()
      }
      break;
    case 2:
      player.equipped.attack()
      break;
    case 3:
      if (mouseX > 10 && mouseX < 110 && mouseY > 100 && mouseY < 150){
        gamePart = 2
        requestPointerLock()
      }
      break;
  }
}