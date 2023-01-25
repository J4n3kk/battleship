const ship = require('./Ship').default

it('creates new instance of Ship', () => {
  expect(ship(3)).toStrictEqual({
    length: 3,
    timesHit: 0
  })
})

it('isSunk does not work', () => {
  expect(ship(0).isSunk()).toBe(true)
  expect(ship(1).isSunk()).toBe(false)
})

it('adding hit does not work', () => {
  const shipObject = ship(2)
  shipObject.hit()
  expect(shipObject.timesHit).toBe(1)
  shipObject.hit()
  expect(shipObject.timesHit).toBe(2)
  expect(shipObject.isSunk()).toBe(true)
})
