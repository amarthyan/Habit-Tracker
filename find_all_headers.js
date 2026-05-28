const fs = require('fs');
const html = fs.readFileSync('site_index.html', 'utf-8');

// Find all headings
const headingRegex = /<(h[1-6])\b[^>]*>([\s\S]*?)<\/\1>/gi;
let match;
console.log('Heading Tags in site_index.html:');
while ((match = headingRegex.exec(html)) !== null) {
  console.log(`${match[1].toUpperCase()}: ${match[2].trim().replace(/<[^>]+>/g, '')}`);
}

// Find all buttons
const buttonRegex = /<button\b[^>]*>([\s\S]*?)<\/button>/gi;
const buttons = [];
while ((match = buttonRegex.exec(html)) !== null) {
  buttons.push(match[1].trim().replace(/<[^>]+>/g, ''));
}
console.log('\nButtons in site_index.html (first 15):', buttons.slice(0, 15));

// Find any div with text "Overview" or "Goals" or similar
const divs = [];
const divRegex = /<div\b[^>]*>([\s\S]*?)<\/div>/gi;
// Just search for custom texts
console.log('\nChecking for key terms in HTML:');
['Overview', 'Goals', 'Progress', 'Weekly', 'Year', 'Habit'].forEach(term => {
  console.log(`Contains "${term}"?`, html.includes(term));
});
