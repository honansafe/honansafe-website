(() => {
  const img = document.querySelector('img');
  const c = document.createElement('canvas');
  c.width = img.naturalWidth;
  c.height = img.naturalHeight;
  const ctx = c.getContext('2d');
  ctx.drawImage(img, 0, 0);
  const d = ctx.getImageData(0, 0, c.width, c.height).data;
  // bounding box of non-white content
  let minX = c.width, minY = c.height, maxX = 0, maxY = 0;
  const redBuckets = {}, darkBuckets = {};
  const stride = 2;
  for (let y = 0; y < c.height; y += stride) {
    for (let x = 0; x < c.width; x += stride) {
      const i = (y * c.width + x) * 4;
      const a = d[i + 3];
      if (a === 0) continue;
      const r = d[i], g = d[i + 1], b = d[i + 2];
      const isWhite = r > 240 && g > 240 && b > 240;
      if (!isWhite) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
      if (!isWhite && r > 150 && g < 120 && b < 120) {
        const key = Math.round(r / 8) * 8 + ',' + Math.round(g / 8) * 8 + ',' + Math.round(b / 8) * 8;
        redBuckets[key] = (redBuckets[key] || 0) + 1;
      }
      if (!isWhite && r < 110 && g < 110 && b < 110) {
        const key = Math.round(r / 8) * 8 + ',' + Math.round(g / 8) * 8 + ',' + Math.round(b / 8) * 8;
        darkBuckets[key] = (darkBuckets[key] || 0) + 1;
      }
    }
  }
  const top = (obj, n) => Object.entries(obj).sort((a, b) => b[1] - a[1]).slice(0, n).map(([k, v]) => ({ rgb: k, count: v }));
  const hex = (rgbStr) => {
    const [r, g, b] = rgbStr.split(',').map(Number);
    return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
  };
  const redTop = top(redBuckets, 3).map(o => ({ ...o, hex: hex(o.rgb) }));
  const darkTop = top(darkBuckets, 3).map(o => ({ ...o, hex: hex(o.rgb) }));
  return {
    size: { w: c.width, h: c.height },
    contentBBox: { minX: minX === c.width ? null : minX, minY: minY === c.height ? null : minY, maxX: maxX === 0 ? null : maxX, maxY: maxY === 0 ? null : maxY },
    contentSizePx: { w: maxX - minX, h: maxY - minY },
    redColors: redTop,
    darkColors: darkTop
  };
})()