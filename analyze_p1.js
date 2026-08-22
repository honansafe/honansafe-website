(() => {
  const img = document.querySelector('img');
  const c = document.createElement('canvas');
  c.width = img.naturalWidth;
  c.height = img.naturalHeight;
  const ctx = c.getContext('2d');
  ctx.drawImage(img, 0, 0);
  const d = ctx.getImageData(0, 0, c.width, c.height).data;
  const px = (x, y) => {
    const i = (y * c.width + x) * 4;
    return [d[i], d[i + 1], d[i + 2], d[i + 3]];
  };
  let transparent = 0, white = 0, red = 0, dark = 0;
  const stride = 40;
  for (let y = 0; y < c.height; y += stride) {
    for (let x = 0; x < c.width; x += stride) {
      const i = (y * c.width + x) * 4;
      const a = d[i + 3];
      if (a === 0) { transparent++; continue; }
      const r = d[i], g = d[i + 1], b = d[i + 2];
      if (r > 240 && g > 240 && b > 240) white++;
      else if (r > 150 && g < 110 && b < 110) red++;
      else if (r < 90 && g < 90 && b < 90) dark++;
    }
  }
  const total = Math.ceil(c.width / stride) * Math.ceil(c.height / stride);
  // find bounding box of non-white content
  let minX = c.width, minY = c.height, maxX = 0, maxY = 0;
  for (let y = 0; y < c.height; y += 2) {
    for (let x = 0; x < c.width; x += 2) {
      const i = (y * c.width + x) * 4;
      const a = d[i + 3];
      if (a === 0) continue;
      const r = d[i], g = d[i + 1], b = d[i + 2];
      if (!(r > 240 && g > 240 && b > 240)) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  return {
    size: { w: c.width, h: c.height },
    corners: { tl: px(5, 5), tr: px(c.width - 6, 5), bl: px(5, c.height - 6), br: px(c.width - 6, c.height - 6), center: px(Math.floor(c.width / 2), Math.floor(c.height / 2)) },
    pct: { transparent: +(transparent / total * 100).toFixed(1), white: +(white / total * 100).toFixed(1), red: +(red / total * 100).toFixed(1), dark: +(dark / total * 100).toFixed(1) },
    contentBBox: { minX: minX === c.width ? null : minX, minY: minY === c.height ? null : minY, maxX: maxX === 0 ? null : maxX, maxY: maxY === 0 ? null : maxY }
  };
})()