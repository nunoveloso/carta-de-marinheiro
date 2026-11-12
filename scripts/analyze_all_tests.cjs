const fs = require('fs');
const path = require('path');

const outDir = path.resolve(__dirname, '../extracted_tests');

for (let i = 1; i <= 13; i++) {
  const filePath = path.join(outDir, `test_${i}.txt`);
  if (!fs.existsSync(filePath)) continue;
  const content = fs.readFileSync(filePath, 'utf-8');
  console.log(`=== TEST ${i} ===`);
  // Print line count and find question matches
  const lines = content.split('\n');
  const qMatches = [];
  lines.forEach((l, idx) => {
    const trimmed = l.trim();
    // Questions often look like: "1. (1,0)", "12. (0,5)", "24. (0,6)", "2. (1,0)"
    if (/^([0-9]{1,2})[\.\,\s]\s*(\([0-9\.\,]+\))?/.test(trimmed)) {
      qMatches.push({ lineNum: idx + 1, text: trimmed.slice(0, 70) });
    }
  });
  console.log(`Found ${qMatches.length} question markers in Test ${i}:`);
  console.log(qMatches.slice(0, 10).map(q => `  L${q.lineNum}: ${q.text}`).join('\n'));
}
