const fs = require('fs');
const path = require('path');

const outDir = path.resolve(__dirname, '../extracted_tests');

for (let i = 1; i <= 13; i++) {
  const filePath = path.join(outDir, `test_${i}.txt`);
  if (!fs.existsSync(filePath)) continue;
  const content = fs.readFileSync(filePath, 'utf-8');
  fs.writeFileSync(path.join(outDir, `clean_${i}.txt`), content.replace(/\r/g, ''), 'utf-8');
}
console.log('Cleaned text files saved.');
