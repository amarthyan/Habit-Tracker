const fs = require('fs');
const code = fs.readFileSync('react_extracted.js', 'utf-8');

function search(query, limit = 5) {
  console.log(`\n=================== SEARCHING FOR "${query}" ===================`);
  let idx = 0;
  let count = 0;
  while (true) {
    idx = code.indexOf(query, idx);
    if (idx === -1) break;
    console.log(`Match ${++count} at index ${idx}:`);
    console.log(code.substring(Math.max(0, idx - 150), Math.min(code.length, idx + 800)));
    idx += query.length;
    if (count >= limit) break;
  }
}

// Search for Excel export
search('Excel');

// Search for PDF export
search('PDF');

// Search for localStorage
search('localStorage');
