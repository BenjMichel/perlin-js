function randomVector () {
  return [Math.random(), Math.random()]
}

function generateGradient (width, height) {
  const gradient = []
  for (var i = 0; i < width; i++) {
    gradient.push([])
    for (var j = 0; j < height; j++) {
      gradient[i].push(randomVector())
    }
  }
  return gradient
}

function interpolateLinear (a0, a1, w) {
  return (a0 * (1 - w)) + (a1 * w)
}

function getIntervalSize (imageSize, gradientSize) {
  return imageSize / (gradientSize - 1)
}

function getDotGridGradient (gradient, ix, iy, x, y, imageWidth, imageHeight, gradientWidth, gradientHeight) {
  // Compute the distance vector
  const dx = x - ix * getIntervalSize(imageWidth, gradientWidth)
  const dy = y - iy * getIntervalSize(imageHeight, gradientHeight)

  // Compute the dot-product
  return (dx * gradient[ix][iy][0]) + (dy * gradient[ix][iy][1])
}

// coordinate = x or Y
// imageSize = imageWidth or imageHeight
// gradientSize = gradientWidth or gradientHeight
function getCoordinate0 (coordinate, imageSize, gradientSize) {
  const intervalSize = getIntervalSize(imageSize, gradientSize)
  return Math.floor(coordinate / intervalSize)
}

function getX0 (x, imageWidth, gradientWidth) {
  return getCoordinate0(x, imageWidth, gradientWidth)
}

function getY0 (y, imageHeight, gradientHeight) {
  return getCoordinate0(y, imageHeight, gradientHeight)
}

function perlin (gradient, x, y, imageWidth, imageHeight, gradientWidth, gradientHeight) {
  // Determine grid cell coordinates
  const x0 = getX0(x, imageWidth, gradientWidth)
  const x1 = x0 + 1
  const y0 = getY0(y, imageHeight, gradientHeight)
  const y1 = y0 + 1

  // Determine interpolation weights
  // Could also use higher order polynomial/s-curve here
  const sx = (x / getIntervalSize(imageWidth, gradientWidth)) - x0
  const sy = (y / getIntervalSize(imageWidth, gradientWidth)) - y0

  // Interpolate between grid point gradients
  const n0 = getDotGridGradient(gradient, x0, y0, x, y, imageWidth, imageHeight, gradientWidth, gradientHeight)
  const n1 = getDotGridGradient(gradient, x1, y0, x, y, imageWidth, imageHeight, gradientWidth, gradientHeight)
  const ix0 = interpolateLinear(n0, n1, sx)
  //
  const n2 = getDotGridGradient(gradient, x0, y1, x, y, imageWidth, imageHeight, gradientWidth, gradientHeight)
  const n3 = getDotGridGradient(gradient, x1, y1, x, y, imageWidth, imageHeight, gradientWidth, gradientHeight)
  const ix1 = interpolateLinear(n2, n3, sx)

  return interpolateLinear(ix0, ix1, sy)
}

function normalize (image) {
  const imageWidth = image.length
  const imageHeight = image[0].length
  let perlinValue, i, j
  let perlinValueMax = image[0][0]
  let perlinValueMin = image[0][0]
  for (i = 0; i < imageWidth; i++) {
    for (j = 0; j < imageHeight; j++) {
      perlinValue = image[i][j]
      perlinValueMin = Math.min(perlinValueMin, perlinValue)
      perlinValueMax = Math.max(perlinValueMax, perlinValue)
    }
  }
  perlinValueMax -= perlinValueMin
  for (i = 0; i < imageWidth; i++) {
    for (j = 0; j < imageHeight; j++) {
      image[i][j] -= perlinValueMin
      image[i][j] /= perlinValueMax
    }
  }
  return image
}

function generatePerlinNoise (imageWidth, imageHeight) {
  const gradientWidth = 4
  const gradientHeight = 4
  const gradient = generateGradient(gradientWidth, gradientHeight)
  const image = []
  let perlinValue, i, j
  for (i = 0; i < imageWidth; i++) {
    image.push([])
    for (j = 0; j < imageHeight; j++) {
      perlinValue = perlin(gradient, i, j, imageWidth, imageHeight, gradientWidth, gradientHeight)
      if (i <= 6 && i >= 4 && j >= 4 && j <= 6) {
        console.log({ i, j, perlinValue })
      }
      image[i].push(perlinValue)
    }
  }
  return normalize(image)
}

if (typeof module !== 'undefined') {
  module.exports = {
    generateGradient,
    interpolateLinear,
    getDotGridGradient,
    perlin,
    normalize,
    getCoordinate0,
    generatePerlinNoise
  }
}
