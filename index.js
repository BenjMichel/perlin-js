function lerp(a0, a1, w) {
  return a1 * w + a0 * (1 - w);
}

function dotGridGradient(gradient, ix, iy, x, y, normalRatio) {

    // Precomputed (or otherwise) gradient vectors at each grid node
    // extern float Gradient[IYMAX][IXMAX][2];

    // Compute the distance vector
    const dx = x - ix;
    const dy = y - iy;

    // Compute the dot-product
    // console.log({ dot: (dx * gradient[iy][ix][0] + dy * gradient[iy][ix][1]) * normalRatio })
    // console.log({ dx, dy, ix, iy, gradient, normalRatio, dot: (dx * gradient[iy][ix][0] + dy * gradient[iy][ix][1]) * normalRatio })
    return (dx * gradient[iy][ix][0] + dy * gradient[iy][ix][1]) * normalRatio;
}

function randomVector() {
  return [Math.random(), Math.random()]
}

function generateGradient(width, height) {
  const gradient = [];
  for (var i = 0; i <= width; i++) {
    gradient.push([])
    for (var j = 0; j <= height; j++) {
      gradient[i].push(randomVector())
    }
  }
  return gradient;
}

function perlin(gradient, x, y, imageWidth, imageHeight, gradientWidth, gradientHeight) {
  // Determine grid cell coordinates
  const normalRatioW = gradientWidth / imageWidth;
  const normalRatioH = gradientHeight / imageHeight;
  const normalRatio = normalRatioW * normalRatioH;
  const x0 = Math.floor(x * normalRatioW);
  const x1 = x0 + 1;
  const y0 = Math.floor(y * normalRatioH);
  const y1 = y0 + 1;

  // Determine interpolation weights
  // Could also use higher order polynomial/s-curve here
  const sx = x - x0;
  const sy = y - y0;

  // Interpolate between grid point gradients
  let n0, n1, ix0, ix1, value;

  n0 = dotGridGradient(gradient, x0, y0, x, y, normalRatio);
  n1 = dotGridGradient(gradient, x1, y0, x, y, normalRatio);
  ix0 = lerp(n0, n1, sx);

  n0 = dotGridGradient(gradient, x0, y1, x, y, normalRatio);
  n1 = dotGridGradient(gradient, x1, y1, x, y, normalRatio);
  ix1 = lerp(n0, n1, sx);

  value = lerp(ix0, ix1, sy);
  return value;
}


function generatePerlinNoise(imageWidth, imageHeight) {
  const gradientWidth = 4;
  const gradientHeight = 4;
  const gradient = generateGradient(gradientWidth, gradientHeight);
  console.log({ gradient })
  const image = []
  for (var i = 0; i < imageWidth; i++) {
    image.push([])
    for (var j = 0; j < imageHeight; j++) {
      image[i].push(perlin(gradient, i, j, imageWidth, imageHeight, gradientWidth, gradientHeight))
    }
  }
  return image;
}

function initCanvas() {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');

  context.scale(2, 2);

  const imageHeight = 200;
  const imageWidth = 200;
  const perlinNoise = generatePerlinNoise(imageWidth, imageHeight);
  console.log(perlinNoise);
  for (var i = 0; i < imageWidth; i++) {
    for (var j = 0; j < imageHeight; j++) {
      const ratio = Math.max(Math.min((perlinNoise[i][j] * 128) + 128, 255), 0);
      context.fillStyle = `rgba(${ratio},${ratio},${ratio},1)`;
      context.fillRect(i, j, 1, 1);
    }
  }
}

initCanvas();
