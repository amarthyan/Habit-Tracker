const fs = require('fs');

const code = fs.readFileSync('index-2.js', 'utf-8');

// Let's write a small scanner to find where habits are initialized.
// Typically they might look like: "Exercise 3x a week" or similar strings.
const initialHabitsIndex = code.indexOf('Exercise 3x a week');
if (initialHabitsIndex !== -1) {
  console.log('Found initial habits string at index:', initialHabitsIndex);
  console.log(code.substring(initialHabitsIndex - 500, initialHabitsIndex + 1500));
} else {
  console.log('Not found initial habits string.');
}

// Let's search for "streak" to see how streaks are calculated.
const streakIndex = code.indexOf('streak');
if (streakIndex !== -1) {
  console.log('\nFound "streak" at index:', streakIndex);
  console.log(code.substring(streakIndex - 200, streakIndex + 1000));
}

// Let's search for Excel download function, e.g. "XLSX" or "writeFile" or "utils.book_new"
const xlsxIndex = code.indexOf('book_new');
if (xlsxIndex !== -1) {
  console.log('\nFound "book_new" at index:', xlsxIndex);
  console.log(code.substring(xlsxIndex - 200, xlsxIndex + 1000));
}
