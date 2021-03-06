let drawingBlock //filled with the currently rendered block every render loop

//colours
neutralGrey = [127, 127, 127]
pureRed = [255, 0, 0]
purePink = [200, 0, 255]
pureBlack = [25, 25, 25]
//end of colour shortcuts

class block {
  constructor({ floor = 0, knee = 0, shoulder = 0, head = 0, ceiling = 0,
    northShin = 0, northMid = 0, northFace = 0, northAbove = 0,
    eastShin = 0, eastMid = 0, eastFace = 0, eastAbove = 0,
    southShin = 0, southMid = 0, southFace = 0, southAbove = 0,
    westShin = 0, westMid = 0, westFace = 0, westAbove = 0,
    floorC = pureBlack, kneeC = purePink, shoulderC = pureBlack, headC = purePink, ceilingC = purePink,
    northShinC = purePink, northMidC = pureBlack, northFaceC = purePink, northAboveC = pureBlack,
    eastShinC = purePink, eastMidC = pureBlack, eastFaceC = purePink, eastAboveC = pureBlack,
    southShinC = purePink, southMidC = pureBlack, southFaceC = purePink, southAboveC = pureBlack,
    westShinC = purePink, westMidC = pureBlack, westFaceC = purePink, westAboveC = pureBlack,
    solidNorth = 1, solidEast = 1, solidSouth = 1, solidWest = 1, material = 'solid' }) { //defaults everything to hidden & grey
    this.floor = floor; this.floorC = floorC
    this.knee = knee; this.kneeC = kneeC
    this.shoulder = shoulder; this.shoulderC = shoulderC
    this.head = head; this.headC = headC
    this.ceiling = ceiling; this.ceilingC = ceilingC
    this.northShin = northShin; this.northShinC = northShinC
    this.northMid = northMid; this.northMidC = northMidC
    this.northFace = northFace; this.northFaceC = northFaceC
    this.northAbove = northAbove; this.northAboveC = northAboveC
    this.eastShin = eastShin; this.eastShinC = eastShinC
    this.eastMid = eastMid; this.eastMidC = eastMidC
    this.eastFace = eastFace; this.eastFaceC = eastFaceC
    this.eastAbove = eastAbove; this.eastAboveC = eastAboveC
    this.southShin = southShin; this.southShinC = southShinC
    this.southMid = southMid; this.southMidC = southMidC
    this.southFace = southFace; this.southFaceC = southFaceC
    this.southAbove = southAbove; this.southAboveC = southAboveC
    this.westShin = westShin; this.westShinC = westShinC
    this.westMid = westMid; this.westMidC = westMidC
    this.westFace = westFace; this.westFaceC = westFaceC
    this.westAbove = westAbove; this.westAboveC = westAboveC
    this.solidNorth = solidNorth; this.solidEast = solidEast; this.solidSouth = solidSouth; this.solidWest = solidWest
    this.material = material;
    this.hasEnemy = false
    this.enemy = 0
    this.hasProp = false
    this.prop = 0
  }
} //the class for blocks of the world

//block prefabs (to save time with commonly used configs)
bk = new block({
}) //unrendered (resource saving)
fB = new block({
  northShin: 1, northMid: 1, northFace: 1, northAbove: 1,
  eastShin: 1, eastMid: 1, eastFace: 1, eastAbove: 1,
  southShin: 1, southMid: 1, southFace: 1, southAbove: 1,
  westShin: 1, westMid: 1, westFace: 1, westAbove: 1
}) //all walls
fC = new block({
  floor: 1, ceiling: 1,
  solidNorth: 0, solidEast: 0, solidSouth: 0, solidWest: 0
}) //just a cieling and floor
nW = new block({
  floor: 1,
  northShin: 1, northMid: 1, northFace: 1, northAbove: 1,
  solidEast: 0, solidSouth: 0, solidWest: 0
}) //north wall only
eW = new block({
  floor: 1,
  eastShin: 1, eastMid: 1, eastFace: 1, eastAbove: 1,
  solidNorth: 0, solidSouth: 0, solidWest: 0
}) //east wall only
sW = new block({
  floor: 1,
  southShin: 1, southMid: 1, southFace: 1, southAbove: 1,
  solidNorth: 0, solidEast: 0, solidWest: 0
}) //south wall only
wW = new block({
  floor: 1,
  westShin: 1, westMid: 1, westFace: 1, westAbove: 1,
  solidNorth: 0, solidEast: 0, solidSouth: 0
}) //west wall only
cv = new block({
  northShin: 1, eastShin: 1, southShin: 1, westShin: 1,
  knee: 1
})
//end of prefabs

//Every tile in existence, but only the base coordinates
let floors90 = [
  [[[0, 6], [1, 6], [0, 7], [-1, 7]], [[1, 6], [3, 6], [2 + (1 / 3), 7], [0, 7]], [[3, 6], [9, 6], [8 + (1 / 3), 7], [2 + (1 / 3), 7]], [[9, 6], [16, 6], [15 + (1 / 3), 7], [8 + (1 / 3), 7]], //left side
  [[16, 6], [16, 6], [16 + (2 / 3), 7], [15 + (1 / 3), 7]], //centre
  [[16, 6], [23, 6], [23 + (5 / 6), 7], [16 + (2 / 3), 7]], [[23, 6], [29, 6], [29 + (2 / 3), 7], [23 + (5 / 6), 7]], [[29, 6], [31, 6], [32, 7], [29 + (2 / 3), 7]], [[31, 6], [32, 6], [33, 7], [32, 7]] //right side
  ], //back row
  [[[0, 7], [2 + (1 / 3), 7], [1.5, 8], [-1, 8]], [[2 + (1 / 3), 7], [8 + (1 / 3), 7], [7.5, 8], [1.5, 8]], [[8 + (1 / 3), 7], [15 + (1 / 3), 7], [14 + (2 / 3), 8], [7.5, 8]], //left side
  [[15 + (1 / 3), 7], [16 + (2 / 3), 7], [17 + (1 / 3), 8], [14 + (2 / 3), 8]], //centre
  [[16 + (2 / 3), 7], [23 + (5 / 6), 7], [24.5, 8], [17 + (1 / 3), 8]], [[23 + (5 / 6), 7], [29 + (2 / 3), 7], [30.5, 8], [24.5, 8]], [[29 + (2 / 3), 7], [32, 7], [33, 8], [30.5, 8]] // right side
  ], //secondBack row
  [[[-1, 8], [1.5, 8], [0, 10], [-2.5, 10]], [[1.5, 8], [7.5, 8], [6, 10], [0, 10]], [[7.5, 8], [14 + (2 / 3), 8], [13 + (4 / 9), 10], [6, 10]], //left side
  [[14 + (2 / 3), 8], [17 + (1 / 3), 8], [18 + (2 / 3), 10], [13 + (4 / 9), 10]], //centre
  [[17 + (1 / 3), 8], [24.5, 8], [26, 10], [18 + (2 / 3), 10]], [[24.5, 8], [30.5, 8], [32, 10], [26, 10]], [[30.5, 8], [33, 8], [34.5, 10], [32, 10]] //right side
  ], //middle row
  [[[0, 10], [6, 10], [3 + (8 / 9), 13], [-(2 + (1 / 3)), 13]], [[6, 10], [13 + (4 / 9), 10], [11 + (4 / 9), 13], [3 + (8 / 9), 13]], //left side
  [[13 + (4 / 9), 10], [18 + (2 / 3), 10], [20 + (2 / 3), 13], [11 + (4 / 9), 13]], //centre
  [[18 + (2 / 3), 10], [26, 10], [28 + (1 / 3), 13], [20 + (2 / 3), 13]], [[26, 10], [32, 10], [34 + (1 / 3), 13], [28 + (1 / 3), 13]]
  ], //secondFront row
  [[[-(2 + (1 / 3)), 13], [3 + (8 / 9), 13], [0, 18], [-(6 + (2 / 9)), 18]], [[3 + (8 / 9), 13], [11 + (4 / 9), 13], [8, 18], [0, 18]], //left side
  [[11 + (4 / 9), 13], [20 + (2 / 3), 13], [24, 18], [8, 18]], //centre
  [[20 + (2 / 3), 13], [28 + (1 / 3), 13], [32, 18], [24, 18]], [[28 + (1 / 3), 13], [34 + (1 / 3), 13], [38 + (2 / 9), 18], [32, 18]] //right side
  ], //front row
  [[[0, 18], [8, 18], [0, 30], [-7, 30]], //left side
  [[8, 18], [24, 18], [32, 30], [0, 30]], //centre
  [[24, 18], [32, 18], [39, 30], [32, 30]] //right side
  ] //standing row
] //for looking NESW
let floors45 = [
  [[[0, 6], [2, 6], [4, 6], [2, 6.5]], [[28, 6], [30, 6], [32, 6], [30, 6.5]]], //back row
  [[[-2, 6.5], [0, 6], [2, 6.5], [0, 7]], [[2, 6.5], [4, 6], [8, 6], [4, 7]], [[8, 6], [10, 6], [12, 6], [10, 6.5]], [[12, 6], [14, 6], [16, 6], [14, 6.5]], //left side
  [[16, 6], [18, 6], [20, 6], [18, 6.5]], [[20, 6], [22, 6], [24, 6], [22, 6.5]], [[24, 6], [28, 6], [30, 6.5], [28, 7]], [[30, 6.5], [32, 6], [34, 6.5], [32, 7]] //right side
  ], //second back row
  [[[-2, 7.5], [2, 6.5], [4, 7], [0, 8]], [[4, 7], [8, 6], [10, 6.5], [6, 7.5]], [[10, 6.5], [12, 6], [14, 6.5], [12, 7]], //left
  [[14, 6.5], [16, 6], [18, 6.5], [16, 7]], //centre
  [[18, 6.5], [20, 6], [22, 6.5], [20, 7]], [[22, 6.5], [24, 6], [28, 7], [26, 7.5]], [[28, 7], [30, 6.5], [34, 7.5], [32, 8]] //right
  ], //thirdback
  [[[-2, 8.5], [4, 7], [6, 7.5], [0, 9]], [[6, 7.5], [10, 6.5], [12, 7], [8, 8]], [[12, 7], [14, 6.5], [16, 7], [14, 7.5]], //leftside
  [[16, 7], [18, 6.5], [20, 7], [18, 7.5]], [[20, 7], [22, 6.5], [26, 7.5], [24, 8]], [[26, 7.5], [28, 7], [34, 8.5], [32, 9]] //right
  ], //fourth row from back
  [[[-2, 9.5], [6, 7.5], [8, 8], [0, 10]], [[8, 8], [12, 7], [14, 7.5], [10, 8.5]], //left
  [[14, 7.5], [16, 7], [18, 7.5], [16, 8]], //centre
  [[18, 7.5], [20, 7], [24, 8], [22, 8.5]], [[24, 8], [26, 7.5], [34, 9.5], [32, 10]] //right
  ], //fifth back row
  [[[0, 10], [8, 8], [10, 8.5], [2, 10.5]], [[10, 8.5], [14, 7.5], [16, 8], [12, 9]], //left
  [[16, 8], [18, 7.5], [22, 8.5], [20, 9]], [[22, 8.5], [24, 8], [32, 10], [30, 10.5]] //right
  ], //1 before middle
  [[[-2, 10.5], [0, 10], [2, 10.5], [0, 11]], [[2, 10.5], [10, 8.5], [12, 9], [4, 11]], //left
  [[12, 9], [16, 8], [20, 9], [16, 10]], //centre
  [[20, 9], [22, 8.5], [30, 10.5], [28, 11]], [[30, 10.5], [32, 10], [34, 10.5], [32, 11]] //right
  ], //middle row
  [[[-2, 11.5], [2, 10.5], [4, 11], [0, 12]], [[4, 11], [12, 9], [16, 10], [8, 12]], //left
  [[16, 10], [20, 9], [28, 11], [24, 12]], [[28, 11], [30, 10.5], [34, 11.5], [32, 12]] //right
  ], //after mid
  [[[-4, 13], [4, 11], [8, 12], [0, 14]], //left
  [[8, 12], [16, 10], [24, 12], [16, 14]], //centre
  [[24, 12], [28, 11], [36, 13], [32, 14]] //right
  ], //2 after mid
  [[[-8, 16], [8, 12], [16, 14], [0, 18]], //left
  [[16, 14], [24, 12], [40, 16], [32, 18]] //right
  ], //front
  [[[0, 18], [16, 14], [32, 18], [16, 22]]] //stood on
] //the ones for the funky angle
let directionBlockRelations = [
  [[-5, -4], [-5, 4], [-5, -3], [-5, 3], [-5, -2], [-5, 2], [-5, -1], [-5, 1], [-5, 0],
  [-4, -3], [-4, 3], [-4, -2], [-4, 2], [-4, -1], [-4, 1], [-4, 0],
  [-3, -3], [-3, 3], [-3, -2], [-3, 2], [-3, -1], [-3, 1], [-3, 0],
  [-2, -2], [-2, 2], [-2, -1], [-2, 1], [-2, 0],
  [-1, -2], [-1, 2], [-1, -1], [-1, 1], [-1, 0],
  [0, -1], [0, 1], [0, 0]], //0: north
  [[-8, 2], [-2, 8],
  [-8, 1], [-1, 5], [-7, 2], [-2, 7], [-6, 3], [-3, 6], [-5, 4], [-4, 5],
  [-7, 1], [-1, 7], [-6, 2], [-2, 6], [-5, 3], [-3, 5], [-4, 4],
  [-6, 1], [-1, 6], [-5, 2], [-2, 5], [-4, 3], [-3, 4],
  [-5, 1], [-1, 5], [-4, 2], [-2, 4], [-3, 3],
  [-4, 1], [-1, 4], [-3, 2], [-2, 3],
  [-4, 0], [0, 4], [-3, 1], [-1, 3], [-2, 2],
  [-3, 0], [0, 3], [-2, 1], [-1, 2],
  [-2, 0], [0, 2], [-1, 1],
  [-1, 0], [0, 1],
  [0, 0]], //1: north-east
  [[-4, 5], [4, 5], [-3, 5], [3, 5], [-2, 5], [2, 5], [-1, 5], [1, 5], [0, 5],
  [-3, 4], [3, 4], [-2, 4], [2, 4], [-1, 4], [1, 4], [0, 4],
  [-3, 3], [3, 3], [-2, 3], [2, 3], [-1, 3], [1, 3], [0, 3],
  [-2, 2], [2, 2], [-1, 2], [1, 2], [0, 2],
  [-2, 1], [2, 1], [-1, 1], [1, 1], [0, 1],
  [-1, 0], [1, 0], [0, 0]], //2: east
  [[2, 8], [8, 2],
  [1, 8], [8, 1], [2, 7], [7, 2], [3, 6], [6, 3], [4, 5], [5, 4],
  [1, 7], [7, 1], [2, 6], [6, 2], [3, 5], [5, 3], [4, 4],
  [1, 6], [6, 1], [2, 5], [5, 2], [3, 4], [4, 3],
  [1, 5], [5, 1], [2, 4], [4, 2], [3, 3],
  [1, 4], [4, 1], [2, 3], [3, 2],
  [0, 4], [4, 0], [1, 3], [3, 1], [2, 2],
  [0, 3], [3, 0], [1, 2], [2, 1],
  [0, 2], [2, 0], [1, 1],
  [0, 1], [1, 0],
  [0, 0]], //3: south-east
  [[5, 4], [5, -4], [5, 3], [5, -3], [5, 2], [5, -2], [5, 1], [5, -1], [5, 0],
  [4, 3], [4, -3], [4, 2], [4, -2], [4, 1], [4, -1], [4, 0],
  [3, 3], [3, -3], [3, 2], [3, -2], [3, 1], [3, -1], [3, 0],
  [2, 2], [2, -2], [2, 1], [2, -1], [2, 0],
  [1, 2], [1, -2], [1, 1], [1, -1], [1, 0],
  [0, 1], [0, -1], [0, 0]], //4: south
  [[8, -2], [2, -8],
  [8, -1], [1, -8], [7, -2], [2, -7], [6, -3], [3, -6], [5, -4], [4, -5],
  [7, -1], [1, -7], [6, -2], [2, -6], [5, -3], [3, -5], [4, -4],
  [6, -1], [1, -6], [5, -2], [2, -5], [4, -3], [3, -4],
  [5, -1], [1, -5], [4, -2], [2, -4], [3, -3],
  [4, -1], [1, -4], [3, -2], [2, -3],
  [4, -0], [0, -4], [3, -1], [1, -3], [2, -2],
  [3, 0], [0, -3], [2, -1], [1, -2],
  [2, 0], [0, -2], [1, -1],
  [1, 0], [0, -1],
  [0, 0]], //5: south-west
  [[4, -5], [-4, -5], [3, -5], [-3, -5], [2, -5], [-2, -5], [1, -5], [-1, -5], [0, -5],
  [3, -4], [-3, -4], [2, -4], [-2, -4], [1, -4], [-1, -4], [0, -4],
  [3, -3], [-3, -3], [2, -3], [-2, -3], [1, -3], [-1, -3], [0, -3],
  [2, -2], [-2, -2], [1, -2], [-1, -2], [0, -2],
  [2, -1], [-2, -1], [1, -1], [-1, -1], [0, -1],
  [1, 0], [-1, 0], [0, 0]], //6: west
  [[-2, -8], [-8, -2],
  [-1, -8], [-8, -1], [-2, -7], [-7, -2], [-3, -6], [-6, -3], [-4, -5], [-5, -4],
  [-1, -7], [-7, -1], [-2, -6], [-6, -2], [-3, -5], [-5, -3], [-4, -4],
  [-1, -6], [-6, -1], [-2, -5], [-5, -2], [-3, -4], [-4, -3],
  [-1, -5], [-5, -1], [-2, -4], [-4, -2], [-3, -3],
  [-1, -4], [-4, -1], [-2, -3], [-3, -2],
  [-0, -4], [-4, -0], [-1, -3], [-3, -1], [-2, -2],
  [-0, -3], [-3, -0], [-1, -2], [-2, -1],
  [-0, -2], [-2, -0], [-1, -1],
  [-0, -1], [-1, 0],
  [0, 0]] //7: north-west
] //for each direction, says which blocks relative to the player need to be rendered
let whichBlock = [
  [[0, 0], [0, 8], [0, 1], [0, 7], [0, 2], [0, 6], [0, 3], [0, 5], [0, 4],
  [1, 0], [1, 6], [1, 1], [1, 5], [1, 2], [1, 4], [1, 3],
  [2, 0], [2, 6], [2, 1], [2, 5], [2, 2], [2, 4], [2, 3],
  [3, 0], [3, 4], [3, 1], [3, 3], [3, 2],
  [4, 0], [4, 4], [4, 1], [4, 3], [4, 2],
  [5, 0], [5, 2], [5, 1]], //90
  [[0, 0], [0, 1],
  [1, 0], [1, 7], [1, 1], [1, 6], [1, 2], [1, 5], [1, 3], [1, 4],
  [2, 0], [2, 6], [2, 1], [2, 5], [2, 2], [2, 4], [2, 3],
  [3, 0], [3, 5], [3, 1], [3, 4], [3, 2], [3, 3],
  [4, 0], [4, 4], [4, 1], [4, 3], [4, 2],
  [5, 0], [5, 3], [5, 1], [5, 2],
  [6, 0], [6, 4], [6, 1], [6, 3], [6, 2],
  [7, 0], [7, 3], [7, 1], [7, 2],
  [8, 0], [8, 2], [8, 1],
  [9, 0], [9, 1],
  [10, 0]] //45
] //which block from the floors list is drawn for each relative block
//end of coordinate listing

//drawing functions
function floorTile(corners, i, j) {
  quad(1024 * corners[i][j][0][0] / 32, 576 * corners[i][j][0][1] / 18, 1024 * corners[i][j][1][0] / 32, 576 * corners[i][j][1][1] / 18, 1024 * corners[i][j][2][0] / 32, 576 * corners[i][j][2][1] / 18, 1024 * corners[i][j][3][0] / 32, 576 * corners[i][j][3][1] / 18)
} function kneeTile(corners, i, j) {
  quad(1024 * corners[i][j][0][0] / 32, 576 * mean([corners[i][j][0][1], 6]) / 18, 1024 * corners[i][j][1][0] / 32, 576 * mean([corners[i][j][1][1], 6]) / 18, 1024 * corners[i][j][2][0] / 32, 576 * mean([corners[i][j][2][1], 6]) / 18, 1024 * corners[i][j][3][0] / 32, 576 * mean([corners[i][j][3][1], 6]) / 18)
} function shoulderTile(corners, i, j) {
  quad(1024 * corners[i][j][0][0] / 32, 576 * 6 / 18, 1024 * corners[i][j][1][0] / 32, 576 * 6 / 18, 1024 * corners[i][j][2][0] / 32, 576 * 6 / 18, 1024 * corners[i][j][3][0] / 32, 576 * 6 / 18)
} function headHeightTile(corners, i, j) {
  quad(1024 * corners[i][j][0][0] / 32, 576 * ((6 + (6 - mean([corners[i][j][0][1], 6]))) / 18), 1024 * corners[i][j][1][0] / 32, 576 * ((6 + (6 - mean([corners[i][j][1][1], 6]))) / 18), 1024 * corners[i][j][2][0] / 32, 576 * ((6 + (6 - mean([corners[i][j][2][1], 6]))) / 18), 1024 * corners[i][j][3][0] / 32, 576 * ((6 + (6 - mean([corners[i][j][3][1], 6]))) / 18))
} function ceilingTile(corners, i, j) {
  quad(1024 * corners[i][j][0][0] / 32, 576 * (6 + (6 - corners[i][j][0][1])) / 18, 1024 * corners[i][j][1][0] / 32, 576 * (6 + (6 - corners[i][j][1][1])) / 18, 1024 * corners[i][j][2][0] / 32, 576 * (6 + (6 - corners[i][j][2][1])) / 18, 1024 * corners[i][j][3][0] / 32, 576 * (6 + (6 - corners[i][j][3][1])) / 18)
} function frontShin(corners, i, j) {
  quad(1024 * corners[i][j][3][0] / 32, 576 * corners[i][j][3][1] / 18, 1024 * corners[i][j][2][0] / 32, 576 * corners[i][j][2][1] / 18, 1024 * corners[i][j][2][0] / 32, 576 * mean([corners[i][j][2][1], 6]) / 18, 1024 * corners[i][j][3][0] / 32, 576 * mean([corners[i][j][3][1], 6]) / 18)
} function backShin(corners, i, j) {
  quad(1024 * corners[i][j][0][0] / 32, 576 * corners[i][j][0][1] / 18, 1024 * corners[i][j][1][0] / 32, 576 * corners[i][j][1][1] / 18, 1024 * corners[i][j][1][0] / 32, 576 * mean([corners[i][j][1][1], 6]) / 18, 1024 * corners[i][j][0][0] / 32, 576 * mean([corners[i][j][0][1], 6]) / 18)
} function frontMid(corners, i, j) {
  quad(1024 * corners[i][j][3][0] / 32, 576 * 6 / 18, 1024 * corners[i][j][2][0] / 32, 576 * 6 / 18, 1024 * corners[i][j][2][0] / 32, 576 * mean([corners[i][j][2][1], 6]) / 18, 1024 * corners[i][j][3][0] / 32, 576 * mean([corners[i][j][3][1], 6]) / 18)
} function backMid(corners, i, j) {
  quad(1024 * corners[i][j][0][0] / 32, 576 * 6 / 18, 1024 * corners[i][j][1][0] / 32, 576 * 6 / 18, 1024 * corners[i][j][1][0] / 32, 576 * mean([corners[i][j][1][1], 6]) / 18, 1024 * corners[i][j][0][0] / 32, 576 * mean([corners[i][j][0][1], 6]) / 18)
} function frontFace(corners, i, j) {
  quad(1024 * corners[i][j][3][0] / 32, 576 * ((6 + (6 - mean([corners[i][j][3][1], 6]))) / 18), 1024 * corners[i][j][2][0] / 32, 576 * ((6 + (6 - mean([corners[i][j][2][1], 6]))) / 18), 1024 * corners[i][j][2][0] / 32, 576 * 6 / 18, 1024 * corners[i][j][3][0] / 32, 576 * 6 / 18)
} function backFace(corners, i, j) {
  quad(1024 * corners[i][j][0][0] / 32, 576 * ((6 + (6 - mean([corners[i][j][0][1], 6]))) / 18), 1024 * corners[i][j][1][0] / 32, 576 * ((6 + (6 - mean([corners[i][j][1][1], 6]))) / 18), 1024 * corners[i][j][1][0] / 32, 576 * 6 / 18, 1024 * corners[i][j][0][0] / 32, 576 * 6 / 18)
} function frontAboveHeadWall(corners, i, j) {
  quad(1024 * corners[i][j][2][0] / 32, 576 * (6 + (6 - corners[i][j][2][1])) / 18, 1024 * corners[i][j][3][0] / 32, 576 * (6 + (6 - corners[i][j][3][1])) / 18, 1024 * corners[i][j][3][0] / 32, 576 * ((6 + (6 - mean([corners[i][j][3][1], 6]))) / 18), 1024 * corners[i][j][2][0] / 32, 576 * ((6 + (6 - mean([corners[i][j][2][1], 6]))) / 18))
} function backAboveHeadWall(corners, i, j) {
  quad(1024 * corners[i][j][1][0] / 32, 576 * (6 + (6 - corners[i][j][1][1])) / 18, 1024 * corners[i][j][0][0] / 32, 576 * (6 + (6 - corners[i][j][0][1])) / 18, 1024 * corners[i][j][0][0] / 32, 576 * ((6 + (6 - mean([corners[i][j][0][1], 6]))) / 18), 1024 * corners[i][j][1][0] / 32, 576 * ((6 + (6 - mean([corners[i][j][1][1], 6]))) / 18))
} function leftShin(corners, i, j) {
  quad(1024 * corners[i][j][0][0] / 32, 576 * mean([corners[i][j][0][1], 6]) / 18, 1024 * corners[i][j][3][0] / 32, 576 * mean([corners[i][j][3][1], 6]) / 18, 1024 * corners[i][j][3][0] / 32, 576 * corners[i][j][3][1] / 18, 1024 * corners[i][j][0][0] / 32, 576 * corners[i][j][0][1] / 18)
} function rightShin(corners, i, j) {
  quad(1024 * corners[i][j][1][0] / 32, 576 * mean([corners[i][j][1][1], 6]) / 18, 1024 * corners[i][j][2][0] / 32, 576 * mean([corners[i][j][2][1], 6]) / 18, 1024 * corners[i][j][2][0] / 32, 576 * corners[i][j][2][1] / 18, 1024 * corners[i][j][1][0] / 32, 576 * corners[i][j][1][1] / 18)
} function leftMid(corners, i, j) {
  quad(1024 * corners[i][j][0][0] / 32, 576 * 6 / 18, 1024 * corners[i][j][3][0] / 32, 576 * 6 / 18, 1024 * corners[i][j][3][0] / 32, 576 * mean([corners[i][j][3][1], 6]) / 18, 1024 * corners[i][j][0][0] / 32, 576 * mean([corners[i][j][0][1], 6]) / 18)
} function rightMid(corners, i, j) {
  quad(1024 * corners[i][j][1][0] / 32, 576 * 6 / 18, 1024 * corners[i][j][2][0] / 32, 576 * 6 / 18, 1024 * corners[i][j][2][0] / 32, 576 * mean([corners[i][j][2][1], 6]) / 18, 1024 * corners[i][j][1][0] / 32, 576 * mean([corners[i][j][1][1], 6]) / 18)
} function leftFace(corners, i, j) {
  quad(1024 * corners[i][j][0][0] / 32, 576 * ((6 + (6 - mean([corners[i][j][0][1], 6]))) / 18), 1024 * corners[i][j][3][0] / 32, 576 * ((6 + (6 - mean([corners[i][j][3][1], 6]))) / 18), 1024 * corners[i][j][3][0] / 32, 576 * 6 / 18, 1024 * corners[i][j][0][0] / 32, 576 * 6 / 18)
} function rightFace(corners, i, j) {
  quad(1024 * corners[i][j][1][0] / 32, 576 * ((6 + (6 - mean([corners[i][j][1][1], 6]))) / 18), 1024 * corners[i][j][2][0] / 32, 576 * ((6 + (6 - mean([corners[i][j][2][1], 6]))) / 18), 1024 * corners[i][j][2][0] / 32, 576 * 6 / 18, 1024 * corners[i][j][1][0] / 32, 576 * 6 / 18)
} function leftAboveHeadWall(corners, i, j) {
  quad(1024 * corners[i][j][0][0] / 32, 576 * (6 + (6 - corners[i][j][0][1])) / 18, 1024 * corners[i][j][3][0] / 32, 576 * (6 + (6 - corners[i][j][3][1])) / 18, 1024 * corners[i][j][3][0] / 32, 576 * ((6 + (6 - mean([corners[i][j][3][1], 6]))) / 18), 1024 * corners[i][j][0][0] / 32, 576 * ((6 + (6 - mean([corners[i][j][0][1], 6]))) / 18))
} function rightAboveHeadWall(corners, i, j) {
  quad(1024 * corners[i][j][1][0] / 32, 576 * (6 + (6 - corners[i][j][1][1])) / 18, 1024 * corners[i][j][2][0] / 32, 576 * (6 + (6 - corners[i][j][2][1])) / 18, 1024 * corners[i][j][2][0] / 32, 576 * ((6 + (6 - mean([corners[i][j][2][1], 6]))) / 18), 1024 * corners[i][j][1][0] / 32, 576 * ((6 + (6 - mean([corners[i][j][1][1], 6]))) / 18))
}

function enviroRender() {
  for (let i = 0; i < directionBlockRelations[player.direction].length; i++) {
    drawingBlock = currentMap[player.coords[0] + directionBlockRelations[player.direction][i][0]][player.coords[1] + directionBlockRelations[player.direction][i][1]]
    switch (player.direction) {
      case 0:
        if (drawingBlock.floor == 1) {
          fill(drawingBlock.floorC)
          floorTile(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.northShin == 1) {
          fill(drawingBlock.northShinC)
          backShin(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.eastShin == 1) {
          fill(drawingBlock.eastShinC)
          rightShin(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.westShin == 1) {
          fill(drawingBlock.westShinC)
          leftShin(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.knee == 1) {
          fill(drawingBlock.kneeC)
          kneeTile(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.northMid == 1) {
          fill(drawingBlock.northMidC)
          backMid(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.eastMid == 1) {
          fill(drawingBlock.eastMidC)
          rightMid(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.westMid == 1) {
          fill(drawingBlock.westMidC)
          leftMid(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.ceiling == 1) {
          fill(drawingBlock.ceilingC)
          ceilingTile(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.northAbove == 1) {
          fill(drawingBlock.northAboveC)
          backAboveHeadWall(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.eastAbove == 1) {
          fill(drawingBlock.eastAboveC)
          rightAboveHeadWall(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.westAbove == 1) {
          fill(drawingBlock.westAboveC)
          leftAboveHeadWall(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.head == 1) {
          fill(drawingBlock.headC)
          headHeightTile(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.shoulder == 1) {
          fill(drawingBlock.shoulderC)
          shoulderTile(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.northFace == 1) {
          fill(drawingBlock.northFaceC)
          backFace(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.eastFace == 1) {
          fill(drawingBlock.eastFaceC)
          rightFace(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.westFace == 1) {
          fill(drawingBlock.westFaceC)
          leftFace(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.hasProp == true) {
          drawingBlock.prop.drawMe(mean([1024 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][0][0] / 32, 1024 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][1][0] / 32,
          1024 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][2][0] / 32, 1024 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][3][0] / 32]),
            mean([576 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][0][1] / 18, 576 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][1][1] / 18,
            576 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][2][1] / 18, 576 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][3][1] / 18]),
            mean([576 * (6 + (6 - floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][0][1])) / 18, 576 * (6 + (6 - floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][1][1])) / 18,
            576 * (6 + (6 - floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][2][1])) / 18, 576 * (6 + (6 - floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][3][1])) / 18])
          )
        }
        if (drawingBlock.hasEnemy == true) {
          drawingBlock.enemy.drawMe(mean([1024 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][0][0] / 32, 1024 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][1][0] / 32,
          1024 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][2][0] / 32, 1024 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][3][0] / 32]),
            mean([576 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][0][1] / 18, 576 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][1][1] / 18,
            576 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][2][1] / 18, 576 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][3][1] / 18]),
            mean([576 * (6 + (6 - floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][0][1])) / 18, 576 * (6 + (6 - floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][1][1])) / 18,
            576 * (6 + (6 - floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][2][1])) / 18, 576 * (6 + (6 - floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][3][1])) / 18])
          )
        }
        if (drawingBlock.southFace == 1 && whichBlock[0][i][0] != 5) {
          fill(drawingBlock.southFaceC)
          frontFace(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.southAbove == 1 && whichBlock[0][i][0] != 5) {
          fill(drawingBlock.southAboveC)
          frontAboveHeadWall(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.southMid == 1 && whichBlock[0][i][0] != 5) {
          fill(drawingBlock.southMidC)
          frontMid(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.southShin == 1 && whichBlock[0][i][0] != 5) {
          fill(drawingBlock.southShinC)
          frontShin(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        break;
      case 1:
        if (drawingBlock.floor == 1) {
          fill(drawingBlock.floorC)
          floorTile(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.northShin == 1) {
          fill(drawingBlock.northShinC)
          backShin(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.eastShin == 1) {
          fill(drawingBlock.eastShinC)
          rightShin(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.knee == 1) {
          fill(drawingBlock.kneeC)
          kneeTile(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.northMid == 1) {
          fill(drawingBlock.northMidC)
          backMid(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.eastMid == 1) {
          fill(drawingBlock.eastMidC)
          rightMid(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.ceiling == 1) {
          fill(drawingBlock.ceilingC)
          ceilingTile(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.northAbove == 1) {
          fill(drawingBlock.northAboveC)
          backAboveHeadWall(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.eastAbove == 1) {
          fill(drawingBlock.eastAboveC)
          rightAboveHeadWall(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.head == 1) {
          fill(drawingBlock.headC)
          headHeightTile(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.shoulder == 1) {
          fill(drawingBlock.shoulderC)
          shoulderTile(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.northFace == 1) {
          fill(drawingBlock.northFaceC)
          backFace(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.eastFace == 1) {
          fill(drawingBlock.eastFaceC)
          rightFace(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.hasProp == true) {
          drawingBlock.prop.drawMe(mean([1024 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][0][0] / 32, 1024 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][1][0] / 32,
          1024 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][2][0] / 32, 1024 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][3][0] / 32]),
            mean([576 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][0][1] / 18, 576 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][1][1] / 18,
            576 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][2][1] / 18, 576 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][3][1] / 18]),
            mean([576 * (6 + (6 - floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][0][1])) / 18, 576 * (6 + (6 - floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][1][1])) / 18,
            576 * (6 + (6 - floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][2][1])) / 18, 576 * (6 + (6 - floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][3][1])) / 18])
          )
        }
        if (drawingBlock.hasEnemy == true) {
          drawingBlock.enemy.drawMe(mean([1024 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][0][0] / 32, 1024 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][1][0] / 32,
          1024 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][2][0] / 32, 1024 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][3][0] / 32]),
            mean([576 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][0][1] / 18, 576 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][1][1] / 18,
            576 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][2][1] / 18, 576 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][3][1] / 18]),
            mean([576 * (6 + (6 - floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][0][1])) / 18, 576 * (6 + (6 - floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][1][1])) / 18,
            576 * (6 + (6 - floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][2][1])) / 18, 576 * (6 + (6 - floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][3][1])) / 18])
          )
        }
        if (drawingBlock.westFace == 1 && whichBlock[1][i][0] != 10) {
          fill(drawingBlock.westFaceC)
          leftFace(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.southFace == 1 && whichBlock[1][i][0] != 10) {
          fill(drawingBlock.southFaceC)
          frontFace(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.westAbove == 1 && whichBlock[1][i][0] != 10) {
          fill(drawingBlock.westAboveC)
          leftAboveHeadWall(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.southAbove == 1 && whichBlock[1][i][0] != 10) {
          fill(drawingBlock.southAboveC)
          frontAboveHeadWall(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.westMid == 1 && whichBlock[1][i][0] != 10) {
          fill(drawingBlock.westMidC)
          leftMid(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.southMid == 1 && whichBlock[1][i][0] != 10) {
          fill(drawingBlock.southMidC)
          frontMid(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.westShin == 1 && whichBlock[1][i][0] != 10) {
          fill(drawingBlock.westShinC)
          leftShin(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.southShin == 1 && whichBlock[1][i][0] != 10) {
          fill(drawingBlock.southShinC)
          frontShin(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        break;
      case 2:
        if (drawingBlock.floor == 1) {
          fill(drawingBlock.floorC)
          floorTile(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.eastShin == 1) {
          fill(drawingBlock.eastShinC)
          backShin(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.southShin == 1) {
          fill(drawingBlock.southShinC)
          rightShin(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.northShin == 1) {
          fill(drawingBlock.northShinC)
          leftShin(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.knee == 1) {
          fill(drawingBlock.kneeC)
          kneeTile(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.eastMid == 1) {
          fill(drawingBlock.eastMidC)
          backMid(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.southMid == 1) {
          fill(drawingBlock.southMidC)
          rightMid(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.northMid == 1) {
          fill(drawingBlock.northMidC)
          leftMid(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.ceiling == 1) {
          fill(drawingBlock.ceilingC)
          ceilingTile(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.eastAbove == 1) {
          fill(drawingBlock.eastAboveC)
          backAboveHeadWall(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.southAbove == 1) {
          fill(drawingBlock.southAboveC)
          rightAboveHeadWall(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.northAbove == 1) {
          fill(drawingBlock.northAboveC)
          leftAboveHeadWall(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.head == 1) {
          fill(drawingBlock.headC)
          headHeightTile(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.shoulder == 1) {
          fill(drawingBlock.shoulderC)
          shoulderTile(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.eastFace == 1) {
          fill(drawingBlock.eastFaceC)
          backFace(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.southFace == 1) {
          fill(drawingBlock.southFaceC)
          rightFace(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.northFace == 1) {
          fill(drawingBlock.northFaceC)
          leftFace(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.hasProp == true) {
          drawingBlock.prop.drawMe(mean([1024 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][0][0] / 32, 1024 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][1][0] / 32,
          1024 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][2][0] / 32, 1024 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][3][0] / 32]),
            mean([576 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][0][1] / 18, 576 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][1][1] / 18,
            576 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][2][1] / 18, 576 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][3][1] / 18]),
            mean([576 * (6 + (6 - floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][0][1])) / 18, 576 * (6 + (6 - floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][1][1])) / 18,
            576 * (6 + (6 - floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][2][1])) / 18, 576 * (6 + (6 - floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][3][1])) / 18])
          )
        }
        if (drawingBlock.hasEnemy == true) {
          drawingBlock.enemy.drawMe(mean([1024 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][0][0] / 32, 1024 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][1][0] / 32,
          1024 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][2][0] / 32, 1024 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][3][0] / 32]),
            mean([576 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][0][1] / 18, 576 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][1][1] / 18,
            576 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][2][1] / 18, 576 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][3][1] / 18]),
            mean([576 * (6 + (6 - floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][0][1])) / 18, 576 * (6 + (6 - floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][1][1])) / 18,
            576 * (6 + (6 - floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][2][1])) / 18, 576 * (6 + (6 - floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][3][1])) / 18])
          )
        }
        if (drawingBlock.westFace == 1 && whichBlock[0][i][0] != 5) {
          fill(drawingBlock.westFaceC)
          frontFace(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.westAbove == 1 && whichBlock[0][i][0] != 5) {
          fill(drawingBlock.westAboveC)
          frontAboveHeadWall(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.westMid == 1 && whichBlock[0][i][0] != 5) {
          fill(drawingBlock.westMidC)
          frontMid(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.westShin == 1 && whichBlock[0][i][0] != 5) {
          fill(drawingBlock.westShinC)
          frontShin(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        break;
      case 3:
        if (drawingBlock.floor == 1) {
          fill(drawingBlock.floorC)
          floorTile(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.eastShin == 1) {
          fill(drawingBlock.eastShinC)
          backShin(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.southShin == 1) {
          fill(drawingBlock.southShinC)
          rightShin(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.knee == 1) {
          fill(drawingBlock.kneeC)
          kneeTile(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.eastMid == 1) {
          fill(drawingBlock.eastMidC)
          backMid(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.southMid == 1) {
          fill(drawingBlock.southMidC)
          rightMid(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.ceiling == 1) {
          fill(drawingBlock.ceilingC)
          ceilingTile(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.eastAbove == 1) {
          fill(drawingBlock.eastAboveC)
          backAboveHeadWall(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.southAbove == 1) {
          fill(drawingBlock.southAboveC)
          rightAboveHeadWall(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.head == 1) {
          fill(drawingBlock.headC)
          headHeightTile(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.shoulder == 1) {
          fill(drawingBlock.shoulderC)
          shoulderTile(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.eastFace == 1) {
          fill(drawingBlock.eastFaceC)
          backFace(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.southFace == 1) {
          fill(drawingBlock.southFaceC)
          rightFace(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.hasProp == true) {
          drawingBlock.prop.drawMe(mean([1024 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][0][0] / 32, 1024 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][1][0] / 32,
          1024 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][2][0] / 32, 1024 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][3][0] / 32]),
            mean([576 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][0][1] / 18, 576 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][1][1] / 18,
            576 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][2][1] / 18, 576 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][3][1] / 18]),
            mean([576 * (6 + (6 - floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][0][1])) / 18, 576 * (6 + (6 - floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][1][1])) / 18,
            576 * (6 + (6 - floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][2][1])) / 18, 576 * (6 + (6 - floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][3][1])) / 18])
          )
        }
        if (drawingBlock.hasEnemy == true) {
          drawingBlock.enemy.drawMe(mean([1024 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][0][0] / 32, 1024 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][1][0] / 32,
          1024 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][2][0] / 32, 1024 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][3][0] / 32]),
            mean([576 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][0][1] / 18, 576 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][1][1] / 18,
            576 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][2][1] / 18, 576 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][3][1] / 18]),
            mean([576 * (6 + (6 - floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][0][1])) / 18, 576 * (6 + (6 - floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][1][1])) / 18,
            576 * (6 + (6 - floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][2][1])) / 18, 576 * (6 + (6 - floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][3][1])) / 18])
          )
        }
        if (drawingBlock.northFace == 1 && whichBlock[1][i][0] != 10) {
          fill(drawingBlock.northFaceC)
          leftFace(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.westFace == 1 && whichBlock[1][i][0] != 10) {
          fill(drawingBlock.westFaceC)
          frontFace(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.northAbove == 1 && whichBlock[1][i][0] != 10) {
          fill(drawingBlock.northAboveC)
          leftAboveHeadWall(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.westAbove == 1 && whichBlock[1][i][0] != 10) {
          fill(drawingBlock.westAboveC)
          frontAboveHeadWall(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.northMid == 1 && whichBlock[1][i][0] != 10) {
          fill(drawingBlock.northMidC)
          leftMid(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.westMid == 1 && whichBlock[1][i][0] != 10) {
          fill(drawingBlock.westMidC)
          frontMid(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.northShin == 1 && whichBlock[1][i][0] != 10) {
          fill(drawingBlock.northShinC)
          leftShin(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.westShin == 1 && whichBlock[1][i][0] != 10) {
          fill(drawingBlock.westShinC)
          frontShin(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        break;
      case 4:
        if (drawingBlock.floor == 1) {
          fill(drawingBlock.floorC)
          floorTile(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.southShin == 1) {
          fill(drawingBlock.southShinC)
          backShin(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.westShin == 1) {
          fill(drawingBlock.westShinC)
          rightShin(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.eastShin == 1) {
          fill(drawingBlock.westShinC)
          leftShin(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.knee == 1) {
          fill(drawingBlock.kneeC)
          kneeTile(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.southMid == 1) {
          fill(drawingBlock.southMidC)
          backMid(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.westMid == 1) {
          fill(drawingBlock.westMidC)
          rightMid(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.eastMid == 1) {
          fill(drawingBlock.eastMidC)
          leftMid(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.ceiling == 1) {
          fill(drawingBlock.ceilingC)
          ceilingTile(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.southAbove == 1) {
          fill(drawingBlock.southAboveC)
          backAboveHeadWall(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.westAbove == 1) {
          fill(drawingBlock.westAboveC)
          rightAboveHeadWall(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.eastAbove == 1) {
          fill(drawingBlock.eastAboveC)
          leftAboveHeadWall(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.head == 1) {
          fill(drawingBlock.headC)
          headHeightTile(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.shoulder == 1) {
          fill(drawingBlock.shoulderC)
          shoulderTile(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.southFace == 1) {
          fill(drawingBlock.southFaceC)
          backFace(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.westFace == 1) {
          fill(drawingBlock.westFaceC)
          rightFace(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.eastFace == 1) {
          fill(drawingBlock.eastFaceC)
          leftFace(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.hasProp == true) {
          drawingBlock.prop.drawMe(mean([1024 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][0][0] / 32, 1024 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][1][0] / 32,
          1024 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][2][0] / 32, 1024 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][3][0] / 32]),
            mean([576 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][0][1] / 18, 576 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][1][1] / 18,
            576 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][2][1] / 18, 576 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][3][1] / 18]),
            mean([576 * (6 + (6 - floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][0][1])) / 18, 576 * (6 + (6 - floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][1][1])) / 18,
            576 * (6 + (6 - floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][2][1])) / 18, 576 * (6 + (6 - floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][3][1])) / 18])
          )
        }
        if (drawingBlock.hasEnemy == true) {
          drawingBlock.enemy.drawMe(mean([1024 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][0][0] / 32, 1024 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][1][0] / 32,
          1024 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][2][0] / 32, 1024 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][3][0] / 32]),
            mean([576 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][0][1] / 18, 576 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][1][1] / 18,
            576 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][2][1] / 18, 576 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][3][1] / 18]),
            mean([576 * (6 + (6 - floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][0][1])) / 18, 576 * (6 + (6 - floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][1][1])) / 18,
            576 * (6 + (6 - floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][2][1])) / 18, 576 * (6 + (6 - floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][3][1])) / 18])
          )
        }
        if (drawingBlock.northFace == 1 && whichBlock[0][i][0] != 5) {
          fill(drawingBlock.northFaceC)
          frontFace(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.northAbove == 1 && whichBlock[0][i][0] != 5) {
          fill(drawingBlock.northAboveC)
          frontAboveHeadWall(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.northMid == 1 && whichBlock[0][i][0] != 5) {
          fill(drawingBlock.northMidC)
          frontMid(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.northShin == 1 && whichBlock[0][i][0] != 5) {
          fill(drawingBlock.northShinC)
          frontShin(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        break;
      case 5:
        if (drawingBlock.floor == 1) {
          fill(drawingBlock.floorC)
          floorTile(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.southShin == 1) {
          fill(drawingBlock.southShinC)
          backShin(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.westShin == 1) {
          fill(drawingBlock.westShinC)
          rightShin(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.knee == 1) {
          fill(drawingBlock.kneeC)
          kneeTile(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.southMid == 1) {
          fill(drawingBlock.southMidC)
          backMid(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.westMid == 1) {
          fill(drawingBlock.westMidC)
          rightMid(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.ceiling == 1) {
          fill(drawingBlock.ceilingC)
          ceilingTile(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.southAbove == 1) {
          fill(drawingBlock.southAboveC)
          backAboveHeadWall(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.westAbove == 1) {
          fill(drawingBlock.westAboveC)
          rightAboveHeadWall(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.head == 1) {
          fill(drawingBlock.headC)
          headHeightTile(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.shoulder == 1) {
          fill(drawingBlock.shoulderC)
          shoulderTile(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.southFace == 1) {
          fill(drawingBlock.southFaceC)
          backFace(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.westFace == 1) {
          fill(drawingBlock.westFaceC)
          rightFace(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.hasProp == true) {
          drawingBlock.prop.drawMe(mean([1024 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][0][0] / 32, 1024 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][1][0] / 32,
          1024 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][2][0] / 32, 1024 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][3][0] / 32]),
            mean([576 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][0][1] / 18, 576 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][1][1] / 18,
            576 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][2][1] / 18, 576 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][3][1] / 18]),
            mean([576 * (6 + (6 - floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][0][1])) / 18, 576 * (6 + (6 - floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][1][1])) / 18,
            576 * (6 + (6 - floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][2][1])) / 18, 576 * (6 + (6 - floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][3][1])) / 18])
          )
        }
        if (drawingBlock.hasEnemy == true) {
          drawingBlock.enemy.drawMe(mean([1024 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][0][0] / 32, 1024 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][1][0] / 32,
          1024 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][2][0] / 32, 1024 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][3][0] / 32]),
            mean([576 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][0][1] / 18, 576 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][1][1] / 18,
            576 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][2][1] / 18, 576 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][3][1] / 18]),
            mean([576 * (6 + (6 - floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][0][1])) / 18, 576 * (6 + (6 - floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][1][1])) / 18,
            576 * (6 + (6 - floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][2][1])) / 18, 576 * (6 + (6 - floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][3][1])) / 18])
          )
        }
        if (drawingBlock.eastFace == 1 && whichBlock[1][i][0] != 10) {
          fill(drawingBlock.eastFaceC)
          leftFace(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.northFace == 1 && whichBlock[1][i][0] != 10) {
          fill(drawingBlock.northFaceC)
          frontFace(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.eastAbove == 1 && whichBlock[1][i][0] != 10) {
          fill(drawingBlock.eastAboveC)
          leftAboveHeadWall(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.northAbove == 1 && whichBlock[1][i][0] != 10) {
          fill(drawingBlock.northAboveC)
          frontAboveHeadWall(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.eastMid == 1 && whichBlock[1][i][0] != 10) {
          fill(drawingBlock.eastMidC)
          leftMid(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.northMid == 1 && whichBlock[1][i][0] != 10) {
          fill(drawingBlock.northMidC)
          frontMid(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.eastShin == 1 && whichBlock[1][i][0] != 10) {
          fill(drawingBlock.eastShinC)
          leftShin(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.northShin == 1 && whichBlock[1][i][0] != 10) {
          fill(drawingBlock.northShinC)
          frontShin(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        break;
      case 6:
        if (drawingBlock.floor == 1) {
          fill(drawingBlock.floorC)
          floorTile(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.westShin == 1) {
          fill(drawingBlock.westShinC)
          backShin(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.northShin == 1) {
          fill(drawingBlock.northShinC)
          rightShin(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.southShin == 1) {
          fill(drawingBlock.southShinC)
          leftShin(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.knee == 1) {
          fill(drawingBlock.kneeC)
          kneeTile(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.westMid == 1) {
          fill(drawingBlock.westMidC)
          backMid(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.northMid == 1) {
          fill(drawingBlock.northMidC)
          rightMid(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.southMid == 1) {
          fill(drawingBlock.southMidC)
          leftMid(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.ceiling == 1) {
          fill(drawingBlock.ceilingC)
          ceilingTile(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.westAbove == 1) {
          fill(drawingBlock.westAboveC)
          backAboveHeadWall(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.northAbove == 1) {
          fill(drawingBlock.northAboveC)
          rightAboveHeadWall(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.southAbove == 1) {
          fill(drawingBlock.southAboveC)
          leftAboveHeadWall(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.head == 1) {
          fill(drawingBlock.headC)
          headHeightTile(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.shoulder == 1) {
          fill(drawingBlock.shoulderC)
          shoulderTile(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.westFace == 1) {
          fill(drawingBlock.westFaceC)
          backFace(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.northFace == 1) {
          fill(drawingBlock.northFaceC)
          rightFace(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.southFace == 1) {
          fill(drawingBlock.southFaceC)
          leftFace(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.hasProp == true) {
          drawingBlock.prop.drawMe(mean([1024 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][0][0] / 32, 1024 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][1][0] / 32,
          1024 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][2][0] / 32, 1024 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][3][0] / 32]),
            mean([576 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][0][1] / 18, 576 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][1][1] / 18,
            576 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][2][1] / 18, 576 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][3][1] / 18]),
            mean([576 * (6 + (6 - floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][0][1])) / 18, 576 * (6 + (6 - floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][1][1])) / 18,
            576 * (6 + (6 - floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][2][1])) / 18, 576 * (6 + (6 - floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][3][1])) / 18])
          )
        }
        if (drawingBlock.hasEnemy == true) {
          drawingBlock.enemy.drawMe(mean([1024 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][0][0] / 32, 1024 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][1][0] / 32,
          1024 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][2][0] / 32, 1024 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][3][0] / 32]),
            mean([576 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][0][1] / 18, 576 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][1][1] / 18,
            576 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][2][1] / 18, 576 * floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][3][1] / 18]),
            mean([576 * (6 + (6 - floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][0][1])) / 18, 576 * (6 + (6 - floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][1][1])) / 18,
            576 * (6 + (6 - floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][2][1])) / 18, 576 * (6 + (6 - floors90[whichBlock[0][i][0]][whichBlock[0][i][1]][3][1])) / 18])
          )
        }
        if (drawingBlock.eastFace == 1 && whichBlock[0][i][0] != 5) {
          fill(drawingBlock.eastFaceC)
          frontFace(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.eastAbove == 1 && whichBlock[0][i][0] != 5) {
          fill(drawingBlock.eastAboveC)
          frontAboveHeadWall(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.eastMid == 1 && whichBlock[0][i][0] != 5) {
          fill(drawingBlock.eastMidC)
          frontMid(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        if (drawingBlock.eastShin == 1 && whichBlock[0][i][0] != 5) {
          fill(drawingBlock.eastShinC)
          frontShin(floors90, whichBlock[0][i][0], whichBlock[0][i][1])
        }
        break;
      case 7:
        if (drawingBlock.floor == 1) {
          fill(drawingBlock.floorC)
          floorTile(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.westShin == 1) {
          fill(drawingBlock.westShinC)
          backShin(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.northShin == 1) {
          fill(drawingBlock.northShinC)
          rightShin(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.knee == 1) {
          fill(drawingBlock.kneeC)
          kneeTile(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.westMid == 1) {
          fill(drawingBlock.westMidC)
          backMid(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.northMid == 1) {
          fill(drawingBlock.northMidC)
          rightMid(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.ceiling == 1) {
          fill(drawingBlock.ceilingC)
          ceilingTile(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.westAbove == 1) {
          fill(drawingBlock.westAboveC)
          backAboveHeadWall(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.northAbove == 1) {
          fill(drawingBlock.northAboveC)
          rightAboveHeadWall(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.head == 1) {
          fill(drawingBlock.headC) //hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
          headHeightTile(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.shoulder == 1) {
          fill(drawingBlock.shoulderC)
          shoulderTile(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.westFace == 1) {
          fill(drawingBlock.westFaceC)
          backFace(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.northFace == 1) {
          fill(drawingBlock.northFaceC)
          rightFace(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.hasProp == true) {
          drawingBlock.prop.drawMe(mean([1024 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][0][0] / 32, 1024 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][1][0] / 32,
          1024 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][2][0] / 32, 1024 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][3][0] / 32]),
            mean([576 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][0][1] / 18, 576 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][1][1] / 18,
            576 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][2][1] / 18, 576 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][3][1] / 18]),
            mean([576 * (6 + (6 - floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][0][1])) / 18, 576 * (6 + (6 - floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][1][1])) / 18,
            576 * (6 + (6 - floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][2][1])) / 18, 576 * (6 + (6 - floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][3][1])) / 18])
          )
        }
        if (drawingBlock.hasEnemy == true) {
          drawingBlock.enemy.drawMe(mean([1024 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][0][0] / 32, 1024 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][1][0] / 32,
          1024 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][2][0] / 32, 1024 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][3][0] / 32]),
            mean([576 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][0][1] / 18, 576 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][1][1] / 18,
            576 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][2][1] / 18, 576 * floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][3][1] / 18]),
            mean([576 * (6 + (6 - floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][0][1])) / 18, 576 * (6 + (6 - floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][1][1])) / 18,
            576 * (6 + (6 - floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][2][1])) / 18, 576 * (6 + (6 - floors45[whichBlock[1][i][0]][whichBlock[1][i][1]][3][1])) / 18])
          )
        }
        if (drawingBlock.southFace == 1 && whichBlock[1][i][0] != 10) {
          fill(drawingBlock.southFaceC)
          leftFace(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.eastFace == 1 && whichBlock[1][i][0] != 10) {
          fill(drawingBlock.eastFaceC)
          frontFace(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.southAbove == 1 && whichBlock[1][i][0] != 10) {
          fill(drawingBlock.southAboveC)
          leftAboveHeadWall(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.eastAbove == 1 && whichBlock[1][i][0] != 10) {
          fill(drawingBlock.eastAboveC)
          frontAboveHeadWall(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.southMid == 1 && whichBlock[1][i][0] != 10) {
          fill(drawingBlock.southMidC)
          leftMid(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.eastMid == 1 && whichBlock[1][i][0] != 10) {
          fill(drawingBlock.eastMidC)
          frontMid(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.southShin == 1 && whichBlock[1][i][0] != 10) {
          fill(drawingBlock.southShinC)
          leftShin(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        if (drawingBlock.eastShin == 1 && whichBlock[1][i][0] != 10) {
          fill(drawingBlock.eastShinC)
          frontShin(floors45, whichBlock[1][i][0], whichBlock[1][i][1])
        }
        break;
    }
  }
} //checks where the player is and draws everything that needs to be seen

function uiDraw() {
  fill([127, 127, 127, 127])
  rect(0, 0, 112, 112)
  rect(948, 520, 124, 176)
  for (let i = -3; i < 4; i++) {
    for (let j = -3; j < 4; j++) {
      if (currentMap[player.coords[0] + i][player.coords[1] + j].floor == 1) {
        fill(currentMap[player.coords[0] + i][player.coords[1] + j].floorC)
        strokeWeight(0.1)
        rect(48 + 16 * j, 48 + 16 * i, 16, 16)
      }
      else if (currentMap[player.coords[0] + i][player.coords[1] + j].knee == 1) {
        fill(currentMap[player.coords[0] + i][player.coords[1] + j].kneeC)
        strokeWeight(0.1)
        rect(48 + 16 * j, 48 + 16 * i, 16, 16)
      }
      else if (currentMap[player.coords[0] + i][player.coords[1] + j].shoulder == 1) {
        fill(currentMap[player.coords[0] + i][player.coords[1] + j].shoulderC)
        strokeWeight(0.1)
        rect(48 + 16 * j, 48 + 16 * i, 16, 16)
      }
      else if (currentMap[player.coords[0] + i][player.coords[1] + j].head == 1) {
        fill(currentMap[player.coords[0] + i][player.coords[1] + j].headC)
        strokeWeight(0.1)
        rect(48 + 16 * j, 48 + 16 * i, 16, 16)
      }
      else if (currentMap[player.coords[0] + i][player.coords[1] + j].ceiling == 1) {
        fill(currentMap[player.coords[0] + i][player.coords[1] + j].ceilingC)
        strokeWeight(0.1)
        rect(48 + 16 * j, 48 + 16 * i, 16, 16)
      }
      if (currentMap[player.coords[0] + i][player.coords[1] + j].solidNorth == 1){
        strokeWeight(1)
        line(48 + 16 * j, 48 + 16 * i, 64 + 16 * j, 48 + 16 * i)
      }
      if (currentMap[player.coords[0] + i][player.coords[1] + j].solidEast == 1){
        strokeWeight(1)
        line(64 + 16 * j, 48 + 16 * i, 64 + 16 * j, 64 + 16 * i)
      }
      if (currentMap[player.coords[0] + i][player.coords[1] + j].solidSouth == 1){
        strokeWeight(1)
        line(64 + 16 * j, 64 + 16 * i, 48 + 16 * j, 64 + 16 * i)
      }
      if (currentMap[player.coords[0] + i][player.coords[1] + j].solidWest == 1){
        strokeWeight(1)
        line(48 + 16 * j, 64 + 16 * i, 48 + 16 * j, 48 + 16 * i)
      }
      if (currentMap[player.coords[0] + i][player.coords[1] + j].hasProp == 1){
        image(currentMap[player.coords[0] + i][player.coords[1] + j].prop.spriteSheet,
          48 + 16 * j, 48 + 16 * i, 16, 16,
          currentMap[player.coords[0] + i][player.coords[1] + j].prop.spriteWidth * currentMap[player.coords[0] + i][player.coords[1] + j].prop.xFrame, currentMap[player.coords[0] + i][player.coords[1] + j].prop.spriteHeight * currentMap[player.coords[0] + i][player.coords[1] + j].prop.yFrame,
          currentMap[player.coords[0] + i][player.coords[1] + j].prop.spriteWidth, currentMap[player.coords[0] + i][player.coords[1] + j].prop.spriteHeight)
      }
      if (currentMap[player.coords[0] + i][player.coords[1] + j].hasEnemy == 1){
        image(currentMap[player.coords[0] + i][player.coords[1] + j].enemy.spriteSheet,
          48 + 16 * j, 48 + 16 * i, 16, 16,
          currentMap[player.coords[0] + i][player.coords[1] + j].enemy.spriteWidth * 12, 0,
          currentMap[player.coords[0] + i][player.coords[1] + j].enemy.spriteWidth, currentMap[player.coords[0] + i][player.coords[1] + j].enemy.spriteHeight)
      }
    }
  }
  image(mapSpriteSs,
    48, 48,
    16, 16,
    100 * player.direction, 0,
    100, 100
  )
  strokeWeight(2)
  fill(0)
  fill(255)
  text(player.inv[player.equipped.amType] + '/' + invMaxes[player.equipped.amType], 990, 552)
  strokeWeight(1)
}
//end of drawing functions