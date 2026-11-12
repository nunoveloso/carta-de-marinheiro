const fs = require('fs');
const path = require('path');

const outDir = path.resolve(__dirname, '../extracted_tests');

for (let t = 3; t <= 6; t++) {
  const content = fs.readFileSync(path.join(outDir, `test_${t}.txt`), 'utf8');
  console.log(`\n=================== TESTE ${t} ===================`);
  const lines = content.split('\n');
  let qNum = null;
  let qLines = [];
  
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i].trim();
    const m = l.match(/^([0-9]{1,2})\s*[\.\,\)]\s*(\([0-9\.\,]+\))?\s*(.*)/);
    if (m && parseInt(m[1]) >= 1 && parseInt(m[1]) <= 30) {
      if (qNum !== null) {
        console.log(`T${t}-Q${qNum}: ${qLines.join(' ').slice(0, 100)}`);
      }
      qNum = parseInt(m[1]);
      qLines = [m[3] || ''];
    } else if (qNum !== null) {
      if (l.startsWith('--- PAGE BREAK ---') || l.startsWith('IPTM') || l.startsWith('Instituto')) {
        // skip headers
      } else if (qLines.length < 4) {
        qLines.push(l);
      }
    }
  }
  if (qNum !== null) {
    console.log(`T${t}-Q${qNum}: ${qLines.join(' ').slice(0, 100)}`);
  }
}
