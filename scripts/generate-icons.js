import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) c = 0xedb88320 ^ (c >>> 1);
    else c = c >>> 1;
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const typeAndData = Buffer.concat([typeBuf, data]);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(typeAndData), 0);
  return Buffer.concat([len, typeAndData, crcBuf]);
}

function createPng(width, height, pixelFn) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;
  ihdrData[9] = 6;
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;
  const ihdrChunk = makeChunk('IHDR', ihdrData);

  const rawRows = [];
  for (let y = 0; y < height; y++) {
    const row = Buffer.alloc(1 + width * 4);
    row[0] = 0;
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = pixelFn(x, y, width, height);
      const offset = 1 + x * 4;
      row[offset] = r;
      row[offset + 1] = g;
      row[offset + 2] = b;
      row[offset + 3] = a;
    }
    rawRows.push(row);
  }

  const rawData = Buffer.concat(rawRows);
  const compressedData = zlib.deflateSync(rawData, { level: 9 });
  const idatChunk = makeChunk('IDAT', compressedData);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function drawNauticalIcon(x, y, w, h, isMaskable = false) {
  const cx = w / 2;
  const cy = h / 2;
  const dx = x - cx;
  const dy = y - cy;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const radius = (w / 2) * (isMaskable ? 0.75 : 0.94);

  // Maskable background fill
  if (isMaskable && dist > radius) {
    return [251, 248, 242, 255]; // Papyrus
  }

  // Outside circle
  if (dist > radius) {
    return [0, 0, 0, 0];
  }

  // Outer border navy ring
  if (dist > radius - (w * 0.04)) {
    return [17, 35, 56, 255]; // Navy
  }

  const angle = Math.atan2(dy, dx);

  // Spokes in antique brass
  for (let i = 0; i < 8; i++) {
    const spokeAngle = (i * Math.PI) / 4;
    const diff = Math.abs(angle - spokeAngle);
    if ((diff < 0.05 || Math.abs(diff - Math.PI * 2) < 0.05) && dist < radius * 0.9) {
      return [184, 134, 11, 255]; // Brass gold
    }
  }

  // Compass ring
  if (Math.abs(dist - radius * 0.62) < (w * 0.025)) {
    return [184, 134, 11, 255];
  }

  // Center hub
  if (dist < radius * 0.22) {
    if (dist < radius * 0.08) return [184, 134, 11, 255];
    return [17, 35, 56, 255]; // Navy hub
  }

  // North point (Crimson Red & Navy)
  if (dy < 0 && Math.abs(dx) < Math.abs(dy) * 0.28 && dist < radius * 0.85) {
    return dx < 0 ? [153, 27, 27, 255] : [17, 35, 56, 255];
  }
  // South point (Navy & Slate)
  if (dy > 0 && Math.abs(dx) < Math.abs(dy) * 0.28 && dist < radius * 0.85) {
    return dx < 0 ? [100, 116, 139, 255] : [17, 35, 56, 255];
  }
  // East / West points (Brass Gold & Navy)
  if (Math.abs(dy) < Math.abs(dx) * 0.28 && dist < radius * 0.85) {
    return [184, 134, 11, 255];
  }

  // Warm papyrus background field
  return [253, 251, 247, 255];
}

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const icons = [
  { file: 'pwa-192x192.png', size: 192, maskable: false },
  { file: 'pwa-512x512.png', size: 512, maskable: false },
  { file: 'pwa-maskable-512x512.png', size: 512, maskable: true },
  { file: 'apple-touch-icon.png', size: 180, maskable: false },
  { file: 'favicon.ico', size: 64, maskable: false },
];

for (const icon of icons) {
  const buf = createPng(icon.size, icon.size, (x, y, w, h) =>
    drawNauticalIcon(x, y, w, h, icon.maskable)
  );
  fs.writeFileSync(path.join(publicDir, icon.file), buf);
  console.log(`Generated ${icon.file} (${icon.size}x${icon.size})`);
}
