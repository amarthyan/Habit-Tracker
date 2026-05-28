const fs = require('fs');
const code = fs.readFileSync('index-2.js', 'utf-8');

const regex = /\bY0\b/g;
let match;
let count = 0;
while ((match = regex.exec(code)) !== null) {
  console.log(`Match ${++count} at index ${match.index}:`);
  console.log(code.substring(Math.max(0, match.index - 100), Math.min(code.length, match.index + 200)));
  if (count > 20) break;
}
