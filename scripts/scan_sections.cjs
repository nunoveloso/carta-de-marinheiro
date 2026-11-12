const fs = require('fs');
const path = require('path');

const outDir = path.resolve(__dirname, '../extracted_tests');

// We will inspect each file and extract segments between question numbers
const questions = [];

for (let t = 1; t <= 13; t++) {
  const filePath = path.join(outDir, `clean_${t}.txt`);
  if (!fs.existsSync(filePath)) continue;
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Split into lines
  const lines = content.split('\n');
  let currentSection = 'Geral';
  let currentSub = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Check for section headers
    if (/RIEAM|Abalroamentos/i.test(line)) { currentSection = 'RIEAM'; currentSub = 'Abalroamentos'; }
    else if (/Bal[oõ]es/i.test(line)) { currentSection = 'RIEAM'; currentSub = 'Balões'; }
    else if (/Sinais Sonoros/i.test(line)) { currentSection = 'RIEAM'; currentSub = 'Sinais Sonoros'; }
    else if (/Seguran[cç]a e Primeiros Socorros/i.test(line)) { currentSection = 'Segurança e Primeiros Socorros'; currentSub = 'Segurança'; }
    else if (/Inc[eê]ndios/i.test(line)) { currentSection = 'Segurança e Primeiros Socorros'; currentSub = 'Incêndios'; }
    else if (/Primeiros Socorros/i.test(line)) { currentSection = 'Segurança e Primeiros Socorros'; currentSub = 'Primeiros Socorros'; }
    else if (/Marinharia/i.test(line)) { currentSection = 'Marinharia'; currentSub = 'Âncoras e Amarras'; }
    else if (/[AÂ]ncoras e Amarras/i.test(line)) { currentSection = 'Marinharia'; currentSub = 'Âncoras e Amarras'; }
    else if (/Manobras/i.test(line)) { currentSection = 'Marinharia'; currentSub = 'Manobras'; }
    else if (/Nomenclatura/i.test(line)) { currentSection = 'Marinharia'; currentSub = 'Nomenclatura'; }
    else if (/Cabos,? Voltas e N[oó]s/i.test(line)) { currentSection = 'Marinharia'; currentSub = 'Cabos, Voltas e Nós'; }
    else if (/Outras Mat[eé]rias/i.test(line)) { currentSection = 'Outras Matérias'; currentSub = 'Legislação'; }
    else if (/Legisla[cç][aã]o/i.test(line)) { currentSection = 'Outras Matérias'; currentSub = 'Legislação'; }
    else if (/Mar[eé]s/i.test(line)) { currentSection = 'Outras Matérias'; currentSub = 'Marés'; }
    else if (/Motores/i.test(line)) { currentSection = 'Outras Matérias'; currentSub = 'Motores'; }
    else if (/Balizagem/i.test(line)) { currentSection = 'Outras Matérias'; currentSub = 'Balizagem'; }
    else if (/Meteorologia/i.test(line)) { currentSection = 'Outras Matérias'; currentSub = 'Meteorologia'; }
  }
}

console.log('Done scanning sections.');
