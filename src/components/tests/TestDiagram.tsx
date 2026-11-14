import React from 'react';
import { DiagramConfig } from '../../types/tests';

interface TestDiagramProps {
  diagram: DiagramConfig;
}

export const TestDiagram: React.FC<TestDiagramProps> = ({ diagram }) => {
  const { type, variant } = diagram;

  return (
    <div className="my-4 p-4 rounded-none border border-border bg-card flex flex-col items-center justify-center">
      
      {/* 1. Rumos Cruzados / Colisão (Abalroamentos - Questão 2) */}
      {/* Reprodução fiel dos esquemas técnicos em papel dos testes da DGRM */}
      {type === 'vessel-crossing' && (
        <svg viewBox="0 0 320 200" className="w-full max-w-sm h-48 select-none">
          {/* Caixa de esquema com estilo de folha de exame técnico */}
          <rect x="2" y="2" width="316" height="196" fill="#fdfcf9" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" rx="4" />

          {variant === 'crossing-a-standon' ? (
            <g>
              {/* Situação Teste 1: Embarcação A a navegar para vante (Norte/Nordeste) e Embarcação B em rumo cruzado */}
              {/* Linhas de rumo com setas */}
              <line x1="80" y1="160" x2="160" y2="80" stroke="#0f172a" strokeWidth="1.5" strokeDasharray="4 3" />
              <line x1="240" y1="160" x2="160" y2="80" stroke="#0f172a" strokeWidth="1.5" strokeDasharray="4 3" />

              {/* Ponto de cruzamento */}
              <circle cx="160" cy="80" r="3" fill="#0f172a" />

              {/* Embarcação A (proa pontiaguda orientada a 45° ao longo do seu rumo) */}
              <g transform="translate(80, 160) rotate(45)">
                {/* Casco técnico a preto e branco como no PDF */}
                <path d="M 0,-24 C 9,-10 9,14 7,22 L -7,22 C -9,14 -9,-10 0,-24 Z" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
                {/* Seta na proa indicando o sentido de avanço */}
                <line x1="0" y1="-24" x2="0" y2="-34" stroke="#0f172a" strokeWidth="1.5" />
                <polygon points="0,-38 -3,-33 3,-33" fill="#0f172a" />
                {/* Letra identificadora */}
                <text x="0" y="6" textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="bold">A</text>
              </g>

              {/* Embarcação B (proa pontiaguda orientada a -45° ao longo do seu rumo) */}
              <g transform="translate(240, 160) rotate(-45)">
                <path d="M 0,-24 C 9,-10 9,14 7,22 L -7,22 C -9,14 -9,-10 0,-24 Z" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
                <line x1="0" y1="-24" x2="0" y2="-34" stroke="#0f172a" strokeWidth="1.5" />
                <polygon points="0,-38 -3,-33 3,-33" fill="#0f172a" />
                <text x="0" y="6" textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="bold">B</text>
              </g>

              {/* Legendas simples e limpas idênticas ao PDF oficial (SEM dar a resposta) */}
              <text x="60" y="185" fill="#334155" fontSize="11" fontWeight="bold">Embarcação A</text>
              <text x="210" y="185" fill="#334155" fontSize="11" fontWeight="bold">Embarcação B</text>
            </g>
          ) : (
            <g>
              {/* Situação Teste 2: B navega em frente, A aproxima-se por bombordo de B */}
              {/* Rumo de B (avança no rumo vertical/norte) */}
              <line x1="190" y1="170" x2="190" y2="40" stroke="#0f172a" strokeWidth="1.5" strokeDasharray="4 3" />
              {/* Rumo de A (vem da esquerda em rumo oblíquo) */}
              <line x1="60" y1="130" x2="190" y2="90" stroke="#0f172a" strokeWidth="1.5" strokeDasharray="4 3" />

              <circle cx="190" cy="90" r="3" fill="#0f172a" />

              {/* Embarcação A (proa apontada para o ponto de colisão) */}
              <g transform="translate(60, 130) rotate(73)">
                <path d="M 0,-24 C 9,-10 9,14 7,22 L -7,22 C -9,14 -9,-10 0,-24 Z" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
                <line x1="0" y1="-24" x2="0" y2="-34" stroke="#0f172a" strokeWidth="1.5" />
                <polygon points="0,-38 -3,-33 3,-33" fill="#0f172a" />
                <text x="0" y="6" textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="bold">A</text>
              </g>

              {/* Embarcação B (proa apontada para a frente/cima) */}
              <g transform="translate(190, 170) rotate(0)">
                <path d="M 0,-24 C 9,-10 9,14 7,22 L -7,22 C -9,14 -9,-10 0,-24 Z" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
                <line x1="0" y1="-24" x2="0" y2="-34" stroke="#0f172a" strokeWidth="1.5" />
                <polygon points="0,-38 -3,-33 3,-33" fill="#0f172a" />
                <text x="0" y="6" textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="bold">B</text>
              </g>

              <text x="45" y="170" fill="#334155" fontSize="11" fontWeight="bold">Embarcação A</text>
              <text x="210" y="175" fill="#334155" fontSize="11" fontWeight="bold">Embarcação B</text>
            </g>
          )}
        </svg>
      )}

      {/* 2. Balões no Mastro (Questão 4 do exame: mastro para desenhar/identificar balões) */}
      {/* Como no teste em papel: apenas o perfil com mastro SEM legendas reveladoras */}
      {type === 'day-shapes' && (
        <svg viewBox="0 0 200 160" className="w-full max-w-xs h-40 select-none">
          <rect x="2" y="2" width="196" height="156" fill="#fdfcf9" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" rx="4" />
          
          {/* Casco da embarcação em perfil técnico de exame */}
          <path d="M 30,130 C 50,135 150,135 175,120 L 165,135 L 35,135 Z" fill="#e2e8f0" stroke="#0f172a" strokeWidth="1.5" />
          {/* Linha de água */}
          <line x1="20" y1="135" x2="185" y2="135" stroke="#94a3b8" strokeWidth="1.5" />

          {/* Mastro */}
          <line x1="100" y1="25" x2="100" y2="130" stroke="#0f172a" strokeWidth="2" />
          <line x1="75" y1="50" x2="125" y2="50" stroke="#0f172a" strokeWidth="1.5" />

          {/* Guia vertical para desenho das marcas */}
          <line x1="100" y1="35" x2="100" y2="110" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
      )}

      {/* 3. Âncora de Almirantado (Questão 13 do exame oficial) */}
      {/* O PDF mostra a âncora e números: 1 a 6 a apontar para as peças, SEM nomes */}
      {type === 'anchor-parts' && (
        <svg viewBox="0 0 260 220" className="w-full max-w-xs h-52 select-none">
          <rect x="2" y="2" width="256" height="216" fill="#fdfcf9" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" rx="4" />

          {/* 1. Anete (argola) */}
          <circle cx="130" cy="30" r="14" fill="none" stroke="#0f172a" strokeWidth="3" />
          <text x="165" y="34" fill="#0f172a" fontSize="12" fontWeight="bold">1</text>
          <line x1="145" y1="30" x2="160" y2="30" stroke="#0f172a" strokeWidth="1" />

          {/* 2. Cepo */}
          <rect x="50" y="55" width="160" height="8" rx="2" fill="#0f172a" stroke="#0f172a" />
          <circle cx="50" cy="59" r="6" fill="#0f172a" />
          <circle cx="210" cy="59" r="6" fill="#0f172a" />
          <text x="25" y="63" fill="#0f172a" fontSize="12" fontWeight="bold">2</text>
          <line x1="35" y1="59" x2="48" y2="59" stroke="#0f172a" strokeWidth="1" />

          {/* 3. Haste */}
          <rect x="126" y="40" width="8" height="135" fill="#0f172a" />
          <text x="155" y="105" fill="#0f172a" fontSize="12" fontWeight="bold">3</text>
          <line x1="135" y1="101" x2="150" y2="101" stroke="#0f172a" strokeWidth="1" />

          {/* 4. Nó / Cruz */}
          <circle cx="130" cy="175" r="7" fill="#0f172a" />
          <text x="130" y="205" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="bold">4</text>
          <line x1="130" y1="184" x2="130" y2="194" stroke="#0f172a" strokeWidth="1" />

          {/* 6. Braços */}
          <path d="M 60,140 C 80,185 130,185 130,175 C 130,185 180,185 200,140" fill="none" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" />
          <text x="175" y="165" fill="#0f172a" fontSize="12" fontWeight="bold">6</text>
          <line x1="165" y1="168" x2="172" y2="164" stroke="#0f172a" strokeWidth="1" />

          {/* 5. Unhas */}
          <polygon points="55,140 68,130 50,118" fill="#0f172a" />
          <polygon points="205,140 192,130 210,118" fill="#0f172a" />
          <text x="25" y="130" fill="#0f172a" fontSize="12" fontWeight="bold">5</text>
          <line x1="35" y1="126" x2="48" y2="126" stroke="#0f172a" strokeWidth="1" />
        </svg>
      )}

      {/* 4. Nós Náuticos (Questão 21: Nó Volta de Fiel) */}
      {/* Desenho técnico a traço simples sem dar a resposta */}
      {type === 'knots' && (
        <svg viewBox="0 0 240 160" className="w-full max-w-xs h-40 select-none">
          <rect x="2" y="2" width="236" height="156" fill="#fdfcf9" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" rx="4" />
          
          {/* Vara / Barra cilíndrica */}
          <rect x="30" y="68" width="180" height="24" rx="3" fill="#cbd5e1" stroke="#0f172a" strokeWidth="1.5" />
          
          {/* Cabo em Volta de Fiel desenhado a traço técnico como nos testes */}
          <path d="M 55,145 L 80,85 C 85,55 115,55 120,85 L 135,130 C 140,65 170,65 175,85 L 185,25" 
                fill="none" stroke="#0f172a" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 95,90 L 150,90" 
                fill="none" stroke="#0f172a" strokeWidth="5.5" strokeLinecap="round" />
        </svg>
      )}

      {/* 5. Amarração ao Cais (Questão 15 do teste oficial) */}
      {type === 'mooring' && (
        <svg viewBox="0 0 320 160" className="w-full max-w-sm h-40 select-none">
          <rect x="2" y="2" width="316" height="156" fill="#fdfcf9" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" rx="4" />

          {/* Cais com cabeços */}
          <rect x="30" y="20" width="260" height="24" fill="#e2e8f0" stroke="#0f172a" strokeWidth="1.5" />
          <text x="160" y="36" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="bold">CAIS</text>
          
          <circle cx="65" cy="32" r="4" fill="#0f172a" />
          <circle cx="255" cy="32" r="4" fill="#0f172a" />

          {/* Embarcação */}
          <rect x="80" y="90" width="160" height="38" rx="8" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
          <text x="160" y="114" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="bold">EMBARCAÇÃO</text>
          <text x="95" y="113" fill="#64748b" fontSize="9">Proa</text>
          <text x="225" y="113" fill="#64748b" fontSize="9">Popa</text>

          {/* Lançantes esquemáticos sem texto revelador */}
          <line x1="90" y1="90" x2="65" y2="36" stroke="#0f172a" strokeWidth="2" />
          <line x1="230" y1="90" x2="255" y2="36" stroke="#0f172a" strokeWidth="2" />
        </svg>
      )}

      {/* 6. Regiões da Embarcação (Questão 20 do teste oficial) */}
      {/* O exame mostra apenas a vista superior do barco e uma seta com interrogação '?' */}
      {type === 'boat-regions' && (
        <svg viewBox="0 0 280 160" className="w-full max-w-xs h-40 select-none">
          <rect x="2" y="2" width="276" height="156" fill="#fdfcf9" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" rx="4" />

          <g transform="translate(130, 80)">
            {/* Casco em vista de cima (proa à direita) */}
            <path d="M -80,0 C -50,-32 40,-32 80,0 C 40,32 -50,32 -80,0 Z" 
                  fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
            
            <text x="-95" y="4" textAnchor="end" fill="#64748b" fontSize="10">Popa</text>
            <text x="95" y="4" textAnchor="start" fill="#64748b" fontSize="10">Proa</text>

            {/* Seta simples a apontar para a região em teste como no PDF */}
            <line x1="90" y1="48" x2="60" y2="20" stroke="#0f172a" strokeWidth="2" />
            <polygon points="56,16 68,18 64,28" fill="#0f172a" />
            <text x="105" y="52" fill="#0f172a" fontSize="14" fontWeight="bold">?</text>
          </g>
        </svg>
      )}
    </div>
  );
};
