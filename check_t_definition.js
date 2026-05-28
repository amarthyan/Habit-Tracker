const fs = require('fs');
const code = fs.readFileSync('react_extracted.js', 'utf-8');

// We want to find the declaration of T. Let's search for "T=" or "const T="
const idx = code.indexOf('T=');
if (idx !== -1) {
  console.log('Found T= definition:');
  console.log(code.substring(idx - 200, idx + 800));
} else {
  console.log('T= not found');
}
