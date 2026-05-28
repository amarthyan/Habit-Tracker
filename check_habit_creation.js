const fs = require('fs');
const code = fs.readFileSync('react_extracted.js', 'utf-8');

// Find how habits are managed. Let's look for state modifications on the habits array `a`.
// `s` is the setState function for habits. Let's find "s(" or "s(ue" or "s(K" in the code.
// We also saw:
// X(K.id, ge.target.value) for editing name
// O(K.id) for removing habit
// Let's search for these functions in react_extracted.js.

function searchAround(query) {
  let idx = 0;
  while (true) {
    idx = code.indexOf(query, idx);
    if (idx === -1) break;
    console.log(`Found "${query}" at index ${idx}:`);
    console.log(code.substring(idx - 100, idx + 400));
    idx += query.length;
  }
}

searchAround('X=');
searchAround('O=');
searchAround('s(');
