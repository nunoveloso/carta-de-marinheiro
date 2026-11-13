import React, { useId } from 'react';
import { AlertCircle, LifeBuoy, Compass } from 'lucide-react';

export interface SafetyEquipmentIllustrationProps {
  termId: string;
  variant?: 'card' | 'modal';
}

const SAFETY_TERMS = new Set([
  'balsa-salvacao',
  'coletes-salvacao',
  'boias-salvacao',
  'boia-com-luz',
  'boia-com-retenida',
]);

export function isSafetyEquipmentTerm(termId: string): boolean {
  return SAFETY_TERMS.has(termId);
}

export const SafetyEquipmentIllustration: React.FC<SafetyEquipmentIllustrationProps> = ({
  termId,
  variant = 'card',
}) => {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');

  if (!SAFETY_TERMS.has(termId)) {
    return null;
  }

  const isModal = variant === 'modal';

  const orangeGrad = `solas-orange-${uid}`;
  const seaGrad = `safety-sea-${uid}`;
  const canisterGrad = `canister-${uid}`;
  const lightGlow = `light-glow-${uid}`;
  const nightSkyGrad = `night-sky-${uid}`;

  // ------------------------------------------------------------------
  // 1. BALSA DE SALVAÇÃO (p. 2)
  // ------------------------------------------------------------------
  if (termId === 'balsa-salvacao') {
    return (
      <div className={`rounded-xs border border-[#d7d0c1] bg-[#faf7f0] ${isModal ? 'p-5 my-4' : 'p-3 mt-3'}`}>
        <div className={`flex items-center justify-between gap-2 ${isModal ? 'pb-3 border-b border-[#d7d0c1] mb-4' : 'mb-2'}`}>
          <span className="font-mono-naut text-[10px] uppercase tracking-wider font-semibold text-[#0b3a55] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-xs bg-[#b3402f]" />
            {isModal ? 'Esquema: Balsa de Salvação (Manual p. 2)' : 'Contentor no Convés & Balsa Insuflada'}
          </span>
          <span className="font-mono-naut text-[10px] uppercase tracking-wider text-[#9a7413] font-medium">
            SOLAS · Água após 24h
          </span>
        </div>

        <div className={isModal ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : ''}>
          {/* Left / Card SVG: Canister strapped on deck with firing painter line */}
          <div className="rounded-xs border border-[#d7d0c1] bg-[#fcfbf8] p-2.5 flex flex-col items-center">
            <svg viewBox="0 0 300 175" className={`w-full h-auto ${isModal ? 'max-h-44' : 'max-h-32'}`} role="img" aria-label="Contentor da balsa de salvação preso ao convés com cabo de disparo">
              <defs>
                <linearGradient id={canisterGrad} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="55%" stopColor="#f1f5f9" />
                  <stop offset="100%" stopColor="#cbd5e1" />
                </linearGradient>
              </defs>

              {/* Deck surface */}
              <rect x="10" y="132" width="280" height="24" fill="#ede9de" stroke="#b9af9b" strokeWidth="1.2" />
              <line x1="10" y1="138" x2="290" y2="138" stroke="#d7d0c1" strokeWidth="1" strokeDasharray="6 4" />

              {/* Deck cradle supports */}
              <path d="M 74 132 L 82 108 L 96 108 L 92 132 Z" fill="#475569" />
              <path d="M 186 132 L 182 108 L 196 108 L 204 132 Z" fill="#475569" />

              {/* Cylindrical canister */}
              <rect x="64" y="54" width="150" height="58" rx="26" fill={`url(#${canisterGrad})`} stroke="#0b3a55" strokeWidth="2" />
              {/* Center seam + SOLAS orange band */}
              <line x1="64" y1="83" x2="214" y2="83" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 2" />
              <rect x="128" y="54" width="22" height="58" fill="#ea580c" fillOpacity="0.9" />
              <text x="139" y="87" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold" fontFamily="'IBM Plex Mono', monospace">SOLAS</text>

              {/* Securing lashing straps */}
              <line x1="88" y1="53" x2="88" y2="115" stroke="#0b3a55" strokeWidth="3.5" />
              <line x1="190" y1="53" x2="190" y2="115" stroke="#0b3a55" strokeWidth="3.5" />

              {/* Cleat / strongpoint on deck for painter line */}
              <path d="M 244 132 L 244 123 M 234 123 L 258 123" stroke="#0b3a55" strokeWidth="3.5" strokeLinecap="round" />
              <circle cx="246" cy="123" r="3" fill="#b3402f" />

              {/* Firing painter cord (cabo de disparo) secured aboard */}
              <path d="M 214 84 C 236 86, 224 114, 246 123" fill="none" stroke="#b3402f" strokeWidth="2.5" strokeLinecap="round" />

              {/* Labels */}
              <text x="139" y="34" textAnchor="middle" fill="#0b3a55" fontSize="10" fontWeight="bold" fontFamily="'IBM Plex Mono', monospace">CONTENTOR PRESO AO CONVÉS</text>
              <text x="242" y="72" textAnchor="middle" fill="#b3402f" fontSize="8.5" fontWeight="bold" fontFamily="'IBM Plex Mono', monospace">Cabo de</text>
              <text x="242" y="82" textAnchor="middle" fill="#b3402f" fontSize="8.5" fontWeight="bold" fontFamily="'IBM Plex Mono', monospace">disparo (CO₂)</text>
              <text x="246" y="150" textAnchor="middle" fill="#4f6e82" fontSize="8.5" fontFamily="'IBM Plex Mono', monospace">Fixo a bordo</text>
            </svg>
            {isModal && (
              <p className="mt-1.5 text-[11px] text-[#4f6e82] text-center">
                Acondicionada no convés com cabo de disparo fixado à embarcação.
              </p>
            )}
          </div>

          {/* Right SVG (modal only): Deployed inflatable orange liferaft */}
          {isModal && (
            <div className="rounded-xs border border-[#d7d0c1] bg-[#fcfbf8] p-2.5 flex flex-col items-center">
              <svg viewBox="0 0 300 175" className="w-full h-auto max-h-44" role="img" aria-label="Balsa insuflada no mar com toldo de proteção">
                <defs>
                  <linearGradient id={seaGrad} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#e0f2fe" />
                    <stop offset="100%" stopColor="#bae6fd" />
                  </linearGradient>
                  <linearGradient id={orangeGrad} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fb923c" />
                    <stop offset="100%" stopColor="#c2410c" />
                  </linearGradient>
                </defs>
                <rect x="8" y="110" width="284" height="56" rx="2" fill={`url(#${seaGrad})`} />
                {/* Canopy */}
                <path d="M 65 108 C 68 42, 232 42, 235 108 Z" fill={`url(#${orangeGrad})`} stroke="#7c2d12" strokeWidth="1.8" />
                {/* Entry opening */}
                <path d="M 122 108 C 124 72, 176 72, 178 108 Z" fill="#0b3a55" stroke="#fde047" strokeWidth="1.5" />
                {/* Top beacon light */}
                <circle cx="150" cy="48" r="4.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.2" />
                {/* Lower double buoyancy tubes */}
                <rect x="52" y="106" width="196" height="16" rx="8" fill="#ea580c" stroke="#7c2d12" strokeWidth="1.6" />
                <rect x="56" y="120" width="188" height="14" rx="7" fill="#c2410c" stroke="#7c2d12" strokeWidth="1.6" />
                {/* Reflective tape */}
                <rect x="74" y="109" width="18" height="7" fill="#f8fafc" />
                <rect x="208" y="109" width="18" height="7" fill="#f8fafc" />
                {/* Grab line */}
                <path d="M 60 128 Q 95 137 130 128 Q 165 137 200 128 Q 220 135 240 128" fill="none" stroke="#faf7f0" strokeWidth="1.8" />
                {/* Waterline waves */}
                <path d="M 18 134 Q 45 128 70 134 T 126 134 T 182 134 T 238 134 T 282 134" fill="none" stroke="#0284c7" strokeWidth="2" />
                <text x="150" y="25" textAnchor="middle" fill="#0b3a55" fontSize="10" fontWeight="bold" fontFamily="'IBM Plex Mono', monospace">BALSA INSUFLADA NO MAR</text>
              </svg>
              <p className="mt-1.5 text-[11px] text-[#9a7413] font-semibold text-center">
                Regra de Exame: Só beber água doce 24 horas após o naufrágio.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ------------------------------------------------------------------
  // 2. COLETES DE SALVAÇÃO (p. 2)
  // ------------------------------------------------------------------
  if (termId === 'coletes-salvacao') {
    return (
      <div className={`rounded-xs border border-[#d7d0c1] bg-[#faf7f0] ${isModal ? 'p-5 my-4' : 'p-3 mt-3'}`}>
        <div className={`flex items-center justify-between gap-2 ${isModal ? 'pb-3 border-b border-[#d7d0c1] mb-4' : 'mb-2'}`}>
          <span className="font-mono-naut text-[10px] uppercase tracking-wider font-semibold text-[#0b3a55] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-xs bg-[#ea580c]" />
            {isModal ? 'Esquema: Colete de Salvação SOLAS (Manual p. 2)' : 'Colete Homologado · Fitas & Apito'}
          </span>
          <span className="font-mono-naut text-[10px] uppercase tracking-wider text-[#9a7413] font-medium">
            Fácil Acesso
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 rounded-xs border border-[#d7d0c1] bg-[#fcfbf8] p-3">
          <svg
            viewBox="0 0 220 200"
            className={`${isModal ? 'w-48 h-44' : 'w-28 h-26'} shrink-0`}
            role="img"
            aria-label="Colete de salvação laranja com colar cervical, fitas retrorrefletoras e apito"
          >
            <defs>
              <linearGradient id={orangeGrad} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fb923c" />
                <stop offset="55%" stopColor="#ea580c" />
                <stop offset="100%" stopColor="#c2410c" />
              </linearGradient>
            </defs>

            {/* Buoyancy collar (gola para manter cabeça fora de água) */}
            <path
              d="M 65 55 C 62 18, 158 18, 155 55 L 142 64 C 134 38, 86 38, 78 64 Z"
              fill={`url(#${orangeGrad})`}
              stroke="#7c2d12"
              strokeWidth="2"
            />
            {/* Collar reflective patches */}
            <rect x="74" y="29" width="18" height="7" rx="1" transform="rotate(-18 83 32)" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.6" />
            <rect x="128" y="29" width="18" height="7" rx="1" transform="rotate(18 137 32)" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.6" />

            {/* Left chest buoyancy pad */}
            <path
              d="M 54 58 L 104 62 L 104 152 C 80 154, 58 148, 52 136 Z"
              fill={`url(#${orangeGrad})`}
              stroke="#7c2d12"
              strokeWidth="2"
            />
            {/* Right chest buoyancy pad */}
            <path
              d="M 166 58 L 116 62 L 116 152 C 140 154, 162 148, 168 136 Z"
              fill={`url(#${orangeGrad})`}
              stroke="#7c2d12"
              strokeWidth="2"
            />

            {/* Chest reflective strips */}
            <rect x="64" y="74" width="24" height="8" rx="1" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.6" />
            <rect x="132" y="74" width="24" height="8" rx="1" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.6" />

            {/* Waist belt & quick-release buckle */}
            <rect x="46" y="106" width="128" height="11" rx="2" fill="#0b3a55" />
            <rect x="101" y="104" width="18" height="15" rx="2" fill="#e2e8f0" stroke="#0b3a55" strokeWidth="1.5" />
            <line x1="110" y1="104" x2="110" y2="119" stroke="#0b3a55" strokeWidth="1.5" />

            {/* Emergency whistle & lanyard */}
            <line x1="138" y1="90" x2="144" y2="124" stroke="#faf7f0" strokeWidth="1.5" />
            <rect x="140" y="122" width="11" height="16" rx="3" fill="#ca9e1c" stroke="#0b3a55" strokeWidth="1" />

            {/* Crotch / leg strap hint */}
            <path d="M 92 152 L 96 178 M 128 152 L 124 178" stroke="#0b3a55" strokeWidth="3.5" strokeLinecap="round" />
            <text x="110" y="193" textAnchor="middle" fill="#4f6e82" fontSize="9" fontWeight="bold" fontFamily="'IBM Plex Mono', monospace">CORREIA SUBCUTAL</text>
          </svg>

          <div className="flex-1 text-xs space-y-1.5">
            <p className="font-bold text-[#0b3a55]">Requisitos Essenciais (DGRM)</p>
            <ul className="space-y-1 text-[11px] text-[#4f6e82] leading-snug">
              <li>• Arrumados em local de <strong className="text-[#0b3a55]">fácil e rápido acesso</strong> (nunca trancados).</li>
              <li>• Tamanho adequado ao peso; <strong className="text-[#0b3a55]">crianças com colete próprio</strong>.</li>
              {isModal && (
                <li>• Cor de alta visibilidade (laranja), fitas retrorrefletoras, apito e gola de sustentação da cabeça.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // ------------------------------------------------------------------
  // 3, 4, 5. BOIAS DE SALVAÇÃO (p. 3)
  // ------------------------------------------------------------------
  const renderLifebuoyRing = (cx: number, cy: number, rOuter: number, rInner: number) => (
    <g>
      <circle cx={cx} cy={cy} r={rOuter} fill={`url(#${orangeGrad})`} stroke="#7c2d12" strokeWidth="2" />
      {/* 4 white SOLAS retroreflective bands */}
      <rect x={cx - 6} y={cy - rOuter + 1} width="12" height={rOuter - rInner - 2} fill="#f8fafc" />
      <rect x={cx - 6} y={cy + rInner + 1} width="12" height={rOuter - rInner - 2} fill="#f8fafc" />
      <rect x={cx - rOuter + 1} y={cy - 6} width={rOuter - rInner - 2} height="12" fill="#f8fafc" />
      <rect x={cx + rInner + 1} y={cy - 6} width={rOuter - rInner - 2} height="12" fill="#f8fafc" />
      {/* Center hole */}
      <circle cx={cx} cy={cy} r={rInner} fill={`url(#${seaGrad})`} stroke="#7c2d12" strokeWidth="2" />
      {/* Grab line / grinalda around the ring */}
      <path
        d={`M ${cx} ${cy - rOuter - 5}
            Q ${cx + rOuter * 0.85} ${cy - rOuter * 0.85} ${cx + rOuter + 5} ${cy}
            Q ${cx + rOuter * 0.85} ${cy + rOuter * 0.85} ${cx} ${cy + rOuter + 5}
            Q ${cx - rOuter * 0.85} ${cy + rOuter * 0.85} ${cx - rOuter - 5} ${cy}
            Q ${cx - rOuter * 0.85} ${cy - rOuter * 0.85} ${cx} ${cy - rOuter - 5}`}
        fill="none"
        stroke="#faf7f0"
        strokeWidth="2.5"
      />
      {/* 4 lashing beckets */}
      <circle cx={cx} cy={cy - rOuter} r="2.5" fill="#0b3a55" />
      <circle cx={cx + rOuter} cy={cy} r="2.5" fill="#0b3a55" />
      <circle cx={cx} cy={cy + rOuter} r="2.5" fill="#0b3a55" />
      <circle cx={cx - rOuter} cy={cy} r="2.5" fill="#0b3a55" />
    </g>
  );

  if (termId === 'boias-salvacao') {
    return (
      <div className={`rounded-xs border border-[#d7d0c1] bg-[#faf7f0] ${isModal ? 'p-5 my-4' : 'p-3 mt-3'}`}>
        <div className={`flex items-center justify-between gap-2 ${isModal ? 'pb-3 border-b border-[#d7d0c1] mb-4' : 'mb-2'}`}>
          <span className="font-mono-naut text-[10px] uppercase tracking-wider font-semibold text-[#0b3a55] flex items-center gap-1.5">
            <LifeBuoy className="w-3.5 h-3.5 text-[#ea580c]" />
            {isModal ? 'Ilustração: Boia de Salvação (Manual p. 3)' : 'Lançamento Imediato · Grinalda & Fitas'}
          </span>
          <span className="font-mono-naut text-[10px] uppercase tracking-wider text-[#9a7413] font-medium">
            Flutuação Individual
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 rounded-xs border border-[#d7d0c1] bg-[#fcfbf8] p-3">
          <svg
            viewBox="0 0 180 180"
            className={`${isModal ? 'w-44 h-44' : 'w-26 h-26'} shrink-0 rounded-xs border border-[#0b3a55]/15`}
            role="img"
            aria-label="Boia de salvação circular cor de laranja com faixas refletoras brancas e grinalda"
          >
            <defs>
              <linearGradient id={seaGrad} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#e0f2fe" />
                <stop offset="100%" stopColor="#bae6fd" />
              </linearGradient>
              <linearGradient id={orangeGrad} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fb923c" />
                <stop offset="55%" stopColor="#ea580c" />
                <stop offset="100%" stopColor="#c2410c" />
              </linearGradient>
            </defs>
            <rect width="180" height="180" fill={`url(#${seaGrad})`} />
            <path d="M 12 36 Q 38 30 64 36 M 118 148 Q 144 142 168 148" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
            {renderLifebuoyRing(90, 90, 56, 30)}
          </svg>

          <div className="flex-1 text-xs space-y-1.5">
            <p className="font-bold text-[#0b3a55]">Pronta para Lançamento Imediato</p>
            <p className="text-[11px] text-[#4f6e82] leading-relaxed">
              Colocada em suporte aberto nos bordos ou popa (nunca amarrada fixamente ao barco) para lançamento imediato ao náufrago.
            </p>
            {isModal && (
              <div className="mt-2 flex items-start gap-1.5 text-[11px] text-[#9a7413] bg-[#f0e8cf]/65 p-2 rounded-xs border border-[#ca9e1c]/40">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>Equipada com grinalda perimetral para o náufrago se agarrar e 4 faixas retrorrefletoras.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (termId === 'boia-com-luz') {
    return (
      <div className={`rounded-xs border border-[#d7d0c1] bg-[#faf7f0] ${isModal ? 'p-5 my-4' : 'p-3 mt-3'}`}>
        <div className={`flex items-center justify-between gap-2 ${isModal ? 'pb-3 border-b border-[#d7d0c1] mb-4' : 'mb-2'}`}>
          <span className="font-mono-naut text-[10px] uppercase tracking-wider font-semibold text-[#0b3a55] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-xs bg-[#ca9e1c]" />
            {isModal ? 'Ilustração: Boia com Luz Automática (Manual p. 3)' : 'Sinalização Noturna Automática'}
          </span>
          <span className="font-mono-naut text-[10px] uppercase tracking-wider text-[#9a7413] font-medium">
            Acende na Água
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 rounded-xs border border-[#d7d0c1] bg-[#fcfbf8] p-3">
          <svg
            viewBox="0 0 280 170"
            className={`${isModal ? 'w-64 h-40' : 'w-36 h-24'} shrink-0 rounded-xs border border-[#0b3a55]/20`}
            role="img"
            aria-label="Boia de salvação ligada a facho luminoso de acendimento automático na água"
          >
            <defs>
              <linearGradient id={nightSkyGrad} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#082438" />
                <stop offset="100%" stopColor="#0b3a55" />
              </linearGradient>
              <linearGradient id={seaGrad} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0e4a6b" />
                <stop offset="100%" stopColor="#082b3f" />
              </linearGradient>
              <linearGradient id={orangeGrad} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fb923c" />
                <stop offset="100%" stopColor="#c2410c" />
              </linearGradient>
              <radialGradient id={lightGlow} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fef08a" stopOpacity="0.95" />
                <stop offset="45%" stopColor="#facc15" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#facc15" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Night backdrop + water */}
            <rect width="280" height="82" fill={`url(#${nightSkyGrad})`} />
            <rect y="82" width="280" height="88" fill={`url(#${seaGrad})`} />
            <path d="M 10 82 Q 45 77 80 82 T 150 82 T 220 82 T 270 82" fill="none" stroke="#7dd3fc" strokeWidth="1.8" opacity="0.7" />

            {/* Lifebuoy floating flat/tilted in sea */}
            <g transform="translate(88, 114) scale(0.75, 0.56)">
              {renderLifebuoyRing(0, 0, 56, 30)}
            </g>

            {/* Connecting lanyard */}
            <path d="M 124 126 Q 160 144 196 120" fill="none" stroke="#faf7f0" strokeWidth="2.2" strokeDasharray="3 2" />

            {/* Glowing floating strobe light cylinder */}
            <circle cx="204" cy="60" r="34" fill={`url(#${lightGlow})`} />
            {/* Light rays */}
            <line x1="204" y1="18" x2="204" y2="30" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" />
            <line x1="172" y1="36" x2="182" y2="44" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" />
            <line x1="236" y1="36" x2="226" y2="44" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" />
            {/* Light body */}
            <rect x="195" y="72" width="18" height="46" rx="4" fill="#eab308" stroke="#0b3a55" strokeWidth="1.5" />
            <rect x="197" y="64" width="14" height="10" rx="2" fill="#f8fafc" stroke="#0b3a55" strokeWidth="1.2" />
            <circle cx="204" cy="58" r="6" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.2" />

            <text x="204" y="148" textAnchor="middle" fill="#faf7f0" fontSize="9" fontWeight="bold" fontFamily="'IBM Plex Mono', monospace">LUZ AUTOMÁTICA</text>
          </svg>

          <div className="flex-1 text-xs space-y-1.5">
            <p className="font-bold text-[#0b3a55]">Localização Noturna de Náufrago</p>
            <p className="text-[11px] text-[#4f6e82] leading-relaxed">
              Quando lançada à água, o aparelho luminoso invertido liga automaticamente (por gravidade/contacto com a água), sinalizando a posição durante a noite.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ------------------------------------------------------------------
  // 5. BOIA DE SALVAÇÃO COM RETENIDA (p. 3)
  // ------------------------------------------------------------------
  return (
    <div className={`rounded-xs border border-[#d7d0c1] bg-[#faf7f0] ${isModal ? 'p-5 my-4' : 'p-3 mt-3'}`}>
      <div className={`flex items-center justify-between gap-2 ${isModal ? 'pb-3 border-b border-[#d7d0c1] mb-4' : 'mb-2'}`}>
        <span className="font-mono-naut text-[10px] uppercase tracking-wider font-semibold text-[#0b3a55] flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-[#1e7d4f]" />
          {isModal ? 'Ilustração: Boia com Cabo de Retenida (Manual p. 3)' : 'Recuperação Segura por Cabo Flutuante'}
        </span>
        <span className="font-mono-naut text-[10px] uppercase tracking-wider text-[#1e7d4f] font-medium">
          Com Retenida
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 rounded-xs border border-[#d7d0c1] bg-[#fcfbf8] p-3">
        <svg
          viewBox="0 0 280 160"
          className={`${isModal ? 'w-64 h-36' : 'w-36 h-22'} shrink-0 rounded-xs border border-[#0b3a55]/15`}
          role="img"
          aria-label="Boia de salvação ligada a embarcação através de cabo de retenida flutuante"
        >
          <defs>
            <linearGradient id={seaGrad} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e0f2fe" />
              <stop offset="100%" stopColor="#bae6fd" />
            </linearGradient>
            <linearGradient id={orangeGrad} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#c2410c" />
            </linearGradient>
          </defs>

          <rect width="280" height="160" fill={`url(#${seaGrad})`} />

          {/* Boat stern/gunwale section on left */}
          <path d="M 0 38 L 58 46 L 46 116 L 0 116 Z" fill="#fcfbf8" stroke="#0b3a55" strokeWidth="2" />
          <line x1="0" y1="54" x2="56" y2="59" stroke="#0b3a55" strokeWidth="2" />
          <circle cx="44" cy="64" r="3.5" fill="#0b3a55" />

          {/* Coiled buoyant heaving line (cabo de retenida) */}
          <path
            d="M 44 64 C 78 68, 92 108, 126 102 C 154 96, 166 116, 198 104"
            fill="none"
            stroke="#1e7d4f"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <text x="122" y="84" textAnchor="middle" fill="#1e7d4f" fontSize="9.5" fontWeight="bold" fontFamily="'IBM Plex Mono', monospace">CABO DE RETENIDA</text>

          {/* Lifebuoy on right */}
          <g transform="translate(222, 96) scale(0.65, 0.52)">
            {renderLifebuoyRing(0, 0, 56, 30)}
          </g>

          {/* Pull arrow back to boat */}
          <path d="M 155 124 L 88 124 M 88 124 L 96 119 M 88 124 L 96 129" stroke="#0b3a55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <text x="122" y="140" textAnchor="middle" fill="#0b3a55" fontSize="8.5" fontWeight="bold" fontFamily="'IBM Plex Mono', monospace">Alar / Recuperar</text>
        </svg>

        <div className="flex-1 text-xs space-y-1.5">
          <p className="font-bold text-[#0b3a55]">Ligação Direta ao Náufrago</p>
          <p className="text-[11px] text-[#4f6e82] leading-relaxed">
            O cabo leve de retenida (normalmente flutuante) permite alar a boia com o náufrago para bordo ou trazê-la de volta caso o lançamento falhe o alvo.
          </p>
        </div>
      </div>
    </div>
  );
};
