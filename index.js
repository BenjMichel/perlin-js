function initCanvas () {
  const canvas = document.getElementById('canvas')
  const context = canvas.getContext('2d')

  const scale = 2
  context.scale(scale, scale)
  context.translate(0.5, 0.5)

  const imageHeight = 200
  const imageWidth = 200
  /* eslint-disable-next-line no-undef */
  const perlinNoise = generatePerlinNoise(imageWidth, imageHeight)
  console.log(perlinNoise)
  for (var i = 0; i < imageWidth; i++) {
    for (var j = 0; j < imageHeight; j++) {
      const ratio = perlinNoise[i][j] * 255
      context.fillStyle = `rgba(${ratio},${ratio},${ratio},1)`
      context.fillRect(i, j, 1, 1)
    }
  }
}

initCanvas()
