const fs = require('fs');
const path = require('path');
const { PDFParse } = require('pdf-parse');

const pdfFiles = [
  { id: 1, file: 'Teste_1_49e330a9.pdf' },
  { id: 2, file: 'Teste_2_8789fb88.pdf' },
  { id: 3, file: 'Teste_3_e6e0daf1.pdf' },
  { id: 4, file: 'Teste_4_e0b25b1a.pdf' },
  { id: 5, file: 'Teste_5_9b7adc0a.pdf' },
  { id: 6, file: 'Teste_6_3d47aae8.pdf' },
  { id: 7, file: 'Teste_7_034a09b6.pdf' },
  { id: 8, file: 'Teste_8_c20f42cd.pdf' },
  { id: 9, file: 'Teste_9_8815a913.pdf' },
  { id: 10, file: 'Teste_10_0cccabf2.pdf' },
  { id: 11, file: 'Teste_11_ed24a17f.pdf' },
  { id: 12, file: 'Teste_12_78f05706.pdf' },
  { id: 13, file: 'Teste_13_47ad88ef.pdf' },
];

async function run() {
  const assetsDir = path.resolve(__dirname, '../public/assets/aistudio');
  const outDir = path.resolve(__dirname, '../extracted_tests');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  for (const item of pdfFiles) {
    const pdfPath = path.join(assetsDir, item.file);
    if (!fs.existsSync(pdfPath)) {
      console.log(`File not found: ${pdfPath}`);
      continue;
    }
    const dataBuffer = fs.readFileSync(pdfPath);
    try {
      const parser = new PDFParse(new Uint8Array(dataBuffer));
      await parser.load();
      const textResult = await parser.getText();
      const fullText = (textResult.pages || []).map(p => p.text).join('\n--- PAGE BREAK ---\n') || textResult.text || '';
      const txtPath = path.join(outDir, `test_${item.id}.txt`);
      fs.writeFileSync(txtPath, fullText, 'utf-8');
      console.log(`Test ${item.id} (${item.file}) parsed: ${fullText.length} chars, saved to ${txtPath}`);
    } catch (e) {
      console.error(`Error parsing test ${item.id}:`, e);
    }
  }
}

run();
