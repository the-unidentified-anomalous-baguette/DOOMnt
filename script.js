//global general variables
let tick = 0
let gamePart = 1 //menu, in-game, paused etc.
let currentMap = [] //gets filled with "block" objects 
//end of global general variables 

//gameplay variables
let playerCoords = [0, 0]
let playerDirection
let minimap
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
function turn(){
  if (keyIsDown(LEFT_ARROW)) {
    playerDirection -= 1
    if (playerDirection == -1){
      playerDirection = 7
    }
  }
  if (keyIsDown(RIGHT_ARROW)) {
    playerDirection += 1
    if (playerDirection == 8){
      playerDirection = 0
    }
  }
  if (keyIsDown(87)){
    switch (playerDirection) {
      case 0:
        if (currentMap[playerCoords[0]][playerCoords[1]].solidNorth == 0 && currentMap[playerCoords[0] - 1][playerCoords[1]].solidSouth == 0){
          playerCoords[0] -= 1
        } 
        break; //move north case
      case 1:
        if (currentMap[playerCoords[0]][playerCoords[1]].solidNorth == 0 && currentMap[playerCoords[0] - 1][playerCoords[1]].solidSouth == 0){
          playerCoords[0] -= 1
          if (currentMap[playerCoords[0]][playerCoords[1]].solidEast == 0 && currentMap[playerCoords[0]][playerCoords[1] + 1].solidWest == 0){
            playerCoords[1] += 1
          }
        }
        else if (currentMap[playerCoords[0]][playerCoords[1]].solidEast == 0 && currentMap[playerCoords[0]][playerCoords[1] + 1].solidWest == 0){
          playerCoords[1] += 1
          if (currentMap[playerCoords[0]][playerCoords[1]].solidNorth == 0 && currentMap[playerCoords[0] - 1][playerCoords[1]].solidSouth == 0){
            playerCoords[0] -= 1
          }
        }
        break; //move north-east case
      case 2:
        if (currentMap[playerCoords[0]][playerCoords[1]].solidEast == 0 && currentMap[playerCoords[0]][playerCoords[1] + 1].solidWest == 0){
          playerCoords[1] += 1
        }
        break; //move east case
      case 3:
        if (currentMap[playerCoords[0]][playerCoords[1]].solidEast == 0 && currentMap[playerCoords[0]][playerCoords[1] + 1].solidWest == 0){
          playerCoords[1] += 1
          if (currentMap[playerCoords[0]][playerCoords[1]].solidSouth == 0 && currentMap[playerCoords[0] + 1][playerCoords[1]].solidNorth == 0){
            playerCoords[0] += 1
          }
        }
        else if (currentMap[playerCoords[0]][playerCoords[1]].solidSouth == 0 && currentMap[playerCoords[0] + 1][playerCoords[1]].solidNorth == 0){
          playerCoords[0] += 1
          if (currentMap[playerCoords[0]][playerCoords[1]].solidEast == 0 && currentMap[playerCoords[0]][playerCoords[1] + 1].solidWest == 0){
            playerCoords[1] += 1
          }
        }
        break; //move south-east case
      case 4:
        if (currentMap[playerCoords[0]][playerCoords[1]].solidSouth == 0 && currentMap[playerCoords[0] + 1][playerCoords[1]].solidNorth == 0){
          playerCoords[0] += 1
        }
        break; //move south case
      case 5:
        if (currentMap[playerCoords[0]][playerCoords[1]].solidSouth == 0 && currentMap[playerCoords[0] + 1][playerCoords[1]].solidNorth == 0){
          playerCoords[0] += 1
          if (currentMap[playerCoords[0]][playerCoords[1]].solidWest == 0 && currentMap[playerCoords[0]][playerCoords[1] - 1].solidEast == 0){
            playerCoords[1] -= 1
          }
        }
        else if (currentMap[playerCoords[0]][playerCoords[1]].solidWest == 0 && currentMap[playerCoords[0]][playerCoords[1] - 1].solidEast == 0){
          playerCoords[1] -= 1
          if (currentMap[playerCoords[0]][playerCoords[1]].solidSouth == 0 && currentMap[playerCoords[0] + 1][playerCoords[1]].solidNorth == 0){
            playerCoords[0] += 1
          }
        }
        break; //move south-west case
      case 6:
        if (currentMap[playerCoords[0]][playerCoords[1]].solidWest == 0 && currentMap[playerCoords[0]][playerCoords[1] - 1].solidEast == 0){
          playerCoords[1] -= 1
        }
        break; //move west case
      case 7:
        if (currentMap[playerCoords[0]][playerCoords[1]].solidWest == 0 && currentMap[playerCoords[0]][playerCoords[1] - 1].solidEast == 0){
          playerCoords[1] -= 1
          if (currentMap[playerCoords[0]][playerCoords[1]].solidNorth == 0 && currentMap[playerCoords[0] - 1][playerCoords[1]].solidSouth == 0){
            playerCoords[0] -= 1
          }
        }
        else if (currentMap[playerCoords[0]][playerCoords[1]].solidNorth == 0 && currentMap[playerCoords[0] - 1][playerCoords[1]].solidSouth == 0){
          playerCoords[0] -= 1
          if (currentMap[playerCoords[0]][playerCoords[1]].solidWest == 0 && currentMap[playerCoords[0]][playerCoords[1] - 1].solidEast == 0){
            playerCoords[1] -= 1
          }
        }
        break; //move north-west case
    }
  }
  else if (keyIsDown(83)){
    switch (playerDirection) {
      case 4:
        if (currentMap[playerCoords[0]][playerCoords[1]].solidNorth == 0 && currentMap[playerCoords[0] - 1][playerCoords[1]].solidSouth == 0){
          playerCoords[0] -= 1
        } 
        break; //move north case
      case 5:
        if (currentMap[playerCoords[0]][playerCoords[1]].solidNorth == 0 && currentMap[playerCoords[0] - 1][playerCoords[1]].solidSouth == 0){
          playerCoords[0] -= 1
          if (currentMap[playerCoords[0]][playerCoords[1]].solidEast == 0 && currentMap[playerCoords[0]][playerCoords[1] + 1].solidWest == 0){
            playerCoords[1] += 1
          }
        }
        else if (currentMap[playerCoords[0]][playerCoords[1]].solidEast == 0 && currentMap[playerCoords[0]][playerCoords[1] + 1].solidWest == 0){
          playerCoords[1] += 1
          if (currentMap[playerCoords[0]][playerCoords[1]].solidNorth == 0 && currentMap[playerCoords[0] - 1][playerCoords[1]].solidSouth == 0){
            playerCoords[0] -= 1
          }
        }
        break; //move north-east case
      case 6:
        if (currentMap[playerCoords[0]][playerCoords[1]].solidEast == 0 && currentMap[playerCoords[0]][playerCoords[1] + 1].solidWest == 0){
          playerCoords[1] += 1
        }
        break; //move east case
      case 7:
        if (currentMap[playerCoords[0]][playerCoords[1]].solidEast == 0 && currentMap[playerCoords[0]][playerCoords[1] + 1].solidWest == 0){
          playerCoords[1] += 1
          if (currentMap[playerCoords[0]][playerCoords[1]].solidSouth == 0 && currentMap[playerCoords[0] + 1][playerCoords[1]].solidNorth == 0){
            playerCoords[0] += 1
          }
        }
        else if (currentMap[playerCoords[0]][playerCoords[1]].solidSouth == 0 && currentMap[playerCoords[0] + 1][playerCoords[1]].solidNorth == 0){
          playerCoords[0] += 1
          if (currentMap[playerCoords[0]][playerCoords[1]].solidEast == 0 && currentMap[playerCoords[0]][playerCoords[1] + 1].solidWest == 0){
            playerCoords[1] += 1
          }
        }
        break; //move south-east case
      case 0:
        if (currentMap[playerCoords[0]][playerCoords[1]].solidSouth == 0 && currentMap[playerCoords[0] + 1][playerCoords[1]].solidNorth == 0){
          playerCoords[0] += 1
        }
        break; //move south case
      case 1:
        if (currentMap[playerCoords[0]][playerCoords[1]].solidSouth == 0 && currentMap[playerCoords[0] + 1][playerCoords[1]].solidNorth == 0){
          playerCoords[0] += 1
          if (currentMap[playerCoords[0]][playerCoords[1]].solidWest == 0 && currentMap[playerCoords[0]][playerCoords[1] - 1].solidEast == 0){
            playerCoords[1] -= 1
          }
        }
        else if (currentMap[playerCoords[0]][playerCoords[1]].solidWest == 0 && currentMap[playerCoords[0]][playerCoords[1] - 1].solidEast == 0){
          playerCoords[1] -= 1
          if (currentMap[playerCoords[0]][playerCoords[1]].solidSouth == 0 && currentMap[playerCoords[0] + 1][playerCoords[1]].solidNorth == 0){
            playerCoords[0] += 1
          }
        }
        break; //move south-west case
      case 2:
        if (currentMap[playerCoords[0]][playerCoords[1]].solidWest == 0 && currentMap[playerCoords[0]][playerCoords[1] - 1].solidEast == 0){
          playerCoords[1] -= 1
        }
        break; //move west case
      case 3:
        if (currentMap[playerCoords[0]][playerCoords[1]].solidWest == 0 && currentMap[playerCoords[0]][playerCoords[1] - 1].solidEast == 0){
          playerCoords[1] -= 1
          if (currentMap[playerCoords[0]][playerCoords[1]].solidNorth == 0 && currentMap[playerCoords[0] - 1][playerCoords[1]].solidSouth == 0){
            playerCoords[0] -= 1
          }
        }
        else if (currentMap[playerCoords[0]][playerCoords[1]].solidNorth == 0 && currentMap[playerCoords[0] - 1][playerCoords[1]].solidSouth == 0){
          playerCoords[0] -= 1
          if (currentMap[playerCoords[0]][playerCoords[1]].solidWest == 0 && currentMap[playerCoords[0]][playerCoords[1] - 1].solidEast == 0){
            playerCoords[1] -= 1
          }
        }
        break; //move north-west case
    }
  }
  if (keyIsDown(65)){
    switch (playerDirection) {
      case 2:
        if (currentMap[playerCoords[0]][playerCoords[1]].solidNorth == 0 && currentMap[playerCoords[0] - 1][playerCoords[1]].solidSouth == 0){
          playerCoords[0] -= 1
        } 
        break; //move north case
      case 3:
        if (currentMap[playerCoords[0]][playerCoords[1]].solidNorth == 0 && currentMap[playerCoords[0] - 1][playerCoords[1]].solidSouth == 0){
          playerCoords[0] -= 1
          if (currentMap[playerCoords[0]][playerCoords[1]].solidEast == 0 && currentMap[playerCoords[0]][playerCoords[1] + 1].solidWest == 0){
            playerCoords[1] += 1
          }
        }
        else if (currentMap[playerCoords[0]][playerCoords[1]].solidEast == 0 && currentMap[playerCoords[0]][playerCoords[1] + 1].solidWest == 0){
          playerCoords[1] += 1
          if (currentMap[playerCoords[0]][playerCoords[1]].solidNorth == 0 && currentMap[playerCoords[0] - 1][playerCoords[1]].solidSouth == 0){
            playerCoords[0] -= 1
          }
        }
        break; //move north-east case
      case 4:
        if (currentMap[playerCoords[0]][playerCoords[1]].solidEast == 0 && currentMap[playerCoords[0]][playerCoords[1] + 1].solidWest == 0){
          playerCoords[1] += 1
        }
        break; //move east case
      case 5:
        if (currentMap[playerCoords[0]][playerCoords[1]].solidEast == 0 && currentMap[playerCoords[0]][playerCoords[1] + 1].solidWest == 0){
          playerCoords[1] += 1
          if (currentMap[playerCoords[0]][playerCoords[1]].solidSouth == 0 && currentMap[playerCoords[0] + 1][playerCoords[1]].solidNorth == 0){
            playerCoords[0] += 1
          }
        }
        else if (currentMap[playerCoords[0]][playerCoords[1]].solidSouth == 0 && currentMap[playerCoords[0] + 1][playerCoords[1]].solidNorth == 0){
          playerCoords[0] += 1
          if (currentMap[playerCoords[0]][playerCoords[1]].solidEast == 0 && currentMap[playerCoords[0]][playerCoords[1] + 1].solidWest == 0){
            playerCoords[1] += 1
          }
        }
        break; //move south-east case
      case 6:
        if (currentMap[playerCoords[0]][playerCoords[1]].solidSouth == 0 && currentMap[playerCoords[0] + 1][playerCoords[1]].solidNorth == 0){
          playerCoords[0] += 1
        }
        break; //move south case
      case 7:
        if (currentMap[playerCoords[0]][playerCoords[1]].solidSouth == 0 && currentMap[playerCoords[0] + 1][playerCoords[1]].solidNorth == 0){
          playerCoords[0] += 1
          if (currentMap[playerCoords[0]][playerCoords[1]].solidWest == 0 && currentMap[playerCoords[0]][playerCoords[1] - 1].solidEast == 0){
            playerCoords[1] -= 1
          }
        }
        else if (currentMap[playerCoords[0]][playerCoords[1]].solidWest == 0 && currentMap[playerCoords[0]][playerCoords[1] - 1].solidEast == 0){
          playerCoords[1] -= 1
          if (currentMap[playerCoords[0]][playerCoords[1]].solidSouth == 0 && currentMap[playerCoords[0] + 1][playerCoords[1]].solidNorth == 0){
            playerCoords[0] += 1
          }
        }
        break; //move south-west case
      case 0:
        if (currentMap[playerCoords[0]][playerCoords[1]].solidWest == 0 && currentMap[playerCoords[0]][playerCoords[1] - 1].solidEast == 0){
          playerCoords[1] -= 1
        }
        break; //move west case
      case 1:
        if (currentMap[playerCoords[0]][playerCoords[1]].solidWest == 0 && currentMap[playerCoords[0]][playerCoords[1] - 1].solidEast == 0){
          playerCoords[1] -= 1
          if (currentMap[playerCoords[0]][playerCoords[1]].solidNorth == 0 && currentMap[playerCoords[0] - 1][playerCoords[1]].solidSouth == 0){
            playerCoords[0] -= 1
          }
        }
        else if (currentMap[playerCoords[0]][playerCoords[1]].solidNorth == 0 && currentMap[playerCoords[0] - 1][playerCoords[1]].solidSouth == 0){
          playerCoords[0] -= 1
          if (currentMap[playerCoords[0]][playerCoords[1]].solidWest == 0 && currentMap[playerCoords[0]][playerCoords[1] - 1].solidEast == 0){
            playerCoords[1] -= 1
          }
        }
        break; //move north-west case
    }
  }
  else if (keyIsDown(68)){
    switch (playerDirection) {
      case 6:
        if (currentMap[playerCoords[0]][playerCoords[1]].solidNorth == 0 && currentMap[playerCoords[0] - 1][playerCoords[1]].solidSouth == 0){
          playerCoords[0] -= 1
        } 
        break; //move north case
      case 7:
        if (currentMap[playerCoords[0]][playerCoords[1]].solidNorth == 0 && currentMap[playerCoords[0] - 1][playerCoords[1]].solidSouth == 0){
          playerCoords[0] -= 1
          if (currentMap[playerCoords[0]][playerCoords[1]].solidEast == 0 && currentMap[playerCoords[0]][playerCoords[1] + 1].solidWest == 0){
            playerCoords[1] += 1
          }
        }
        else if (currentMap[playerCoords[0]][playerCoords[1]].solidEast == 0 && currentMap[playerCoords[0]][playerCoords[1] + 1].solidWest == 0){
          playerCoords[1] += 1
          if (currentMap[playerCoords[0]][playerCoords[1]].solidNorth == 0 && currentMap[playerCoords[0] - 1][playerCoords[1]].solidSouth == 0){
            playerCoords[0] -= 1
          }
        }
        break; //move north-east case
      case 0:
        if (currentMap[playerCoords[0]][playerCoords[1]].solidEast == 0 && currentMap[playerCoords[0]][playerCoords[1] + 1].solidWest == 0){
          playerCoords[1] += 1
        }
        break; //move east case
      case 1:
        if (currentMap[playerCoords[0]][playerCoords[1]].solidEast == 0 && currentMap[playerCoords[0]][playerCoords[1] + 1].solidWest == 0){
          playerCoords[1] += 1
          if (currentMap[playerCoords[0]][playerCoords[1]].solidSouth == 0 && currentMap[playerCoords[0] + 1][playerCoords[1]].solidNorth == 0){
            playerCoords[0] += 1
          }
        }
        else if (currentMap[playerCoords[0]][playerCoords[1]].solidSouth == 0 && currentMap[playerCoords[0] + 1][playerCoords[1]].solidNorth == 0){
          playerCoords[0] += 1
          if (currentMap[playerCoords[0]][playerCoords[1]].solidEast == 0 && currentMap[playerCoords[0]][playerCoords[1] + 1].solidWest == 0){
            playerCoords[1] += 1
          }
        }
        break; //move south-east case
      case 2:
        if (currentMap[playerCoords[0]][playerCoords[1]].solidSouth == 0 && currentMap[playerCoords[0] + 1][playerCoords[1]].solidNorth == 0){
          playerCoords[0] += 1
        }
        break; //move south case
      case 3:
        if (currentMap[playerCoords[0]][playerCoords[1]].solidSouth == 0 && currentMap[playerCoords[0] + 1][playerCoords[1]].solidNorth == 0){
          playerCoords[0] += 1
          if (currentMap[playerCoords[0]][playerCoords[1]].solidWest == 0 && currentMap[playerCoords[0]][playerCoords[1] - 1].solidEast == 0){
            playerCoords[1] -= 1
          }
        }
        else if (currentMap[playerCoords[0]][playerCoords[1]].solidWest == 0 && currentMap[playerCoords[0]][playerCoords[1] - 1].solidEast == 0){
          playerCoords[1] -= 1
          if (currentMap[playerCoords[0]][playerCoords[1]].solidSouth == 0 && currentMap[playerCoords[0] + 1][playerCoords[1]].solidNorth == 0){
            playerCoords[0] += 1
          }
        }
        break; //move south-west case
      case 4:
        if (currentMap[playerCoords[0]][playerCoords[1]].solidWest == 0 && currentMap[playerCoords[0]][playerCoords[1] - 1].solidEast == 0){
          playerCoords[1] -= 1
        }
        break; //move west case
      case 5:
        if (currentMap[playerCoords[0]][playerCoords[1]].solidWest == 0 && currentMap[playerCoords[0]][playerCoords[1] - 1].solidEast == 0){
          playerCoords[1] -= 1
          if (currentMap[playerCoords[0]][playerCoords[1]].solidNorth == 0 && currentMap[playerCoords[0] - 1][playerCoords[1]].solidSouth == 0){
            playerCoords[0] -= 1
          }
        }
        else if (currentMap[playerCoords[0]][playerCoords[1]].solidNorth == 0 && currentMap[playerCoords[0] - 1][playerCoords[1]].solidSouth == 0){
          playerCoords[0] -= 1
          if (currentMap[playerCoords[0]][playerCoords[1]].solidWest == 0 && currentMap[playerCoords[0]][playerCoords[1] - 1].solidEast == 0){
            playerCoords[1] -= 1
          }
        }
        break; //move north-west case
    }
  }
}

//end of other gameplay functions

function setup(){
  angleMode(DEGREES)
  textAlign(CENTER, CENTER)
  canvas = createCanvas(1024, 576)//window.innerWidth * .75, window.innerWidth *.75/16*9)//896, 504)
  canvas.parent('sketch-holder')
  frameRate(5)
  strokeWeight(1)
}

function draw(){
  switch(gamePart) {
    case 0:
      background(0);
      fill(pureRed);
      textSize(height/10);
      text('GAME', width/3, height/10);
      rect(width/100, height/8, width/5, height/10);
      rect(width/100, 2 * height/8, width/5, height/10);
      fill(neutralGrey);
      text('START', mean([width/100, width/100 + width/5]), mean([height/8, height/8 + height/10, height/10 + height/10]));
      minimap = 1
      break;
    case 1: //loading a level
      background(0)
      currentMap = [[bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk],
                    [bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk],
                    [bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk],
                    [bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk],
                    [bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk],
                    [bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk],
                    [bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk],
                    [bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, fB, bk, bk, bk, fB, fB, bk, bk, bk, bk, bk, bk, bk, bk],
                    [bk, bk, bk, bk, bk, bk, bk, bk, fC, fC, bk, fC, fC, fC, fC, fC, fC, fB, bk, bk, bk, bk, bk, bk, bk],
                    [bk, bk, bk, bk, bk, bk, bk, bk, wW, fC, fC, fC, bk, bk, bk, bk, fC, bk, bk, bk, bk, bk, bk, bk, bk],
                    [bk, bk, bk, bk, bk, bk, bk, bk, wW, bk, fC, fC, fB, fB, bk, bk, fC, fB, bk, bk, bk, bk, bk, bk, bk],
                    [bk, bk, bk, bk, bk, bk, bk, bk, wW, bk, fB, fC, fC, sW, fB, fC, fC, bk, bk, bk, bk, bk, bk, bk, bk],
                    [bk, bk, bk, bk, bk, bk, bk, fB, fC, fC, fC, fC, eW, bk, bk, bk, fC, fB, bk, bk, bk, bk, bk, bk, bk],
                    [bk, bk, bk, bk, bk, bk, bk, bk, fC, wW, fB, fC, fC, nW, fC, fC, fC, bk, bk, bk, bk, bk, bk, bk, bk],
                    [bk, bk, bk, bk, bk, bk, bk, bk, eW, eW, bk, fC, fB, fB, fC, fC, bk, wW, bk, bk, bk, bk, bk, bk, bk],
                    [bk, bk, bk, bk, bk, bk, bk, bk, fC, fC, fC, fC, bk, bk, bk, fC, fC, bk, bk, bk, bk, bk, bk, bk, bk],
                    [bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, fB, fC, fC, sW, nW, wW, fC, fB, bk, bk, bk, bk, bk, bk, bk],
                    [bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk],
                    [bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk],
                    [bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk],
                    [bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk],
                    [bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk],
                    [bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk],
                    [bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk],
                    [bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk, bk]
                   ] //loads a map
      for (let i = 0; i < currentMap.length; i++){
        for (let j = 0; j < currentMap[i].length; j++){
          currentMap[i][j] = Object.assign({}, currentMap[i][j])
          currentMap[i][j].floorC = [random(127, 256), random(127, 256), random(0, 127)]
        }
      } //runs through the entire map and converts each block from references to prefabs to unique objects
      currentMap[12][13].northShinC = neutralGrey
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
      playerCoords = [12, 12]
      playerDirection = 0
      gamePart = 2
      textSize(30)
      break;
    case 2:
      background([127, 170, 255])
      turn()
      enviroRender()
      mapDraw()
      break;
  }
}

function mousePressed(){
  if (gamePart == 0){
    //if (mouseX > )
    gamePart = 1
  }
}