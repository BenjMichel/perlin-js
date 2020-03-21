const {
  generateGradient,
  interpolateLinear,
  normalize,
  getCoordinate0
  // getDotGridGradient
} = require('./perlin')

test('generateGradient', () => {
  const gradient = generateGradient(2, 4)
  expect(gradient.length).toBe(2)
  expect(gradient[0].length).toBe(4)
  expect(gradient[1].length).toBe(4)
  expect(gradient[0][0][0]).toBeGreaterThanOrEqual(0)
  expect(gradient[0][0][0]).toBeLessThanOrEqual(1)
  expect(gradient[0][0][1]).toBeGreaterThanOrEqual(0)
  expect(gradient[0][0][1]).toBeLessThanOrEqual(1)
})

test('interpolateLinear', () => {
  expect(interpolateLinear(0, 1, 0)).toBe(0)
  expect(interpolateLinear(0, 1, 1)).toBe(1)
  expect(interpolateLinear(0, 1, 0.75)).toBe(0.896484375)
  expect(interpolateLinear(5, -3, 0.25)).toBe(4.171875)
})

test('getCoordinate0', () => {
  let x = 5
  const imageWidth = 20
  const gradientWidth = 3
  expect(getCoordinate0(x, imageWidth, gradientWidth)).toEqual(0)
  x = 13
  expect(getCoordinate0(x, imageWidth, gradientWidth)).toEqual(1)
})

test('normalize', () => {
  const image = [
    [0, -2],
    [1, 2]
  ]
  expect(normalize(image)).toEqual([
    [0.5, 0],
    [0.75, 1]
  ])
  const image2 = [
    [0.5, 0.6],
    [0.55, 0.55]
  ]
  expect(normalize(image2)).toEqual([
    [0, 1],
    [0.5000000000000006, 0.5000000000000006] // float representation error
  ])
})

// test('getDotGridGradient', () => {
//   expect(getDotGridGradient()).toEqual();
// })
