const fs = require('fs');
const code = fs.readFileSync('react_extracted.js', 'utf-8');

// We want to find where `fe` and `ve` are declared. Let's look for "fe=" or "ve=" between 30000 and 40000.
// Let's print out declarations of `fe` and `ve` in the React component scope.
const slice = code.substring(30000, 42000);
// Let's search for "fe=" and "ve=" in this slice
let idx = 0;
while (true) {
  idx = slice.indexOf('fe=', idx);
  if (idx === -1) break;
  console.log(`Found "fe=" in slice at offset ${idx}:`);
  console.log(slice.substring(idx - 100, idx + 500));
  idx += 3;
}

idx = 0;
while (true) {
  idx = slice.indexOf('ve=', idx);
  if (idx === -1) break;
  console.log(`Found "ve=" in slice at offset ${idx}:`);
  console.log(slice.substring(idx - 100, idx + 500));
  idx += 3;
}
