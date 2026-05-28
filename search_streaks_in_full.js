const fs = require('fs');
const code = fs.readFileSync('index-2.js', 'utf-8');

const regex = /streak/i;
const match = code.match(regex);
if (match) {
  console.log('Found streak at index:', match.index);
  console.log(code.substring(match.index - 200, match.index + 800));
} else {
  console.log('streak keyword NOT found anywhere in index-2.js');
}
