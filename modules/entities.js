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
          this.moveNorth()
          break; //this.move north case
        case 1:
          this.moveNorthEast()
          break; //this.move north-east case
        case 2:
          this.moveEast()
          break; //this.move east case
        case 3:
          this.moveSouthEast()
          break; //this.move south-east case
        case 4:
          this.moveSouth()
          break; //this.move south case
        case 5:
          this.moveSouthWest()
          break; //this.move south-west case
        case 6:
          this.moveWest()
          break; //this.move west case
        case 7:
          this.moveNorthWest()
          break; //this.move north-west case
      }
    }
    else if (keyIsDown(83)){
      switch (this.direction) {
        case 4:
          this.moveNorth()
          break; //this.move north case
        case 5:
          this.moveNorthEast()
          break; //this.move north-east case
        case 6:
          this.moveEast()
          break; //this.move east case
        case 7:
          this.moveSouthEast()
          break; //this.move south-east case
        case 0:
          this.moveSouth()
          break; //this.move south case
        case 1:
          this.moveSouthWest()
          break; //this.move south-west case
        case 2:
          this.moveWest()
          break; //this.move west case
        case 3:
          this.moveNorthWest()
          break; //this.move north-west case
      }
    }
    if (keyIsDown(65)){
      switch (this.direction) {
        case 2:
          this.moveNorth()
          break; //this.move north case
        case 3:
          this.moveNorthEast()
          break; //this.move north-east case
        case 4:
          this.moveEast()
          break; //this.move east case
        case 5:
          this.moveSouthEast()
          break; //this.move south-east case
        case 6:
          this.moveSouth()
          break; //this.move south case
        case 7:
          this.moveSouthWest()
          break; //this.move south-west case
        case 0:
          this.moveWest()
          break; //this.move west case
        case 1:
          this.moveNorthWest()
          break; //this.move north-west case
      }
    }
    else if (keyIsDown(68)){
      switch (this.direction) {
        case 6:
          this.moveNorth()
          break; //this.move north case
        case 7:
          this.moveNorthEast()
          break; //this.move north-east case
        case 0:
          this.moveEast()
          break; //this.move east case
        case 1:
          this.moveSouthEast()
          break; //this.move south-east case
        case 2:
          this.moveSouth()
          break; //this.move south case
        case 3:
          this.moveSouthWest()
          break; //this.move south-west case
        case 4:
          this.moveWest()
          break; //this.move west case
        case 5:
          this.moveNorthWest()
          break; //this.move north-west case
      }
    }
  }
}

class entity{
    constructor(x, y, {direction = 0, spriteSheet = devImp, spriteWidth = 42, spriteHeight = 61, solid = true}, renderWidth, renderHeight){
        this.x = x
        this.y = y
        this.spriteSheet = spriteSheet
        this.spriteWidth = spriteWidth
        this.spriteHeight = spriteHeight
        this.direction = direction
        this.solid = solid
        this.renderWidth = renderWidth
        this.renderHeight = renderHeight
    }
}

class enemy extends entity{
    constructor(x, y, {direction = 0, spriteSheet = devImp, spriteWidth = 42, spriteHeight = 61, walkFrames = 4, collHeight = 4, solid = true}, renderWidth, renderHeight){
        super(x, y, {direction: direction, spriteSheet: spriteSheet, spriteWidth: spriteWidth, spriteHeight: spriteHeight}, renderWidth, renderHeight)
        this.walkFrames = walkFrames
        this.animation = 'i'
        this.frame = 0
        this.collHeight = collHeight
        this.prevX = x
        this.prevY = y
    }
    turnRight(){
      this.direction += 1
      if (this.direction >= 8){
        this.direction = 0
      }
      this.frame += 1
      if (this.frame >= 4){this.frame = 0}
    }
    turnLeft(){
      this.direction -= 1
      if (this.direction <= -1){
        this.direction = 7
      }
      this.frame += 1
      if (this.frame >= 4){this.frame = 0}
    }
    
    moveNorth(){
      if(currentMap[this.y][this.x].solidNorth == 0 && currentMap[this.y - 1][this.x].solidSouth == 0){
        currentMap[this.y][this.x].hasEnemy = 0
        this.y -= 1
        currentMap[this.y][this.x].hasEnemy = 1
        currentMap[this.y][this.x].enemy = this
      }
      this.frame += 1
      if (this.frame >= 4){this.frame = 0}
    }
    moveEast(){
      if(currentMap[this.y][this.x].solidEast == 0 && currentMap[this.y][this.x + 1].solidWest == 0){
        currentMap[this.y][this.x].hasEnemy = 0
        this.x += 1
        currentMap[this.y][this.x].hasEnemy = 1
        currentMap[this.y][this.x].enemy = this
      }
      this.frame += 1
      if (this.frame >= 4){this.frame = 0}
    }
    moveSouth(){
      if(currentMap[this.y][this.x].solidSouth == 0 && currentMap[this.y + 1][this.x].solidNorth == 0){
        currentMap[this.y][this.x].hasEnemy = 0
        this.y += 1
        currentMap[this.y][this.x].hasEnemy = 1
        currentMap[this.y][this.x].enemy = this
      }
      this.frame += 1
      if (this.frame >= 4){this.frame = 0}
    }
    moveWest(){
      if(currentMap[this.y][this.x].solidWest == 0 && currentMap[this.y][this.x - 1].solidEast == 0){
        currentMap[this.y][this.x].hasEnemy = 0
        this.x -= 1
        currentMap[this.y][this.x].hasEnemy = 1
        currentMap[this.y][this.x].enemy = this
      }
      this.frame += 1
      if (this.frame >= 4){this.frame = 0}
    }

    drawMe(x, y, ceiling){
      let maxHpcnt = (y - ceiling) * this.renderHeight / 1152 * 0.001
      let relDir = this.direction - player.direction
      if (relDir < 0){
        relDir += 8
      }
      switch (this.animation){
        case 'm':
          image(this.spriteSheet, //image to be used
                x - this.renderWidth / 2 * maxHpcnt, y - this.renderHeight * maxHpcnt, //where to place top-left corner
                this.renderWidth * maxHpcnt, this.renderHeight * maxHpcnt, //how big to draw
                Math.floor(this.frame) * this.spriteWidth, relDir * this.spriteHeight, //which part of spritesheet to take
                this.spriteWidth, this.spriteHeight) //how big the sprite being used is
          break;
        case 'i':
          image(this.spriteSheet, //image to be used
                x - this.renderWidth / 2 * maxHpcnt, y - this.renderHeight * maxHpcnt, //where to place top-left corner
                this.renderWidth * maxHpcnt, this.renderHeight * maxHpcnt, //how big to draw
                (relDir+ 5) * this.spriteWidth, 7 * this.spriteHeight, //which part of spritesheet to take
                this.spriteWidth, this.spriteHeight) //how big the sprite being used is
          break;
      }
    }
}