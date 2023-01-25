const ShipFactory = require('../ship/Ship').default

const GameboardFactory = function () {
  const isNumeric = /^[0-9]*$/
  const board = createBoard()
  const info = {
    numOfShips: 0,
    numOfShipsLength1: 0,
    numOfShipsLength2: 0,
    numOfShipsLength3: 0,
    numOfShipsLength4: 0,
    numOfSunkShips: 0
  }
  const rules = {
    numOfShips: 10,
    numOfShipsLength1: 4,
    numOfShipsLength2: 3,
    numOfShipsLength3: 2,
    numOfShipsLength4: 1
  }
  function createBoard () {
    const board = []
    for (let x = 0; x < 10; x++) {
      board.push([])
      for (let y = 0; y < 10; y++) {
        board[x].push([])
      }
    }
    return board
  };
  function isAdjecentFree (coord) {
    const coordX = coord[0]
    const coordY = coord[1]
    const shiftX = [-1, 0, 1]
    const shiftY = [-1, 0, 1]
    const locations = []
    for (const x of shiftX) {
      for (const y of shiftY) {
        //
        locations.push(board?.[coordX + x]?.[coordY + y])
      }
    }
    const isLocationAvailable = locations.map(x => !!((x === undefined || x.length === 0)))

    return !(isLocationAvailable.filter(x => x === false).length > 0)
  }
  const gameboardController = {
    placeShip: function (...coords) {
      // input validation
      // check if input is numeric
      const atomicInput = coords.flat(Infinity)
      if (atomicInput.some(x => isNumeric.test(x) === false)) return false
      // check for input lenght
      const shipLength = coords.length
      if (shipLength === 0) return false
      if (shipLength > 4) return false
      // check if coords single item is in format [x,y]
      coords.forEach(coord => {
        const x = coord[0]
        const y = coord[1]
        if (x < 0 || x > 9) return false
      })
      // check if coords are adjecent to eachother
      const xCoords = []
      const yCoords = []
      coords.forEach(coord => {
        xCoords.push(coord[0])
        yCoords.push(coord[1])
      })
      xCoords.sort().reverse()
      yCoords.sort().reverse()
      const checkerX = xCoords.reduce((prev, next) => {
        const diff = prev - next
        if (diff > 1) return 'incorrect' //
      })
      const checkerY = yCoords.reduce((prev, next) => {
        const diff = prev - next
        if (diff > 1) return 'incorrect' //
      })
      if (checkerX == 'incorrect' || checkerY == 'incorrect') return false
      // check if coords are not duplicated
      // TO BE IMPLEMENTED

      // board validation
      // check if corresponding spots to input coords are empty
      const shipLocation = coords.map(coord => board[coord[0]][coord[1]])

      const isAvailable = shipLocation.filter(location => location.length > 0).length === 0
      if (isAvailable === false) return false
      // check if other ships does not already exist in adjecent spots to coords

      const isLocationFree = !coords.map(coord => isAdjecentFree(coord)).includes(false)

      if (isLocationFree === false) return false //

      // check if maximum amount of ship type is reached
      if (info[`numOfShipsLength${shipLength}`] === rules[`numOfShipsLength${shipLength}`]) return false //

      // when input and board validated
      // create Ship object with proper length
      const ship = ShipFactory(shipLength)
      coords.forEach(coord => {
        board[coord[0]][coord[1]] = ship
        board[coord[0]][coord[1]].hit()
      })
      // add ship to statistics
      info.numOfShips++
      info[`numOfShipsLength${shipLength}`]++
      // return true/truthy value
      return true //
    },
    showBoard: function () {

    },
    status: function () {
      return info
    }
  }
  return gameboardController
}

const gameboard = GameboardFactory()

module.exports = { default: GameboardFactory }
