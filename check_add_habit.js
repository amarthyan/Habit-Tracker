const fs = require('fs');
const code = fs.readFileSync('react_extracted.js', 'utf-8');

// Search for addition. E.g. "setHabits" or "a.concat" or "..." or "Add Habit"
const idx = code.indexOf('Add Habit');
if (idx !== -1) {
  console.log('Found "Add Habit" in react_extracted.js:');
  console.log(code.substring(idx - 200, idx + 800));
} else {
  console.log('"Add Habit" not found in react_extracted.js');
}

// Let's do a search for adding a habit. It might look like: "id:" or "name:" or "goal:" in a function.
const idx2 = code.indexOf('id:');
if (idx2 !== -1) {
  console.log('Found "id:" in react_extracted.js:');
  console.log(code.substring(idx2 - 200, idx2 + 800));
}
