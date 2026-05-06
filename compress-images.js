const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = 'static/uploads';
const supported = new Set(['.jpg', '.jpeg', '.png']);

async function compress(file) {
  const ext = path.extname(file).toLowerCase();
  if (!supported.has(ext)) return;
  const filePath = path.join(dir, file);
  const tmp = filePath + '.tmp';
  const img = sharp(filePath);
  if (ext === '.png') {
    await img.png({ quality: 80 }).toFile(tmp);
  } else {
    await img.jpeg({ quality: 80, mozjpeg: true }).toFile(tmp);
  }
  fs.renameSync(tmp, filePath);
  console.log(`compressed: ${file}`);
}

const files = fs.readdirSync(dir);
Promise.all(files.map(compress)).catch(err => {
  console.error(err);
  process.exit(1);
});
