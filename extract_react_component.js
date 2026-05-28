const fs = require('fs');
const code = fs.readFileSync('index-2.js', 'utf-8');

// The react components start around the default habits declaration pP (index 827000)
// Let's grab from index 825000 to the end and save it.
const startIdx = 825000;
const extracted = code.substring(startIdx);
fs.writeFileSync('react_extracted.js', extracted);
console.log('Saved extracted JS to react_extracted.js. Length:', extracted.length);
