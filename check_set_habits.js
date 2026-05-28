const fs = require('fs');
const code = fs.readFileSync('react_extracted.js', 'utf-8');

let idx = 0;
while (true) {
  idx = code.indexOf('s(', idx);
  if (idx === -1) break;
  console.log(`Found "s(" at index ${idx}:`);
  console.log(code.substring(idx - 100, idx + 400));
  idx += 2;
}
