const fs = require('fs');
const html = fs.readFileSync('site_index.html', 'utf-8');

console.log('HTML Length:', html.length);
console.log('Last 2000 chars of HTML:');
console.log(html.substring(html.length - 2000));

console.log('\nSearching for footer keywords in HTML:');
const keywords = ['©', 'Build', 'Built', 'copyright', 'Amarthyan', 'amarthyan'];
keywords.forEach(kw => {
  let idx = 0;
  while ((idx = html.indexOf(kw, idx)) !== -1) {
    console.log(`Found "${kw}" at:`, html.substring(Math.max(0, idx - 100), Math.min(html.length, idx + 100)));
    idx += kw.length;
  }
});
