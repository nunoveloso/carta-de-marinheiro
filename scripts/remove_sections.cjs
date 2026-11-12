const fs = require('fs');
const path = require('path');

const targetPath = path.resolve(__dirname, '../src/data/initialTerms.ts');
let content = fs.readFileSync(targetPath, 'utf8');

// Remove MANUAL_SECTIONS if desired or keep an empty/updated array
content = content.replace(/export const MANUAL_SECTIONS = \[[\s\S]*?\] as const;/, 'export const MANUAL_SECTIONS = [] as const;');

const startMarker = 'export const INITIAL_TERMS: NauticalTerm[] = ';
const endMarker = ';\n\nexport const SAMPLE_QUIZ_QUESTIONS';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker, startIndex);

if (startIndex === -1 || endIndex === -1) {
  console.error("Could not locate INITIAL_TERMS boundaries", { startIndex, endIndex });
  process.exit(1);
}

const termsJsonStr = content.substring(startIndex + startMarker.length, endIndex);
const terms = JSON.parse(termsJsonStr);

for (const t of terms) {
  delete t.section;
  delete t.subsection;
}

const formattedTerms = JSON.stringify(terms, null, 2);
const updatedContent = content.substring(0, startIndex + startMarker.length) +
  formattedTerms +
  content.substring(endIndex);

fs.writeFileSync(targetPath, updatedContent, 'utf8');
console.log(`Cleaned section/subsection from ${terms.length} terms in initialTerms.ts`);
