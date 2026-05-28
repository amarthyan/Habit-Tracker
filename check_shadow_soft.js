const fs = require('fs');
const css = fs.readFileSync('styles.css', 'utf-8');

const idx = css.indexOf('--shadow-soft');
if (idx !== -1) {
  console.log('Found --shadow-soft at:', idx);
  console.log(css.substring(idx - 100, idx + 300));
} else {
  console.log('--shadow-soft not found in CSS');
}
