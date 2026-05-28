const fs = require('fs');
const code = fs.readFileSync('index-2.js', 'utf-8');

const idx = code.indexOf('Ya={');
if (idx !== -1) {
  console.log(code.substring(idx, idx + 400));
} else {
  console.log('Ya={ not found');
}
