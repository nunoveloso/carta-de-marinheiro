/**
 * Nautical Term Speech Synthesis Utility (PT-PT)
 * Ensures consistent, high-fidelity European Portuguese pronunciation
 * by prioritizing natural/neural female voices and avoiding robotic fallbacks.
 */

let cachedVoices: SpeechSynthesisVoice[] = [];
let voiceLoadingPromise: Promise<SpeechSynthesisVoice[]> | null = null;

export function initVoices(): Promise<SpeechSynthesisVoice[]> {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return Promise.resolve([]);
  }

  if (cachedVoices.length > 0) {
    return Promise.resolve(cachedVoices);
  }

  if (voiceLoadingPromise) {
    return voiceLoadingPromise;
  }

  voiceLoadingPromise = new Promise((resolve) => {
    const existing = window.speechSynthesis.getVoices();
    if (existing && existing.length > 0) {
      cachedVoices = existing;
      resolve(existing);
      return;
    }

    const onVoicesChanged = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        cachedVoices = voices;
        window.speechSynthesis.onvoiceschanged = null;
        resolve(voices);
      }
    };

    window.speechSynthesis.onvoiceschanged = onVoicesChanged;

    // Safety timeout in case onvoiceschanged does not fire
    setTimeout(() => {
      const fallback = window.speechSynthesis.getVoices();
      cachedVoices = fallback || [];
      resolve(cachedVoices);
    }, 400);
  });

  return voiceLoadingPromise;
}

// Immediately trigger pre-fetching voices on module load
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  initVoices();
}

/**
 * Select the highest quality Portuguese (Portugal) voice with clear natural diction.
 * Strongly prioritizes natural female PT-PT voices (Raquel, Joana, Catarina, Google pt-PT, etc.)
 */
export function getBestPtVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  if (!voices || voices.length === 0) return null;

  // Filter out known low-quality/robotic synthesis engines like eSpeak
  const nonRobotic = voices.filter(
    (v) => !v.name.toLowerCase().includes('espeak') && !v.name.toLowerCase().includes('robotic')
  );

  const voicePool = nonRobotic.length > 0 ? nonRobotic : voices;

  // 1. Preferred high-quality / natural female PT-PT voices
  const preferredFemalePtPtNames = [
    'raquel', // Microsoft Raquel Online (Natural) - Portuguese (Portugal)
    'joana',  // Apple Joana (pt-PT)
    'catarina', // Apple Catarina (pt-PT)
    'ines',   // Apple Inês
    'inês',
    'francisca',
    'maria',
    'portuguese (portugal)',
    'português (portugal)',
    'pt-pt',
  ];

  // Try exact pt-PT with preferred natural female names
  for (const nameKeyword of preferredFemalePtPtNames) {
    const match = voicePool.find(
      (v) =>
        (v.lang.toLowerCase() === 'pt-pt' || v.lang.toLowerCase() === 'pt_pt') &&
        v.name.toLowerCase().includes(nameKeyword)
    );
    if (match) return match;
  }

  // 2. Any Google or Natural PT-PT voice
  const naturalPtPt = voicePool.find(
    (v) =>
      (v.lang.toLowerCase() === 'pt-pt' || v.lang.toLowerCase() === 'pt_pt') &&
      (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Online'))
  );
  if (naturalPtPt) return naturalPtPt;

  // 3. Any standard pt-PT voice
  const anyPtPt = voicePool.find(
    (v) => v.lang.toLowerCase() === 'pt-pt' || v.lang.toLowerCase() === 'pt_pt'
  );
  if (anyPtPt) return anyPtPt;

  // 4. Fallback to any high-quality Portuguese voice (Google / Natural)
  const anyNaturalPt = voicePool.find(
    (v) =>
      v.lang.toLowerCase().startsWith('pt') &&
      (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Online'))
  );
  if (anyNaturalPt) return anyNaturalPt;

  // 5. Fallback to any Portuguese voice
  return voicePool.find((v) => v.lang.toLowerCase().startsWith('pt')) || null;
}

/**
 * Pronounce a nautical term clearly and with steady Portuguese diction
 */
export async function speakNauticalTerm(
  termText: string,
  onEnd?: () => void,
  onError?: () => void
): Promise<void> {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onError) onError();
    return;
  }

  // Cancel any ongoing or pending utterances
  window.speechSynthesis.cancel();

  // Chrome bug workaround: ensure speechSynthesis is not in a paused state
  if (window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
  }

  // Ensure voices are loaded
  const voices = await initVoices();
  const bestVoice = getBestPtVoice(voices);

  // Clean and prepare the text (strip parentheses descriptions if helpful, or keep clean)
  const cleanTerm = termText.trim();
  const utterance = new SpeechSynthesisUtterance(cleanTerm);

  utterance.lang = 'pt-PT';
  // Natural pace: 0.92 gives clear, unhurried articulation
  utterance.rate = 0.92;
  // Pitch 1.02 gives clear, pleasant vocal timbre
  utterance.pitch = 1.02;

  if (bestVoice) {
    utterance.voice = bestVoice;
  }

  utterance.onend = () => {
    if (onEnd) onEnd();
  };

  utterance.onerror = (e) => {
    // If canceled manually, do not treat as fatal error
    if (e.error !== 'canceled') {
      console.warn('SpeechSynthesis error:', e.error);
    }
    if (onError) onError();
  };

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
