(() => {
  const img = document.querySelector('img');
  const c = document.createElement('canvas');
  c.width = img.naturalWidth;
  c.height = img.naturalHeight;
  const ctx = c.getContext('2d');
  ctx.drawImage(img, 0, 0);
  const d = ctx.getImageData(0, 0, c.width, c.height).data;
  let rMinX = c.width, rMinY = c.height, rMaxX = 0, rMaxY = 0, rCount = 0;
  let kMinX = c.width, kMinY = c.height, kMaxX = 0, kMaxY = 0, kCount = 0;
  const stride = 2;
  for (let y = 0; y < c.height; y += stride) {
    for (let x = 0; x < c.width; x += stride) {
      const i = (y * c.width + x) * 4;
      const a = d[i + 3];
      if (a === 0) continue;
      const r = d[i], g = d[i + 1], b = d[i + 2];
      if (r > 150 && g < 120 && b < 120) { // red icon
        if (x < rMinX) rMinX = x;
        if (x > rMaxX) rMaxX = x;
        if (y < rMinY) rMinY = y;
        if (y > rMaxY) rMaxY = y;
        rCount++;
      } else if (r < 110 && g < 110 && b < 110) { // dark text
        if (x < kMinX) kMinX = x;
        if (x > kMaxX) kMaxX = x;
        if (y < kMinY) kMinY = y;
        if (y > kMaxY) kMaxY = y;
        kCount++;
      }
    }
  }
  return {
    redIcon: { bbox: [rMinX, rMinY, rMaxX, rMaxY], w: rMaxX - rMinX, h: rMaxY - rMinY, count: rCount },
    darkText: { bbox: [kMinX, kMinY, kMaxX, kMaxY], w: kMaxX - kMinX, h: kMaxY - kMinY, count: kCount }
  };
})()