const fs = require('fs');
const code = fs.readFileSync('react_extracted.js', 'utf-8');

const idx = code.indexOf('z.map(K=>{');
if (idx !== -1) {
  console.log('Found z.map in react_extracted.js:');
  console.log(code.substring(idx - 100, idx + 1200));
} else {
  console.log('z.map not found');
}
