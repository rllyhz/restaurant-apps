const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, 'src/public/images/heros');
const destination = path.resolve(__dirname, 'dist/images/heros');

if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}
if (!fs.existsSync('dist/images')) {
  fs.mkdirSync('dist/images');
}
if (!fs.existsSync('dist/images/heros')) {
  fs.mkdirSync('dist/images/heros');
}

fs.readdirSync(target)
  .forEach((image) => {
    // change width of image size to 1250px for large with prefix -large.jpg
    sharp(`${target}/${image}`)
      .resize(1250)
      .toFile(path.resolve(
        __dirname,
        `${destination}/${image.split('.').slice(0, -1).join('.')}-large.jpg`,
      ));

    // change width of image size to 480px for small with prefix -small.jpg
    sharp(`${target}/${image}`)
      .resize(480)
      .toFile(path.resolve(
        __dirname,
        `${destination}/${image.split('.').slice(0, -1).join('.')}-small.jpg`,
      ));
  });
