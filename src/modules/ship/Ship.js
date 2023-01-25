function shipFactory (shipLength) {
  const ship = Object.create(shipFactory.prototype)
  ship.length = shipLength
  ship.timesHit = 0
  return ship
}
shipFactory.prototype = {
  isSunk: function () {
    return this.length - this.timesHit === 0
  },
  hit: function () {
    this.timesHit++
  }
}

module.exports = { default: shipFactory }
