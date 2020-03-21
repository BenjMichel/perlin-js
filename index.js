/* eslint-disable no-undef */
function initCanvas () {
  const canvas = document.getElementById('canvas')
  const context = canvas.getContext('2d')

  const scale = 1
  context.scale(scale, scale)
  context.translate(0.5, 0.5)

  const imageHeight = 1000
  const imageWidth = 1000
  const gradientSize = 10
  const perlinNoise = generatePerlinNoise(imageWidth, imageHeight, gradientSize, gradientSize)
  for (var i = 0; i < imageWidth; i++) {
    for (var j = 0; j < imageHeight; j++) {
      const ratio = perlinNoise[i][j] * 255
      context.fillStyle = `rgba(${ratio},${ratio},${ratio},1)`
      context.fillRect(i, j, 1, 1)
    }
  }
}

initCanvas()
