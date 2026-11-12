const fs = require('fs');
const path = require('path');

const outDir = path.resolve(__dirname, '../extracted_tests');

for (let t = 4; t <= 13; t++) {
  const filePath = path.join(outDir, `clean_${t}.txt`);
  if (!fs.existsSync(filePath)) continue;
  const content = fs.readFileSync(filePath, 'utf-8');
  console.log(`\n================== TEST ${t} ==================`);
  
  // Print lines that start with numbers
  const lines = content.split('\n');
  lines.forEach((l, idx) => {
    const trimmed = l.trim();
    if (/^[0-9]{1,2}[\.\,\s]\s*(\([0-9\.\,]+\))?/.test(trimmed)) {
      console.log(`[T${t}] ${trimmed.slice(0, 80)}`);
      if (lines[idx+1]) console.log(`       ${lines[idx+1].trim().slice(0, 80)}`);
    }
  });
}
