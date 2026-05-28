const fs = require('fs');

const css = fs.readFileSync('styles.css', 'utf-8');

// Find :root rules
const rootMatch = css.match(/:root\s*\{([^}]+)\}/);
if (rootMatch) {
  console.log('Root CSS Variables:');
  console.log(rootMatch[1].split(';').map(s => s.trim()).filter(Boolean).join('\n'));
} else {
  console.log('No direct :root block found or minified differently.');
}

// Check if there are other variables declared like .dark or similar
const darkMatch = css.match(/\.dark\s*\{([^}]+)\}/);
if (darkMatch) {
  console.log('\nDark CSS Variables:');
  console.log(darkMatch[1].split(';').map(s => s.trim()).filter(Boolean).join('\n'));
}

// Find any specific custom variables starting with --week
const weekVars = css.match(/--week[a-zA-Z0-9-]*:[^;]+/g);
if (weekVars) {
  console.log('\nWeek CSS Variables:');
  console.log([...new Set(weekVars)].join('\n'));
}
