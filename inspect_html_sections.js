const fs = require('fs');
const html = fs.readFileSync('site_index.html', 'utf-8');

function showSection(headerText) {
  console.log(`\n=================== SECTION: ${headerText} ===================`);
  const idx = html.indexOf(headerText);
  if (idx === -1) {
    console.log(`Could not find "${headerText}"`);
    return;
  }
  // Find surrounding div or content
  const start = Math.max(0, idx - 150);
  const end = Math.min(html.length, idx + 1800);
  console.log(html.substring(start, end));
}

showSection('Goals &amp; Progress');
showSection('Weekly Completion');
showSection('2026 Year Overview');
