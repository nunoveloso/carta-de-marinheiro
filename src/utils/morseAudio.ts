// Utility to play Morse code audio using the Web Audio API
export const playMorseCode = (morsePattern: string): void => {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    const dotDuration = 0.08; // 80ms per dot
    const dashDuration = dotDuration * 3; // 240ms per dash
    const intraCharPause = dotDuration; // pause between dot/dash
    const freq = 700; // standard 700Hz maritime CW tone

    let currentTime = ctx.currentTime + 0.05;

    for (let i = 0; i < morsePattern.length; i++) {
      const char = morsePattern[i];
      if (char === '·' || char === '.') {
        // Dot
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, currentTime);

        // Click-free envelope
        gain.gain.setValueAtTime(0, currentTime);
        gain.gain.linearRampToValueAtTime(0.25, currentTime + 0.005);
        gain.gain.setValueAtTime(0.25, currentTime + dotDuration - 0.005);
        gain.gain.linearRampToValueAtTime(0, currentTime + dotDuration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(currentTime);
        osc.stop(currentTime + dotDuration);

        currentTime += dotDuration + intraCharPause;
      } else if (char === '—' || char === '-') {
        // Dash
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, currentTime);

        gain.gain.setValueAtTime(0, currentTime);
        gain.gain.linearRampToValueAtTime(0.25, currentTime + 0.005);
        gain.gain.setValueAtTime(0.25, currentTime + dashDuration - 0.005);
        gain.gain.linearRampToValueAtTime(0, currentTime + dashDuration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(currentTime);
        osc.stop(currentTime + dashDuration);

        currentTime += dashDuration + intraCharPause;
      } else if (char === ' ') {
        currentTime += dotDuration * 3;
      }
    }
  } catch (err) {
    console.warn('Web Audio not supported or blocked:', err);
  }
};
