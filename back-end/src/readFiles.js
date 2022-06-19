const fs = require('fs/promises');

async function readFiles(file) {
  const data = await fs.readFile(file, 'utf-8');

  const arr = JSON.parse(data);

  return arr;
}

module.exports = readFiles;
