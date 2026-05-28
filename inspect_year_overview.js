const fs = require('fs');
const html = fs.readFileSync('site_index.html', 'utf-8');

const idx = html.indexOf('Year Overview');
if (idx !== -1) {
  console.log('Found "Year Overview" at:', idx);
  console.log(html.substring(idx - 200, idx + 2000));
} else {
  console.log('Not found');
}
