class weapon{
  constructor(firingType, spriteSheet, cooldown, damage, frame, amType){
    this.firingType = firingType
    this.spriteSheet = spriteSheet
    this.cooldown = cooldown
    this.damage = damage
    this.isShooting = 0
    this.frame = frame
    this.amType = amType
  }

  render(){
    image(this.spriteSheet, 
      0, 0, 
      1024, 576, 
      1024 * this.frame, 576 * this.isShooting, 
      1024, 576)
    if (this.isShooting){
      this.frame += 1
      if (this.frame >= this.cooldown){
        this.frame = 0
        this.isShooting = 0
      }
    }
  }

  attack(){
    if (this.isShooting == 0 && player.inv[this.amType] > 0){
      this.isShooting = 1
      this.frame = 0
      player.inv[this.amType] -= 1
      switch (this.firingType){
        case 'basic':
          this.basicFiring()
          break
      }
    }
  }

  basicFiring(){
    if (currentMap[player.coords[0]][player.coords[1]].hasEnemy == 1){
      currentMap[player.coords[0]][player.coords[1]].enemy.hit('ballistic')
    }
    else {
      switch (player.direction){
        case 0:
          if (currentMap[player.coords[0]][player.coords[1]].northMid == 0 && currentMap[player.coords[0] - 1][player.coords[1]].southMid == 0){
            if (currentMap[player.coords[0] - 1][player.coords[1]].hasEnemy == 1){
              currentMap[player.coords[0] - 1][player.coords[1]].enemy.hit('ballistic')
            }
            else if (currentMap[player.coords[0] - 1][player.coords[1]].northMid == 0 && currentMap[player.coords[0] - 2][player.coords[1]].southMid == 0 && currentMap[player.coords[0] - 2][player.coords[1]].hasEnemy == 1){
              currentMap[player.coords[0] - 2][player.coords[1]].enemy.hit('ballistic')
            }
          }
          break;
        case 1:
          if (currentMap[player.coords[0]][player.coords[1]].northMid == 0 && currentMap[player.coords[0] - 1][player.coords[1]].southMid == 0 && 
              currentMap[player.coords[0]][player.coords[1]].eastMid == 0 && currentMap[player.coords[0]][player.coords[1] + 1].westMid == 0 && 
              currentMap[player.coords[0]][player.coords[1] + 1].northMid == 0 && currentMap[player.coords[0] - 1][player.coords[1] + 1].southMid == 0 &&
              currentMap[player.coords[0] - 1][player.coords[1]].eastMid == 0 && currentMap[player.coords[0] - 1][player.coords[1] + 1].westMid == 0){
            if (currentMap[player.coords[0] - 1][player.coords[1] + 1].hasEnemy == 1){
              currentMap[player.coords[0] - 1][player.coords[1] + 1].enemy.hit('ballistic')
            }
            else if (currentMap[player.coords[0] - 1][player.coords[1] + 1].northMid == 0 && currentMap[player.coords[0] - 2][player.coords[1]+ 1].southMid == 0 && 
                    currentMap[player.coords[0] - 1][player.coords[1] + 1].eastMid == 0 && currentMap[player.coords[0] - 1][player.coords[1] + 2].westMid == 0 && 
                    currentMap[player.coords[0] - 1][player.coords[1] + 2].northMid == 0 && currentMap[player.coords[0] - 2][player.coords[1] + 2].southMid == 0&&
                    currentMap[player.coords[0] - 2][player.coords[1] + 1].eastMid == 0 && currentMap[player.coords[0] - 2][player.coords[1] + 2].westMid == 0 &&
                    currentMap[player.coords[0] - 2][player.coords[1] + 2].hasEnemy == 1){
              currentMap[player.coords[0] - 2][player.coords[1] + 2].enemy.hit('ballistic')
            }
          }
          break;
        case 2:
          if (currentMap[player.coords[0]][player.coords[1]].eastMid == 0 && currentMap[player.coords[0]][player.coords[1] + 1].westMid == 0){
            if (currentMap[player.coords[0]][player.coords[1] + 1].hasEnemy == 1){
              currentMap[player.coords[0]][player.coords[1] + 1].enemy.hit('ballistic')
            }
            else if (currentMap[player.coords[0]][player.coords[1] + 1].eastMid == 0 && currentMap[player.coords[0]][player.coords[1] + 2].westMid == 0 && currentMap[player.coords[0]][player.coords[1] + 2].hasEnemy == 1){
              currentMap[player.coords[0]][player.coords[1] + 2].enemy.hit('ballistic')
            }
          }
          break;
        case 3:
          if (currentMap[player.coords[0]][player.coords[1]].eastMid == 0 && currentMap[player.coords[0]][player.coords[1] + 1].westMid == 0 && 
            currentMap[player.coords[0]][player.coords[1]].southMid == 0 && currentMap[player.coords[0] + 1][player.coords[1]].northMid == 0 && 
            currentMap[player.coords[0] + 1][player.coords[1]].eastMid == 0 && currentMap[player.coords[0] + 1][player.coords[1] + 1].westMid == 0 &&
            currentMap[player.coords[0]][player.coords[1] + 1].southMid == 0 && currentMap[player.coords[0] + 1][player.coords[1] + 1].northMid == 0){
            if (currentMap[player.coords[0] + 1][player.coords[1] + 1].hasEnemy == 1){
              currentMap[player.coords[0] + 1][player.coords[1] + 1].enemy.hit('ballistic')
            }
            else if (currentMap[player.coords[0] + 1][player.coords[1] + 1].eastMid == 0 && currentMap[player.coords[0] + 1][player.coords[1] + 2].westMid == 0 && 
                    currentMap[player.coords[0] + 1][player.coords[1] + 1].southMid == 0 && currentMap[player.coords[0] + 2][player.coords[1] + 1].northMid == 0 && 
                    currentMap[player.coords[0] + 2][player.coords[1] + 1].eastMid == 0 && currentMap[player.coords[0] + 2][player.coords[1] + 2].westMid == 0&&
                    currentMap[player.coords[0] + 1][player.coords[1] + 2].southMid == 0 && currentMap[player.coords[0] + 2][player.coords[1] + 2].northMid == 0 &&
                    currentMap[player.coords[0] + 2][player.coords[1] + 2].hasEnemy == 1){
              currentMap[player.coords[0] + 2][player.coords[1] + 2].enemy.hit('ballistic')
            }
          }
          break;
        case 4:
          if (currentMap[player.coords[0]][player.coords[1]].southMid == 0 && currentMap[player.coords[0] + 1][player.coords[1]].northMid == 0){
            if (currentMap[player.coords[0] + 1][player.coords[1]].hasEnemy == 1){
              currentMap[player.coords[0] + 1][player.coords[1]].enemy.hit('ballistic')
            }
            else if (currentMap[player.coords[0] + 1][player.coords[1]].southMid == 0 && currentMap[player.coords[0] + 2][player.coords[1]].northMid == 0 && currentMap[player.coords[0] + 2][player.coords[1]].hasEnemy == 1){
              currentMap[player.coords[0] + 2][player.coords[1]].enemy.hit('ballistic')
            }
          }
          break;
        case 5:
          if (currentMap[player.coords[0]][player.coords[1]].southMid == 0 && currentMap[player.coords[0] + 1][player.coords[1]].northMid == 0 && 
            currentMap[player.coords[0]][player.coords[1]].westMid == 0 && currentMap[player.coords[0]][player.coords[1] - 1].eastMid == 0 && 
            currentMap[player.coords[0]][player.coords[1] - 1].southMid == 0 && currentMap[player.coords[0] + 1][player.coords[1] - 1].northMid == 0 &&
            currentMap[player.coords[0] + 1][player.coords[1]].westMid == 0 && currentMap[player.coords[0] + 1][player.coords[1] - 1].eastMid == 0){
            if (currentMap[player.coords[0] + 1][player.coords[1] - 1].hasEnemy == 1){
              currentMap[player.coords[0] + 1][player.coords[1] - 1].enemy.hit('ballistic')
            }
            else if (currentMap[player.coords[0] + 1][player.coords[1] - 1].southMid == 0 && currentMap[player.coords[0] + 2][player.coords[1] - 1].northMid == 0 && 
                    currentMap[player.coords[0] + 1][player.coords[1] - 1].westMid == 0 && currentMap[player.coords[0] + 1][player.coords[1] - 2].eastMid == 0 && 
                    currentMap[player.coords[0] + 1][player.coords[1] - 2].southMid == 0 && currentMap[player.coords[0] + 2][player.coords[1] - 2].northMid == 0&&
                    currentMap[player.coords[0] + 2][player.coords[1] - 1].westMid == 0 && currentMap[player.coords[0] + 2][player.coords[1] - 2].eastMid == 0 &&
                    currentMap[player.coords[0] + 2][player.coords[1] - 2].hasEnemy == 1){
              currentMap[player.coords[0] + 2][player.coords[1] - 2].enemy.hit('ballistic')
            }
          }
          break;
        case 6:
          if (currentMap[player.coords[0]][player.coords[1]].westMid == 0 && currentMap[player.coords[0]][player.coords[1] - 1].eastMid == 0){
            if (currentMap[player.coords[0]][player.coords[1] - 1].hasEnemy == 1){
              currentMap[player.coords[0]][player.coords[1] - 1].enemy.hit('ballistic')
            }
            else if (currentMap[player.coords[0]][player.coords[1] - 1].westMid == 0 && currentMap[player.coords[0]][player.coords[1] - 2].eastMid == 0 && currentMap[player.coords[0]][player.coords[1] - 2].hasEnemy == 1){
              currentMap[player.coords[0]][player.coords[1] - 2].enemy.hit('ballistic')
            }
          }
          break;
        case 7:
          if (currentMap[player.coords[0]][player.coords[1]].westMid == 0 && currentMap[player.coords[0]][player.coords[1] - 1].eastMid == 0 && 
            currentMap[player.coords[0]][player.coords[1]].northMid == 0 && currentMap[player.coords[0] - 1][player.coords[1]].southMid == 0 && 
            currentMap[player.coords[0] - 1][player.coords[1]].westMid == 0 && currentMap[player.coords[0] - 1][player.coords[1] - 1].eastMid == 0 &&
            currentMap[player.coords[0]][player.coords[1] - 1].northMid == 0 && currentMap[player.coords[0] - 1][player.coords[1] - 1].southMid == 0){
            if (currentMap[player.coords[0] - 1][player.coords[1] - 1].hasEnemy == 1){
              currentMap[player.coords[0] - 1][player.coords[1] - 1].enemy.hit('ballistic')
            }
            else if (currentMap[player.coords[0] - 1][player.coords[1] - 1].westMid == 0 && currentMap[player.coords[0] - 1][player.coords[1] - 2].eastMid == 0 && 
                    currentMap[player.coords[0] - 1][player.coords[1] - 1].northMid == 0 && currentMap[player.coords[0] - 2][player.coords[1] - 1].southMid == 0 && 
                    currentMap[player.coords[0] - 2][player.coords[1] - 1].westMid == 0 && currentMap[player.coords[0] - 2][player.coords[1] - 2].eastMid == 0&&
                    currentMap[player.coords[0] - 1][player.coords[1] - 2].northMid == 0 && currentMap[player.coords[0] - 2][player.coords[1] - 2].southMid == 0 &&
                    currentMap[player.coords[0] - 2][player.coords[1] - 2].hasEnemy == 1){
              currentMap[player.coords[0] - 2][player.coords[1] - 2].enemy.hit('ballistic')
            }
          }
          break;
      }
    }
  }
}

class playerClass{
    constructor(coords, direction, equipped, {inv = [5], hp = 6}){
        this.coords = coords
        this.direction = direction
        this.equipped = equipped
        this.inv = inv
        this.hp = hp
    }

    eqpdCalc(){
      if (!this.equipped.isShooting){
        this.equipped.frame += 1
        if (this.equipped.frame == 4){
          this.equipped.frame = 0
        }
      }
    }

    moveNorth(){
      if (isMoveValid(this.coords, 'north')){
        this.coords[0] -= 1
        walkingSounds()
        this.eqpdCalc()
    } 
  };moveNorthEast(){
    if (isMoveValid(this.coords, 'north')){
      this.coords[0] -= 1
      walkingSounds()
      this.eqpdCalc()
      if (isMoveValid(this.coords, 'east')){
        this.coords[1] += 1
      }
    }
    else if (isMoveValid(this.coords, 'east')){
      this.coords[1] += 1
      walkingSounds()
      this.eqpdCalc()
      if (isMoveValid(this.coords, 'north')){
        this.coords[0] -= 1
      }
    }
  };moveEast(){
    if (isMoveValid(this.coords, 'east')){
      this.coords[1] += 1
      walkingSounds()
      this.eqpdCalc()
    }
  };moveSouthEast(){
    if (isMoveValid(this.coords, 'east')){
      this.coords[1] += 1
      walkingSounds()
      this.eqpdCalc()
      if (isMoveValid(this.coords, 'south')){
        this.coords[0] += 1
      }
    }
    else if (isMoveValid(this.coords, 'south')){
      this.coords[0] += 1
      walkingSounds()
      this.eqpdCalc()
      if (isMoveValid(this.coords, 'east')){
        this.coords[1] += 1
      }
    }
  };moveSouth(){
    if (isMoveValid(this.coords, 'south')){
      this.coords[0] += 1
      walkingSounds()
      this.eqpdCalc()
    }
  };moveSouthWest(){
    if (isMoveValid(this.coords, 'south')){
      this.coords[0] += 1
      walkingSounds()
      this.eqpdCalc()
      if (isMoveValid(this.coords, 'west')){
        this.coords[1] -= 1
      }
    }
    else if (isMoveValid(this.coords, 'west')){
      this.coords[1] -= 1
      walkingSounds()
      this.eqpdCalc()
      if (isMoveValid(this.coords, 'south')){
        this.coords[0] += 1
      }
    }
  };moveWest(){
    if (isMoveValid(this.coords, 'west')){
      this.coords[1] -= 1
      walkingSounds()
      this.eqpdCalc()
    }
  };moveNorthWest(){
    if (isMoveValid(this.coords, 'west')){
      this.coords[1] -= 1
      walkingSounds()
      this.eqpdCalc()
      if (isMoveValid(this.coords, 'north')){
        this.coords[0] -= 1
      }
    }
    else if (isMoveValid(this.coords, 'north')){
      this.coords[0] -= 1
      walkingSounds()
      this.eqpdCalc()
      if (isMoveValid(this.coords, 'west')){
        this.coords[1] -= 1
      }
    }
  };
  turn(){
    if (movedX < -1) {
      this.direction -= 1
      if (this.direction == -1){
        this.direction = 7
      }
    }
    if (movedX > 1) {
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
    if (currentMap[this.coords[0]][this.coords[1]].hasProp == true){
      currentMap[this.coords[0]][this.coords[1]].prop.loot()
    }
  }
}

class entity{
  constructor(x, y, {direction = 0, spriteSheet = impSs, spriteWidth = 42, spriteHeight = 61, solid = true, xFrame = 0, yFrame = 0, animation = 'i', inv = [0]}, renderWidth, renderHeight){
    this.x = x
    this.y = y
    this.spriteSheet = spriteSheet
    this.spriteWidth = spriteWidth
    this.spriteHeight = spriteHeight
    this.direction = direction
    this.solid = solid
    this.renderWidth = renderWidth
    this.renderHeight = renderHeight
    this.animation = animation
    this.xFrame = xFrame
    this.yFrame = yFrame
    this.inv = inv
    this.lootable = false
  }

  drawMe(x, y, ceiling){
    let maxHpcnt = (y - ceiling) * this.renderHeight / 1152 * 0.001
    let relDir = this.direction - player.direction
    if (relDir < 0){
      relDir += 8
    }
    switch(this.animation){
      case 'i':
        image(this.spriteSheet, //image to be used
              x - this.renderWidth / 2 * maxHpcnt, y - this.renderHeight * maxHpcnt, //where to place top-left corner
              this.renderWidth * maxHpcnt, this.renderHeight * maxHpcnt, //how big to draw
              this.spriteWidth, relDir * this.spriteHeight, //which part of spritesheet to take
              this.spriteWidth, this.spriteHeight) //how big the sprite being used is
        break;
      case 'c':
        image(this.spriteSheet,
              x - this.renderWidth / 2 * maxHpcnt, y - this.renderHeight * maxHpcnt,
              this.renderWidth * maxHpcnt, this.renderHeight * maxHpcnt,
              this.xFrame * this.spriteWidth, this.yFrame * this.spriteHeight,
              this.spriteWidth, this.spriteHeight)
    }
  }

  loot(){
    if (this.lootable == true){
      for (let i = 0; i < this.inv.length; i++){
        player.inv[i] += this.inv[i]
        currentMap[this.y][this.x].hasProp = 0
      }
    }
  }
}

class enemy extends entity{
  constructor(x, y, hp, damage, {direction = 0, spriteSheet = impSs, spriteWidth = 42, spriteHeight = 61, walkFrames = 4, collHeight = 4, activeArea = [0, 0, 0, 0]}, renderWidth, renderHeight){
      super(x, y, {direction: direction, spriteSheet: spriteSheet, spriteWidth: spriteWidth, spriteHeight: spriteHeight, solid: true}, renderWidth, renderHeight)
      this.hp = hp
      this.damage = damage
      this.walkFrames = walkFrames
      this.animation = 'i'
      this.frame = 0
      this.collHeight = collHeight
      this.prevX = x
      this.prevY = y
      this.activeArea = activeArea
      this.path = [this.noMove]
      this.alive = true
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
  facePlayer(){
    let relDir = this.direction - player.direction
    if (relDir < 0){
      relDir += 8
    }
    if (relDir > 4){
      this.turnLeft()
    }
    else if (relDir < 4){
      this.turnRight()
    }
  }
  
  moveNorth(){
    if (this.direction > 4){
      this.turnRight()
    }
    else if (this.direction > 0){
      this.turnLeft()
    }
    else if (isMoveValid([this.y, this.x], 'north') && this.direction == 0){
      currentMap[this.y][this.x].hasEnemy = 0
      this.y -= 1
      currentMap[this.y][this.x].hasEnemy = 1
      currentMap[this.y][this.x].enemy = this
      this.frame += 1
      if (this.frame >= 4){this.frame = 0}
      return true
    }
    return false
  }
  moveNorthEast(){
    if (this.direction > 5 || this.direction < 1){
      this.turnRight()
    }
    else if (this.direction > 1){
      this.turnLeft()
    }
    else if (isMoveValid([this.y, this.x], 'north') && isMoveValid([this.y, this.x], 'east') && isMoveValid([this.y, this.x + 1], 'north') && isMoveValid([this.y - 1, this.x], 'east') && this.direction == 1){
      currentMap[this.y][this.x].hasEnemy = 0
      this.y -= 1
      this.x += 1
      currentMap[this.y][this.x].hasEnemy = 1
      currentMap[this.y][this.x].enemy = this
      this.frame += 1
      if (this.frame >= 4){this.frame = 0}
      return true
    }
    return false
  }
  moveEast(){
    if (this.direction > 6 || this.direction < 2){
      this.turnRight()
    }
    else if (this.direction > 2){
      this.turnLeft()
    }
    else if (isMoveValid([this.y, this.x], 'east') && this.direction == 2){
      currentMap[this.y][this.x].hasEnemy = 0
      this.x += 1
      currentMap[this.y][this.x].hasEnemy = 1
      currentMap[this.y][this.x].enemy = this
      this.frame += 1
      if (this.frame >= 4){this.frame = 0}
      return true
    }
    return false
  }
  moveSouthEast(){
    if (this.direction == 7 || this.direction < 3){
      this.turnRight()
    }
    else if (this.direction > 3){
      this.turnLeft()
    }
    else if (isMoveValid([this.y, this.x], 'south') && isMoveValid([this.y, this.x], 'east') && isMoveValid([this.y, this.x + 1], 'south') && isMoveValid([this.y + 1, this.x], 'east') && this.direction == 3){
      currentMap[this.y][this.x].hasEnemy = 0
      this.y += 1
      this.x += 1
      currentMap[this.y][this.x].hasEnemy = 1
      currentMap[this.y][this.x].enemy = this
      this.frame += 1
      if (this.frame >= 4){this.frame = 0}
      return true
    }
    return false
  }
  moveSouth(){
    if (this.direction < 4){
      this.turnRight()
    }
    else if (this.direction > 4){
      this.turnLeft()
    }
    else if (isMoveValid([this.y, this.x], 'south') && this.direction == 4){
      currentMap[this.y][this.x].hasEnemy = 0
      this.y += 1
      currentMap[this.y][this.x].hasEnemy = 1
      currentMap[this.y][this.x].enemy = this
      this.frame += 1
      if (this.frame >= 4){this.frame = 0}
      return true
    }
    return false
  }
  moveSouthWest(){
    if (this.direction < 5 && this.direction > 0){
      this.turnRight()
    }
    else if (this.direction > 5 || this.direction < 1){
      this.turnLeft()
    }
    else if (isMoveValid([this.y, this.x], 'south') && isMoveValid([this.y, this.x], 'west') && isMoveValid([this.y, this.x - 1], 'south') && isMoveValid([this.y + 1, this.x], 'west') && this.direction == 5){
      currentMap[this.y][this.x].hasEnemy = 0
      this.y += 1
      this.x -= 1
      currentMap[this.y][this.x].hasEnemy = 1
      currentMap[this.y][this.x].enemy = this
      this.frame += 1
      if (this.frame >= 4){this.frame = 0}
      return true
    }
    return false
  }
  moveWest(){
    if (this.direction < 6 && this.direction >= 3){
      this.turnRight()
    }
    else if (this.direction > 6 || this.direction < 3){
      this.turnLeft()
    }
    else if (isMoveValid([this.y, this.x], 'west') && this.direction == 6){
      currentMap[this.y][this.x].hasEnemy = 0
      this.x -= 1
      currentMap[this.y][this.x].hasEnemy = 1
      currentMap[this.y][this.x].enemy = this
      this.frame += 1
      if (this.frame >= 4){this.frame = 0}
      return true
    }
    return false
  }
  moveNorthWest(){
    if (this.direction < 7 && this.direction > 3){
      this.turnRight()
    }
    else if (this.direction < 4){
      this.turnLeft()
    }
    else if (isMoveValid([this.y, this.x], 'north') && isMoveValid([this.y, this.x], 'west') && isMoveValid([this.y, this.x - 1], 'north') && isMoveValid([this.y - 1, this.x], 'west') && this.direction == 7){
      currentMap[this.y][this.x].hasEnemy = 0
      this.y -= 1
      this.x -= 1
      currentMap[this.y][this.x].hasEnemy = 1
      currentMap[this.y][this.x].enemy = this
      this.frame += 1
      if (this.frame >= 4){this.frame = 0}
      return true
    }
    return false
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
              (relDir + 5) * this.spriteWidth, 7 * this.spriteHeight, //which part of spritesheet to take
              this.spriteWidth, this.spriteHeight) //how big the sprite being used is
        break;
      case 'h':
        image(this.spriteSheet, //image to be used
              x - this.renderWidth / 2 * maxHpcnt, y - this.renderHeight * maxHpcnt, //where to place top-left corner
              this.renderWidth * maxHpcnt, this.renderHeight * maxHpcnt, //how big to draw
              4 * this.spriteWidth, relDir * this.spriteHeight, //which part of spritesheet to take
              this.spriteWidth, this.spriteHeight) //how big the sprite being used is
        this.animation = 'i'
        break;
      case 'db':
        image(this.spriteSheet, //image to be used
              x - this.renderWidth / 2 * maxHpcnt, y - this.renderHeight * maxHpcnt, //where to place top-left corner
              this.renderWidth * maxHpcnt, this.renderHeight * maxHpcnt, //how big to draw
              (this.frame + 5) * this.spriteWidth, 0, //which part of spritesheet to take
              this.spriteWidth, this.spriteHeight) //how big the sprite being used is
        if (this.frame < 2){
          this.frame += 1
        }
        else {
          currentMap[this.y][this.x].hasEnemy = 0
          currentMap[this.y][this.x].prop = new entity(this.x, this.y, {direction: this.direction, spriteSheet: this.spriteSheet, spriteWidth: this.spriteWidth, spriteHeight: this.spriteHeight, solid: false, xFrame: 7, yFrame: 0, animation: 'c'}, this.renderWidth, this.renderHeight)
          currentMap[this.y][this.x].hasProp = 1
        }
        break;
      case 'dm':
        image(this.spriteSheet, //image to be used
              x - this.renderWidth / 2 * maxHpcnt, y - this.renderHeight * maxHpcnt, //where to place top-left corner
              this.renderWidth * maxHpcnt, this.renderHeight * maxHpcnt, //how big to draw
              (this.frame + 5) * this.spriteWidth, this.spriteHeight, //which part of spritesheet to take
              this.spriteWidth, this.spriteHeight) //how big the sprite being used is
        if (this.frame < 3){
          this.frame += 1
        }
        else {
          currentMap[this.y][this.x].hasEnemy = 0
          currentMap[this.y][this.x].prop = new entity(this.x, this.y, {direction: this.direction, spriteSheet: this.spriteSheet, spriteWidth: this.spriteWidth, spriteHeight: this.spriteHeight, solid: false, xFrame: 8, yFrame: 1, animation: 'c'}, this.renderWidth, this.renderHeight)
          currentMap[this.y][this.x].hasProp = 1
        }
        break;
      case 'de':
        image(this.spriteSheet, //image to be used
              x - this.renderWidth / 2 * maxHpcnt, y - this.renderHeight * maxHpcnt, //where to place top-left corner
              this.renderWidth * maxHpcnt, this.renderHeight * maxHpcnt, //how big to draw
              (this.frame + 5) * this.spriteWidth, 2 * this.spriteHeight, //which part of spritesheet to take
              this.spriteWidth, this.spriteHeight) //how big the sprite being used is
        if (this.frame < 7){
          this.frame += 1
        }
        else {
          currentMap[this.y][this.x].hasEnemy = 0
          currentMap[this.y][this.x].prop = new entity(this.x, this.y, {direction: this.direction, spriteSheet: this.spriteSheet, spriteWidth: this.spriteWidth, spriteHeight: this.spriteHeight, solid: false, xFrame: 12, yFrame: 2, animation: 'c'}, this.renderWidth, this.renderHeight)
          currentMap[this.y][this.x].hasProp = 1
        }
        break;
      case 'a':
        image(this.spriteSheet, //image to be used
              x - this.renderWidth / 2 * maxHpcnt, y - this.renderHeight * maxHpcnt, //where to place top-left corner
              this.renderWidth * maxHpcnt, this.renderHeight * maxHpcnt, //how big to draw
              (relDir + 5) * this.spriteWidth, (this.frame + 3) * this.spriteHeight, //which part of spritesheet to take
              this.spriteWidth, this.spriteHeight) //how big the sprite being used is
        this.frame += 1
        if (this.frame == 2 && this.x == player.coords[1] && this.y == player.coords[0]){
          player.hp -= this.damage
          if (player.hp <= 0){
            gamePart = 4
          }
        }
        else if (this.frame == 3){
          this.frame = 0
          this.animation = 'm'
        }
        break;
    }
  }

  hit(damType){
    switch (damType){
      case 'ballistic':
        this.ballisticDmg()
    }
  }

  ballisticDmg(){
    if (this.hp > 0){
      this.hp -= player.equipped.damage
      this.animation = 'h'
      if (this.hp <= 0){
        this.animation = 'db'
        this.frame = 0
        this.alive = false
      }
    }
  }

  //bfs principle:
  //  check every adjacent square
  //  add checked movements to a list 
  //  once one that leads to destination is found, move to final path array

  bfsToPlayer(){
    if (player.coords[0] >= this.activeArea[0] && player.coords[0] <= this.activeArea[2] && player.coords[1] >= this.activeArea[1] && player.coords[1] <= this.activeArea[3]){
      let paths = [[[this.y, this.x]]]
      let pathFound = 0
      let whichNode = 0
      let pathNodes = []
      let onDupe = false
      if (this.x == player.coords[1] && this.y == player.coords[0]){
        pathFound = 1
      }
      while (pathFound == 0){ //finding a path
        paths.push([])
        for (let i = 0; i < paths[paths.length - 2].length; i++){ //checking for new nodes
          if (isMoveValid([paths[paths.length - 2][i][0], paths[paths.length - 2][i][1]], 'north')){ //checking if the north connected tile is free
            onDupe = false
            paths[paths.length - 1].push([paths[paths.length - 2][i][0] - 1, paths[paths.length - 2][i][1], i])
            if (paths[paths.length - 1][paths[paths.length - 1].length - 1][0] == player.coords[0] && paths[paths.length - 1][paths[paths.length - 1].length - 1][1] == player.coords[1]){
              pathFound = 1
              whichNode = paths[paths.length - 1].length - 1
              break;
            }
            if (paths.length >= 3){
              for (let j = 0; j < paths[paths.length - 3].length; j++){
                if (paths[paths.length - 3][j][0] == paths[paths.length - 1][paths[paths.length - 1].length - 1][0] && paths[paths.length - 3][j][1] == paths[paths.length - 1][paths[paths.length - 1].length - 1][1]){
                  paths[paths.length - 1].pop()
                  onDupe = true
                  break;
                }
              }
            }
            if (onDupe == false){
              for (let j = 0; j < paths[paths.length - 1].length - 2; j++){
                if (paths[paths.length - 1][j][0] == paths[paths.length - 1][paths[paths.length - 1].length - 1][0] && paths[paths.length - 1][j][1] == paths[paths.length - 1][paths[paths.length - 1].length - 1][1]){
                  paths[paths.length - 1].pop()
                  break;
                }
              }
            }
          }
          if (isMoveValid([paths[paths.length - 2][i][0], paths[paths.length - 2][i][1]], 'east')){ //checking east tile
            onDupe = false
            paths[paths.length - 1].push([paths[paths.length - 2][i][0], paths[paths.length - 2][i][1] + 1, i])
            if (paths[paths.length - 1][paths[paths.length - 1].length - 1][0] == player.coords[0] && paths[paths.length - 1][paths[paths.length - 1].length - 1][1] == player.coords[1]){
              pathFound = 1
              whichNode = paths[paths.length - 1].length - 1
              break;
            }
            if (paths.length >= 3){
              for (let j = 0; j < paths[paths.length - 3].length; j++){
                if (paths[paths.length - 3][j][0] == paths[paths.length - 1][paths[paths.length - 1].length - 1][0] && paths[paths.length - 3][j][1] == paths[paths.length - 1][paths[paths.length - 1].length - 1][1]){
                  paths[paths.length - 1].pop()
                  onDupe = true
                  break;
                }
              }
            }
            if (onDupe == false){
              for (let j = 0; j < paths[paths.length - 1].length - 2; j++){
                if (paths[paths.length - 1][j][0] == paths[paths.length - 1][paths[paths.length - 1].length - 1][0] && paths[paths.length - 1][j][1] == paths[paths.length - 1][paths[paths.length - 1].length - 1][1]){
                  paths[paths.length - 1].pop()
                  break;
                }
              }
            }
          }
          if (isMoveValid([paths[paths.length - 2][i][0], paths[paths.length - 2][i][1]], 'south')){ //checking south tile
            onDupe = false
            paths[paths.length - 1].push([paths[paths.length - 2][i][0] + 1, paths[paths.length - 2][i][1], i])
            if (paths[paths.length - 1][paths[paths.length - 1].length - 1][0] == player.coords[0] && paths[paths.length - 1][paths[paths.length - 1].length - 1][1] == player.coords[1]){
              pathFound = 1
              whichNode = paths[paths.length - 1].length - 1
              break;
            }
            if (paths.length >= 3){
              for (let j = 0; j < paths[paths.length - 3].length; j++){
                if (paths[paths.length - 3][j][0] == paths[paths.length - 1][paths[paths.length - 1].length - 1][0] && paths[paths.length - 3][j][1] == paths[paths.length - 1][paths[paths.length - 1].length - 1][1]){
                  paths[paths.length - 1].pop()
                  onDupe = true
                  break;
                }
              }
            }
            if (onDupe == false){
              for (let j = 0; j < paths[paths.length - 1].length - 2; j++){
                if (paths[paths.length - 1][j][0] == paths[paths.length - 1][paths[paths.length - 1].length - 1][0] && paths[paths.length - 1][j][1] == paths[paths.length - 1][paths[paths.length - 1].length - 1][1]){
                  paths[paths.length - 1].pop()
                  break;
                }
              }
            }
          }
          if (isMoveValid([paths[paths.length - 2][i][0], paths[paths.length - 2][i][1]], 'west')){ //checking west tile
            onDupe = false
            paths[paths.length - 1].push([paths[paths.length - 2][i][0], paths[paths.length - 2][i][1] - 1, i])
            if (paths[paths.length - 1][paths[paths.length - 1].length - 1][0] == player.coords[0] && paths[paths.length - 1][paths[paths.length - 1].length - 1][1] == player.coords[1]){
              pathFound = 1
              whichNode = paths[paths.length - 1].length - 1
              break;
            }
            if (paths.length >= 3){
              for (let j = 0; j < paths[paths.length - 3].length; j++){
                if (paths[paths.length - 3][j][0] == paths[paths.length - 1][paths[paths.length - 1].length - 1][0] && paths[paths.length - 3][j][1] == paths[paths.length - 1][paths[paths.length - 1].length - 1][1]){
                  paths[paths.length - 1].pop()
                  onDupe = true
                  break;
                }
              }
            }
            if (onDupe == false){
              for (let j = 0; j < paths[paths.length - 1].length - 2; j++){
                if (paths[paths.length - 1][j][0] == paths[paths.length - 1][paths[paths.length - 1].length - 1][0] && paths[paths.length - 1][j][1] == paths[paths.length - 1][paths[paths.length - 1].length - 1][1]){
                  paths[paths.length - 1].pop()
                  break;
                }
              }
            }
          }
          if (isMoveValid([paths[paths.length - 2][i][0], paths[paths.length - 2][i][1]], 'north') && isMoveValid([paths[paths.length - 2][i][0] - 1, paths[paths.length - 2][i][1]], 'east') && isMoveValid([paths[paths.length - 2][i][0], paths[paths.length - 2][i][1]], 'east') && isMoveValid([paths[paths.length - 2][i][0], paths[paths.length - 2][i][1] + 1], 'north')){ //checking north east tile
            onDupe = false
            paths[paths.length - 1].push([paths[paths.length - 2][i][0] - 1, paths[paths.length - 2][i][1] + 1, i])
            if (paths[paths.length - 1][paths[paths.length - 1].length - 1][0] == player.coords[0] && paths[paths.length - 1][paths[paths.length - 1].length - 1][1] == player.coords[1]){
              pathFound = 1
              whichNode = paths[paths.length - 1].length - 1
              break;
            }
            if (paths.length >= 3){
              for (let j = 0; j < paths[paths.length - 3].length; j++){
                if (paths[paths.length - 3][j][0] == paths[paths.length - 1][paths[paths.length - 1].length - 1][0] && paths[paths.length - 3][j][1] == paths[paths.length - 1][paths[paths.length - 1].length - 1][1]){
                  paths[paths.length - 1].pop()
                  onDupe = true
                  break;
                }
              }
            }
            if (onDupe == false){
              for (let j = 0; j < paths[paths.length - 1].length - 2; j++){
                if (paths[paths.length - 1][j][0] == paths[paths.length - 1][paths[paths.length - 1].length - 1][0] && paths[paths.length - 1][j][1] == paths[paths.length - 1][paths[paths.length - 1].length - 1][1]){
                  paths[paths.length - 1].pop()
                  break;
                }
              }
            }
          }
          if (isMoveValid([paths[paths.length - 2][i][0], paths[paths.length - 2][i][1]], 'south') && isMoveValid([paths[paths.length - 2][i][0] + 1, paths[paths.length - 2][i][1]], 'east') && isMoveValid([paths[paths.length - 2][i][0], paths[paths.length - 2][i][1]], 'east') && isMoveValid([paths[paths.length - 2][i][0], paths[paths.length - 2][i][1] + 1], 'south')){ //checking south east tile
            onDupe = false
            paths[paths.length - 1].push([paths[paths.length - 2][i][0] + 1, paths[paths.length - 2][i][1] + 1, i])
            if (paths[paths.length - 1][paths[paths.length - 1].length - 1][0] == player.coords[0] && paths[paths.length - 1][paths[paths.length - 1].length - 1][1] == player.coords[1]){
              pathFound = 1
              whichNode = paths[paths.length - 1].length - 1
              break;
            }
            if (paths.length >= 3){
              for (let j = 0; j < paths[paths.length - 3].length; j++){
                if (paths[paths.length - 3][j][0] == paths[paths.length - 1][paths[paths.length - 1].length - 1][0] && paths[paths.length - 3][j][1] == paths[paths.length - 1][paths[paths.length - 1].length - 1][1]){
                  paths[paths.length - 1].pop()
                  onDupe = true
                  break;
                }
              }
            }
            if (onDupe == false){
              for (let j = 0; j < paths[paths.length - 1].length - 2; j++){
                if (paths[paths.length - 1][j][0] == paths[paths.length - 1][paths[paths.length - 1].length - 1][0] && paths[paths.length - 1][j][1] == paths[paths.length - 1][paths[paths.length - 1].length - 1][1]){
                  paths[paths.length - 1].pop()
                  break;
                }
              }
            }
          }
          if (isMoveValid([paths[paths.length - 2][i][0], paths[paths.length - 2][i][1]], 'south') && isMoveValid([paths[paths.length - 2][i][0] + 1, paths[paths.length - 2][i][1]], 'west') && isMoveValid([paths[paths.length - 2][i][0], paths[paths.length - 2][i][1]], 'west') && isMoveValid([paths[paths.length - 2][i][0], paths[paths.length - 2][i][1] - 1], 'south')){ //checking south west tile
            onDupe = false
            paths[paths.length - 1].push([paths[paths.length - 2][i][0] + 1, paths[paths.length - 2][i][1] - 1, i])
            if (paths[paths.length - 1][paths[paths.length - 1].length - 1][0] == player.coords[0] && paths[paths.length - 1][paths[paths.length - 1].length - 1][1] == player.coords[1]){
              pathFound = 1
              whichNode = paths[paths.length - 1].length - 1
              break;
            }
            if (paths.length >= 3){
              for (let j = 0; j < paths[paths.length - 3].length; j++){
                if (paths[paths.length - 3][j][0] == paths[paths.length - 1][paths[paths.length - 1].length - 1][0] && paths[paths.length - 3][j][1] == paths[paths.length - 1][paths[paths.length - 1].length - 1][1]){
                  paths[paths.length - 1].pop()
                  onDupe = true
                  break;
                }
              }
            }
            if (onDupe == false){
              for (let j = 0; j < paths[paths.length - 1].length - 2; j++){
                if (paths[paths.length - 1][j][0] == paths[paths.length - 1][paths[paths.length - 1].length - 1][0] && paths[paths.length - 1][j][1] == paths[paths.length - 1][paths[paths.length - 1].length - 1][1]){
                  paths[paths.length - 1].pop()
                  break;
                }
              }
            }
          }
          if (isMoveValid([paths[paths.length - 2][i][0], paths[paths.length - 2][i][1]], 'north') && isMoveValid([paths[paths.length - 2][i][0] - 1, paths[paths.length - 2][i][1]], 'west') && isMoveValid([paths[paths.length - 2][i][0], paths[paths.length - 2][i][1]], 'west') && isMoveValid([paths[paths.length - 2][i][0], paths[paths.length - 2][i][1] - 1], 'north')){ //checking north west tile
            onDupe = false
            paths[paths.length - 1].push([paths[paths.length - 2][i][0] - 1, paths[paths.length - 2][i][1] - 1, i])
            if (paths[paths.length - 1][paths[paths.length - 1].length - 1][0] == player.coords[0] && paths[paths.length - 1][paths[paths.length - 1].length - 1][1] == player.coords[1]){
              pathFound = 1
              whichNode = paths[paths.length - 1].length - 1
              break;
            }
            if (paths.length >= 3){
              for (let j = 0; j < paths[paths.length - 3].length; j++){
                if (paths[paths.length - 3][j][0] == paths[paths.length - 1][paths[paths.length - 1].length - 1][0] && paths[paths.length - 3][j][1] == paths[paths.length - 1][paths[paths.length - 1].length - 1][1]){
                  paths[paths.length - 1].pop()
                  onDupe = true
                  break;
                }
              }
            }
            if (onDupe == false){
              for (let j = 0; j < paths[paths.length - 1].length - 2; j++){
                if (paths[paths.length - 1][j][0] == paths[paths.length - 1][paths[paths.length - 1].length - 1][0] && paths[paths.length - 1][j][1] == paths[paths.length - 1][paths[paths.length - 1].length - 1][1]){
                  paths[paths.length - 1].pop()
                  break;
                }
              }
            }
          }
        }
        if (paths[paths.length - 1].length == 0 || paths[paths.length - 1].length >= 100){ //stop pathing if player can't be found or searching gone too long
          pathFound = 1
          whichNode = paths[paths.length - 2].length - 1
          paths.pop()
        }
      }
      for (let i = paths.length - 1; i >= 0; i -= 1){ //create correct path
        pathNodes.unshift([paths[i][whichNode][0], paths[i][whichNode][1]])
        whichNode = paths[i][whichNode][2]
      }
      for(let i = 1; i < pathNodes.length; i++){ //make path readable
        this.path.push([pathNodes[i][0] - pathNodes[i - 1][0], pathNodes[i][1] - pathNodes[i - 1][1]])
      }
    }
    if (this.path[0] == undefined){
      this.path.shift()
    }
  }

  execPath(dY, dX){
    let hasMoved = false
    if (dY == -1 && dX == 0){
      hasMoved = this.moveNorth()
    }
    else if (dY == -1 && dX == 1){
      hasMoved = this.moveNorthEast()
    }
    else if (dY == 0 && dX == 1){
      hasMoved = this.moveEast()
    }
    else if (dY == 1 && dX == 1){
      hasMoved = this.moveSouthEast()
    }
    else if (dY == 1 && dX == 0){
      hasMoved = this.moveSouth()
    }
    else if (dY == 1 && dX == -1){
      hasMoved = this.moveSouthWest()
    }
    else if (dY == 0 && dX == -1){
      hasMoved = this.moveWest()
    }
    else {
      hasMoved = this.moveNorthWest()
    }
    if (hasMoved == true){
      this.path.shift()
    }
  }
}