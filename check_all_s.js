const fs = require('fs');
const code = fs.readFileSync('react_extracted.js', 'utf-8');

let idx = 30000;
while (true) {
  idx = code.indexOf('s(', idx);
  if (idx === -1 || idx > 45000) break;
  console.log(`Found "s(" at index ${idx}:`);
  console.log(code.substring(idx - 150, idx + 400));
  idx += 2;
}
