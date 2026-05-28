const fs = require('fs');

const code1 = fs.readFileSync('index-1.js', 'utf-8');
const code2 = fs.readFileSync('index-2.js', 'utf-8');

console.log('index-1.js length:', code1.length);
console.log('index-2.js length:', code2.length);

function searchInJS(name, code, codeName) {
  console.log(`\n--- Searching for "${name}" in ${codeName} ---`);
  let index = 0;
  while (true) {
    index = code.indexOf(name, index);
    if (index === -1) break;
    const start = Math.max(0, index - 100);
    const end = Math.min(code.length, index + 300);
    console.log(`Found at index ${index}:\n...${code.substring(start, end).replace(/\n/g, ' ')}...`);
    index += name.length;
    if (index > code.length) break;
    // limit results
    if (index > 500000) break; // safety
  }
}

searchInJS('xlsx', code1, 'index-1.js');
searchInJS('xlsx', code2, 'index-2.js');

searchInJS('Build by', code1, 'index-1.js');
searchInJS('Build by', code2, 'index-2.js');

searchInJS('completed', code1, 'index-1.js');
searchInJS('completed', code2, 'index-2.js');
