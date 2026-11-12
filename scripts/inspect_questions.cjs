const fs = require('fs');
const path = require('path');

const outDir = path.resolve(__dirname, '../extracted_tests');

for (let i = 1; i <= 13; i++) {
  const filePath = path.join(outDir, `test_${i}.txt`);
  if (!fs.existsSync(filePath)) continue;
  const content = fs.readFileSync(filePath, 'utf-8');
  console.log(`\n================== TEST ${i} SUMMARY ==================`);
  
  // Look for sections and question numbers
  const lines = content.split('\n').map(l => l.trim()).filter(Boolean);
  for (let j = 0; j < lines.length; j++) {
    const l = lines[j];
    if (/^(Abalroamentos|Balões|Sinais Sonoros|Segurança|Incêndios|Primeiros Socorros|Marinharia|Âncoras|Manobras|Nomenclatura|Cabos|Outras Matérias|Legislação|Marés|Motores|Balizagem|Meteorologia)/i.test(l)) {
      console.log(`  [SECTION] ${l}`);
    } else if (/^[0-9]{1,2}[\.\,\s]\s*(\([0-9\.\,]+\))/.test(l)) {
      console.log(`    ${l.slice(0, 100)}`);
      // print next 2 lines
      if (lines[j+1]) console.log(`      > ${lines[j+1].slice(0, 100)}`);
      if (lines[j+2]) console.log(`      > ${lines[j+2].slice(0, 100)}`);
    }
  }
}
