const fs = require('fs');
const code = fs.readFileSync('react_extracted.js', 'utf-8');

// We found "onClick:ve" (Excel) and "onClick:fe" (PDF).
// Let's search for "const ve=" or "ve=" or find "ve" and "fe" in the scope.
const idxVe = code.indexOf('ve=');
if (idxVe !== -1) {
  console.log('Found "ve=" at index:', idxVe);
  console.log(code.substring(idxVe - 200, idxVe + 1500));
} else {
  console.log('ve= not found');
}

const idxFe = code.indexOf('fe=');
if (idxFe !== -1) {
  console.log('Found "fe=" at index:', idxFe);
  console.log(code.substring(idxFe - 200, idxFe + 1500));
} else {
  console.log('fe= not found');
}
