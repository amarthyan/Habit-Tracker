const fs = require('fs');
const https = require('https');

const baseUrl = 'https://aaryananilhabittracker.amarthyan.app';

function downloadFile(urlPath, dest) {
  return new Promise((resolve, reject) => {
    https.get(baseUrl + urlPath, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to get '${urlPath}' (Status Code: ${res.statusCode})`));
        return;
      }
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        fs.writeFileSync(dest, data);
        console.log(`Downloaded ${urlPath} to ${dest}`);
        resolve();
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function run() {
  try {
    await downloadFile('/assets/styles-Bm2A7Fog.css', 'styles.css');
    await downloadFile('/assets/index-BTL1nAZA.js', 'index-1.js');
    await downloadFile('/assets/index-BYiV52za.js', 'index-2.js');
    console.log('All downloads completed!');
  } catch (err) {
    console.error('Download error:', err);
  }
}

run();
