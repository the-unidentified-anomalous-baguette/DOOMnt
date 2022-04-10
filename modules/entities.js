class playerClass{
    constructor(coords, direction){
        this.coords = coords
        this.direction = direction
    }
    moveNorth(){
    if (currentMap[this.coords[0]][this.coords[1]].solidNorth == 0 && currentMap[this.coords[0] - 1][this.coords[1]].solidSouth == 0){
      this.coords[0] -= 1
      walkingSounds()
    } 
  };moveNorthEast(){
    if (currentMap[this.coords[0]][this.coords[1]].solidNorth == 0 && currentMap[this.coords[0] - 1][this.coords[1]].solidSouth == 0){
      this.coords[0] -= 1
      walkingSounds()
      if (currentMap[this.coords[0]][this.coords[1]].solidEast == 0 && currentMap[this.coords[0]][this.coords[1] + 1].solidWest == 0){
        this.coords[1] += 1
      }
    }
    else if (currentMap[this.coords[0]][this.coords[1]].solidEast == 0 && currentMap[this.coords[0]][this.coords[1] + 1].solidWest == 0){
      this.coords[1] += 1
      walkingSounds()
      if (currentMap[this.coords[0]][this.coords[1]].solidNorth == 0 && currentMap[this.coords[0] - 1][this.coords[1]].solidSouth == 0){
        this.coords[0] -= 1
      }
    }
  };moveEast(){
    if (currentMap[this.coords[0]][this.coords[1]].solidEast == 0 && currentMap[this.coords[0]][this.coords[1] + 1].solidWest == 0){
      this.coords[1] += 1
      walkingSounds()
    }
  };moveSouthEast(){
    if (currentMap[this.coords[0]][this.coords[1]].solidEast == 0 && currentMap[this.coords[0]][this.coords[1] + 1].solidWest == 0){
      this.coords[1] += 1
      walkingSounds()
      if (currentMap[this.coords[0]][this.coords[1]].solidSouth == 0 && currentMap[this.coords[0] + 1][this.coords[1]].solidNorth == 0){
        this.coords[0] += 1
      }
    }
    else if (currentMap[this.coords[0]][this.coords[1]].solidSouth == 0 && currentMap[this.coords[0] + 1][this.coords[1]].solidNorth == 0){
      this.coords[0] += 1
      walkingSounds()
      if (currentMap[this.coords[0]][this.coords[1]].solidEast == 0 && currentMap[this.coords[0]][this.coords[1] + 1].solidWest == 0){
        this.coords[1] += 1
      }
    }
  };moveSouth(){
    if (currentMap[this.coords[0]][this.coords[1]].solidSouth == 0 && currentMap[this.coords[0] + 1][this.coords[1]].solidNorth == 0){
      this.coords[0] += 1
      walkingSounds()
    }
  };moveSouthWest(){
    if (currentMap[this.coords[0]][this.coords[1]].solidSouth == 0 && currentMap[this.coords[0] + 1][this.coords[1]].solidNorth == 0){
      this.coords[0] += 1
      walkingSounds()
      if (currentMap[this.coords[0]][this.coords[1]].solidWest == 0 && currentMap[this.coords[0]][this.coords[1] - 1].solidEast == 0){
        this.coords[1] -= 1
      }
    }
    else if (currentMap[this.coords[0]][this.coords[1]].solidWest == 0 && currentMap[this.coords[0]][this.coords[1] - 1].solidEast == 0){
      this.coords[1] -= 1
      walkingSounds()
      if (currentMap[this.coords[0]][this.coords[1]].solidSouth == 0 && currentMap[this.coords[0] + 1][this.coords[1]].solidNorth == 0){
        this.coords[0] += 1
      }
    }
  };moveWest(){
    if (currentMap[this.coords[0]][this.coords[1]].solidWest == 0 && currentMap[this.coords[0]][this.coords[1] - 1].solidEast == 0){
      this.coords[1] -= 1
      walkingSounds()
    }
  };moveNorthWest(){
    if (currentMap[this.coords[0]][this.coords[1]].solidWest == 0 && currentMap[this.coords[0]][this.coords[1] - 1].solidEast == 0){
      this.coords[1] -= 1
      walkingSounds()
      if (currentMap[this.coords[0]][this.coords[1]].solidNorth == 0 && currentMap[this.coords[0] - 1][this.coords[1]].solidSouth == 0){
        this.coords[0] -= 1
      }
    }
    else if (currentMap[this.coords[0]][this.coords[1]].solidNorth == 0 && currentMap[this.coords[0] - 1][this.coords[1]].solidSouth == 0){
      this.coords[0] -= 1
      walkingSounds()
      if (currentMap[this.coords[0]][this.coords[1]].solidWest == 0 && currentMap[this.coords[0]][this.coords[1] - 1].solidEast == 0){
        this.coords[1] -= 1
      }
    }
  };
  turn(){
    if (keyIsDown(LEFT_ARROW)) {
      this.direction -= 1
      if (this.direction == -1){
        this.direction = 7
      }
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.direction += 1
      if (this.direction == 8){
        this.direction = 0
      }
    }
    if (keyIsDown(87)){
      switch (this.direction) {
        case 0:
          moveNorth()
          break; //move north case
        case 1:
          moveNorthEast()
          break; //move north-east case
        case 2:
          moveEast()
          break; //move east case
        case 3:
          moveSouthEast()
          break; //move south-east case
        case 4:
          moveSouth()
          break; //move south case
        case 5:
          moveSouthWest()
          break; //move south-west case
        case 6:
          moveWest()
          break; //move west case
        case 7:
          moveNorthWest()
          break; //move north-west case
      }
    }
    else if (keyIsDown(83)){
      switch (this.direction) {
        case 4:
          moveNorth()
          break; //move north case
        case 5:
          moveNorthEast()
          break; //move north-east case
        case 6:
          moveEast()
          break; //move east case
        case 7:
          moveSouthEast()
          break; //move south-east case
        case 0:
          moveSouth()
          break; //move south case
        case 1:
          moveSouthWest()
          break; //move south-west case
        case 2:
          moveWest()
          break; //move west case
        case 3:
          moveNorthWest()
          break; //move north-west case
      }
    }
    if (keyIsDown(65)){
      switch (this.direction) {
        case 2:
          moveNorth()
          break; //move north case
        case 3:
          moveNorthEast()
          break; //move north-east case
        case 4:
          moveEast()
          break; //move east case
        case 5:
          moveSouthEast()
          break; //move south-east case
        case 6:
          moveSouth()
          break; //move south case
        case 7:
          moveSouthWest()
          break; //move south-west case
        case 0:
          moveWest()
          break; //move west case
        case 1:
          moveNorthWest()
          break; //move north-west case
      }
    }
    else if (keyIsDown(68)){
      switch (this.direction) {
        case 6:
          moveNorth()
          break; //move north case
        case 7:
          moveNorthEast()
          break; //move north-east case
        case 0:
          moveEast()
          break; //move east case
        case 1:
          moveSouthEast()
          break; //move south-east case
        case 2:
          moveSouth()
          break; //move south case
        case 3:
          moveSouthWest()
          break; //move south-west case
        case 4:
          moveWest()
          break; //move west case
        case 5:
          moveNorthWest()
          break; //move north-west case
      }
    }
  }
}

class entity{
    constructor(x, y, {direction = 0, spriteSheet = devImp, spriteWidth = 42, spriteHeight = 61, solid = true}, renderHeight){
        this.x = x
        this.y = y
        this.spriteSheet = spriteSheet
        this.direction = direction
        this.solid = solid
        this.renderHeight = renderHeight
    }
}

class enemy extends entity{
    constructor(x, y, {direction = 0, spriteSheet = devImp, spriteWidth = 42, spriteHeight = 61, walkFrames = 4, collHeight = 4, solid = true}, renderHeight){
        super(x, y, {direction: direction, spriteSheet: spriteSheet, spriteWidth: spriteWidth, spriteHeight: spriteHeight}, renderHeight)
        this.walkFrames = walkFrames
        this.animation = 'i'
        this.frame = 0
        this.collHeight = collHeight
        this.prevX = x
        this.prevY = y
    }

    drawMe(x, y, playerDist){
        image(this.spriteSheet, 512, 288, 42, 61, Math.floor(this.frame) * 42, Math.floor(this.direction) * 61, 42, 61)
        this.frame += .25
        this.direction += .25
        if (this.frame >= 4){this.frame = 0}
        if (this.direction >= 8){this.direction = 0}
    }
}