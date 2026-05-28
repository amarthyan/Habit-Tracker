const fs = require('fs');
const code = fs.readFileSync('index-2.js', 'utf-8');

// We want to find Lucide imports. Often they look like:
// e.g. "import { ... } from 'lucide-react'"
// In minified code, Lucide icons might be defined or referenced as Lucide components.
// Let's search for SVG class names or keywords like "lucide lucide-trash2" which was found in:
// class="lucide lucide-trash2 lucide-trash-2 h-3.5 w-3.5 text-muted-foreground hover:text-destructive"

const icons = ['FileDown', 'FileSpreadsheet', 'Moon', 'Sun', 'ChevronLeft', 'ChevronRight', 'Plus', 'Check', 'Trash2', 'Award', 'Trophy', 'CheckCircle'];
icons.forEach(icon => {
  const regex = new RegExp('\\b' + icon + '\\b', 'i');
  const match = code.match(regex);
  if (match) {
    console.log(`Found Lucide Icon: ${icon} at index ${match.index}`);
  }
});

// Let's search for "Check" in the imports or definitions
// Let's print out around where G6, O6, U6, W6, X6, z6, R6, B6 are defined.
// Often they are defined like: "const G6=" or "G6=" or similar.
['G6', 'O6', 'U6', 'W6', 'X6', 'z6', 'R6', 'B6'].forEach(id => {
  const match = code.match(new RegExp('\\b' + id + '\\b\\s*=\\s*'));
  if (match) {
    console.log(`Definition of ${id}:`);
    console.log(code.substring(match.index - 50, match.index + 200));
  } else {
    // try searching just the identifier
    const idx = code.indexOf(id + '=');
    if (idx !== -1) {
      console.log(`Definition of ${id}=:`);
      console.log(code.substring(idx - 50, idx + 200));
    }
  }
});
