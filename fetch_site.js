const fs = require('fs');
const https = require('https');

const url = 'https://aaryananilhabittracker.amarthyan.app';

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log('Fetched successfully. Length:', data.length);
    fs.writeFileSync('site_index.html', data);
    console.log('Saved to site_index.html');
    
    // Find all script tags
    const scriptRegex = /<script[^>]*src="([^"]+)"/g;
    let match;
    const scripts = [];
    while ((match = scriptRegex.exec(data)) !== null) {
      scripts.push(match[1]);
    }
    console.log('Scripts:', scripts);

    // Find all css link tags
    const cssRegex = /<link[^>]*href="([^"]+\.css)"/g;
    const cssFiles = [];
    while ((match = cssRegex.exec(data)) !== null) {
      cssFiles.push(match[1]);
    }
    console.log('CSS Stylesheets:', cssFiles);
  });
}).on('error', (err) => {
  console.error('Error fetching site:', err.message);
});
