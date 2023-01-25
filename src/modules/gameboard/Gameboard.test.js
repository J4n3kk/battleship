// beforeEach/beforeAll/afterAllafterEach
// toHaveProperty
// test functions only 
// function to test 
// placeShip
// receiveAttack
// isEmpty?
// describe for every function 
const Gameboard = require('./Gameboard').default 
let gameboard;

beforeEach(() => {
  gameboard = Gameboard()
})

describe('placeShip function', () => {
  describe('correct input', () => {
    test('placing ship with lenght one',()=> {
      expect(gameboard.placeShip([1,4])).toBeTruthy()
      expect(gameboard.status()).toHaveProperty('numOfShips', 1)
    })
    test('placing ship with lenght more than one', () => {
      expect(gameboard.placeShip([0,0],[0,1],[0,2])).toBeTruthy()
      expect(gameboard.status()).toHaveProperty('numOfShips', 1)
      expect(gameboard.placeShip([2,0],[2,1],[2,2],[2,3])).toBeTruthy()
      expect(gameboard.status()).toHaveProperty('numOfShips', 2)
    })
  })
  describe('incorrect input', () => {
    test('create ship for same coords twice', () => {
      expect(gameboard.placeShip([1,1])).toBeTruthy()
      expect(gameboard.placeShip([1,1])).toBeFalsy()
      expect(gameboard.status()).toHaveProperty('numOfShips', 1)
    })
    test('create ship outside board scope', () => {
      expect(gameboard.placeShip([-2,-2])).toBeFalsy()
      expect(gameboard.placeShip([0,2],[0,1],[0,0],[0,-1])).toBeFalsy()
      expect(gameboard.status()).toHaveProperty('numOfShips', 0)
    })
    test('create ship directly to existing ship', () => {
      expect(gameboard.placeShip([0,0])).toBeTruthy()
      expect(gameboard.placeShip([1,1])).toBeFalsy()
      expect(gameboard.status()).toHaveProperty('numOfShips', 1)
    })
    test('create ship with lenght more than 4', () => {
      expect(gameboard.placeShip([0,1],[0,2],[0,3],[0,4],[0,5])).toBeFalsy()
    })
    test('create more ships than allowed - lenght: 1', () => {
      gameboard.placeShip([0,1])
      gameboard.placeShip([0,3])
      gameboard.placeShip([0,5])
      gameboard.placeShip([0,7])
      gameboard.placeShip([0,9])      
      expect(gameboard.status()).toHaveProperty('numOfShips',4)
    })
    test('create more ships than allowed - lenght: 4', () => {
      expect(gameboard.placeShip([0,0],[0,1],[0,2],[0,3])).toBeTruthy()
      expect(gameboard.placeShip([4,0],[4,1],[4,2],[4,3])).toBeFalsy()
      expect(gameboard.status()).toHaveProperty('numOfShips', 1)
    })
  })
})
