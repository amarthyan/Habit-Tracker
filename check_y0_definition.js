const fs = require('fs');
const code = fs.readFileSync('index-2.js', 'utf-8');

// Find Y0 definition.
const search = 'Y0=';
let idx = 0;
while (true) {
  idx = code.indexOf(search, idx);
  if (idx === -1) break;
  console.log(`Found "${search}" at index ${idx}:`);
  console.log(code.substring(idx - 100, idx + 800));
  idx += search.length;
}
