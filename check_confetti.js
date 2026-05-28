const fs = require('fs');
const code = fs.readFileSync('index-2.js', 'utf-8');

const idx = code.indexOf('confetti');
if (idx !== -1) {
  console.log('Found confetti at index:', idx);
  console.log(code.substring(idx - 100, idx + 400));
} else {
  console.log('confetti keyword NOT found in index-2.js');
}
l̥ō