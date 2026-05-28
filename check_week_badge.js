const fs = require('fs');
const code = fs.readFileSync('index-2.js', 'utf-8');

const idx = code.indexOf('"W"');
if (idx !== -1) {
  console.log('Found "W" in index-2.js:');
  console.log(code.substring(idx - 200, idx + 800));
} else {
  console.log('"W" not found in index-2.js');
  // look for W1, W2 etc.
  const idx2 = code.indexOf('W1');
  if (idx2 !== -1) {
    console.log('Found W1 at:', idx2);
    console.log(code.substring(idx2 - 200, idx2 + 800));
  }
}
