const fs = require('fs');
const html = fs.readFileSync('site_index.html', 'utf-8');

// Find where the sidebar starts. We know it's a grid with cols [minmax(0,1fr)_280px]
// Let's find the text "Goals & Progress" or look for 280px in class lists.
const target = 'Goals & Progress';
const idx = html.indexOf(target);
if (idx !== -1) {
  console.log('Found "Goals & Progress" at index:', idx);
  console.log(html.substring(idx - 100, idx + 2000));
} else {
  console.log('Could not find "Goals & Progress" text.');
}

const target2 = '2026 Year Overview';
const idx2 = html.indexOf(target2);
if (idx2 !== -1) {
  console.log('\nFound "2026 Year Overview" at index:', idx2);
  console.log(html.substring(idx2 - 100, idx2 + 2000));
}
