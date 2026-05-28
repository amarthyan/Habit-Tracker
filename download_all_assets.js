const fs = require('fs');
const https = require('https');
const path = require('path');

const baseUrl = 'https://aaryananilhabittracker.amarthyan.app';
const targetDir = path.join(__dirname, 'assets');

// Create assets directory
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
  console.log('Created assets directory:', targetDir);
}

function downloadFile(urlPath, destName) {
  const dest = path.join(targetDir, destName);
  return new Promise((resolve, reject) => {
    https.get(baseUrl + urlPath, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to get '${urlPath}' (Status Code: ${res.statusCode})`));
        return;
      }
      const fileStream = fs.createWriteStream(dest);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Downloaded ${urlPath} to assets/${destName}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {}); // delete partial file
      reject(err);
    });
  });
}

const assetsToDownload = [
  { path: '/assets/styles-Bm2A7Fog.css', name: 'styles-Bm2A7Fog.css' },
  { path: '/assets/index-BTL1nAZA.js', name: 'index-BTL1nAZA.js' },
  { path: '/assets/index-BYiV52za.js', name: 'index-BYiV52za.js' },
  { path: '/assets/html2canvas.esm-DXEQVQnt.js', name: 'html2canvas.esm-DXEQVQnt.js' },
  { path: '/assets/purify.es-Cw43jA4y.js', name: 'purify.es-Cw43jA4y.js' },
  { path: '/assets/index.es-DrfKNvet.js', name: 'index.es-DrfKNvet.js' }
];

async function run() {
  console.log('Starting downloading of all assets...');
  for (const asset of assetsToDownload) {
    try {
      await downloadFile(asset.path, asset.name);
    } catch (err) {
      console.error(`Error downloading ${asset.path}:`, err.message);
    }
  }
  console.log('Finished downloading all assets!');
}

run();
