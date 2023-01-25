function shipFactory(shipLength){
  let ship = Object.create(shipFactory.prototype);
  ship.length = shipLength,
  ship.timesHit = 0;
  return ship
}
shipFactory.prototype = {
  isSunk: function(){
    return this.lenght - this.timesHit === 0 ? true : false
  },
  hit: function(){
    this.timesHit++
  }
}

module.exports = {default: shipFactory}
