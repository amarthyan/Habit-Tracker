const fs = require('fs');
const code = fs.readFileSync('index-2.js', 'utf-8');

const query = '220px';
let idx = 0;
while (true) {
  idx = code.indexOf(query, idx);
  if (idx === -1) break;
  console.log(`Found "${query}" at index ${idx}:`);
  console.log(code.substring(idx - 200, idx + 600));
  idx += query.length;
}
