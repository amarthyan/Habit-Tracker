const fs = require('fs');
const code = fs.readFileSync('react_extracted.js', 'utf-8');

const idx = code.indexOf('streak');
if (idx !== -1) {
  console.log('Context of streak in react_extracted.js:');
  console.log(code.substring(idx - 300, idx + 1200));
} else {
  console.log('streak keyword not found in react_extracted.js');
}
