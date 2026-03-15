/**
 * Samples text positions by rendering skill names to an offscreen canvas
 * and extracting white pixel positions for particle targeting.
 */
export async function sampleTextPositions(
  lines: string[],
  width: number,
  height: number,
  maxParticles: number
): Promise<Float32Array> {
  // Wait for Space Grotesk to be loaded
  await document.fonts.ready;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;

  // Auto-scale font size based on line count and canvas size
  const fontSize = Math.min(36, Math.floor(height / (lines.length * 2.2)));
  const lineHeight = fontSize * 1.6;
  const totalTextHeight = lines.length * lineHeight;
  const startY = (height - totalTextHeight) / 2 + fontSize;

  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "#FFFFFF";
  ctx.font = `bold ${fontSize}px "Space Grotesk", sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], width / 2, startY + i * lineHeight);
  }

  // Sample white pixel positions
  const imageData = ctx.getImageData(0, 0, width, height);
  const pixels = imageData.data;
  const positions: [number, number][] = [];

  // Sample every few pixels for performance
  const step = 2;
  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const idx = (y * width + x) * 4;
      if (pixels[idx] > 128) {
        positions.push([x, y]);
      }
    }
  }

  // Subsample to maxParticles if needed
  const sampled: [number, number][] = [];
  if (positions.length <= maxParticles) {
    sampled.push(...positions);
  } else {
    // Evenly subsample
    const stride = positions.length / maxParticles;
    for (let i = 0; i < maxParticles; i++) {
      sampled.push(positions[Math.floor(i * stride)]);
    }
  }

  // Convert to Three.js world coords (centered, Y-flipped)
  // Orthographic camera maps [-width/2, width/2] x [-height/2, height/2]
  const result = new Float32Array(maxParticles * 3);
  const halfW = width / 2;
  const halfH = height / 2;

  for (let i = 0; i < maxParticles; i++) {
    if (i < sampled.length) {
      result[i * 3] = sampled[i][0] - halfW;
      result[i * 3 + 1] = -(sampled[i][1] - halfH); // Y-flip
      result[i * 3 + 2] = 0;
    } else {
      // Surplus particles go far off-screen to fade via radial shader
      result[i * 3] = (Math.random() - 0.5) * width * 3;
      result[i * 3 + 1] = (Math.random() - 0.5) * height * 3;
      result[i * 3 + 2] = 0;
    }
  }

  return result;
}
