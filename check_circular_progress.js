const fs = require('fs');
const code = fs.readFileSync('index-2.js', 'utf-8');

const idx = code.indexOf('stroke-dasharray');
if (idx !== -1) {
  console.log('Found stroke-dasharray in full index-2.js at index:', idx);
  console.log(code.substring(idx - 300, idx + 1000));
} else {
  console.log('stroke-dasharray not found in full index-2.js');
}

const idx2 = code.indexOf('Y0=');
if (idx2 !== -1) {
  console.log('Found Y0= in full index-2.js at index:', idx2);
  console.log(code.substring(idx2 - 100, idx2 + 1000));
}
