const fs = require('fs');
const code = fs.readFileSync('index-2.js', 'utf-8');

const regexes = [
  /const eg\s*=\s*"([^"]+)"/,
  /const tg\s*=\s*"([^"]+)"/,
  /eg\s*=\s*"([^"]+)"/,
  /tg\s*=\s*"([^"]+)"/,
  /var eg\s*=\s*"([^"]+)"/,
  /var tg\s*=\s*"([^"]+)"/
];

regexes.forEach((r, idx) => {
  const match = code.match(r);
  if (match) {
    console.log(`Match ${idx}:`, match[0]);
  }
});

// Let's also do a general search for variables declared before `pP`
const pPIdx = code.indexOf('pP=[');
if (pPIdx !== -1) {
  console.log('Context before pP:');
  console.log(code.substring(pPIdx - 300, pPIdx + 50));
}
