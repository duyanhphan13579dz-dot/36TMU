/**
 * Bộ máy âm thanh tối giản cho "Kho bài nhảy":
 *  - Metronome đếm nhịp 1-2-3-4 bằng Web Audio API
 *  - Xuất file nhạc đếm nhịp .wav (tự encode 16-bit PCM, không cần thư viện)
 */

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;
  if (!ctx) ctx = new AC();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function click(atTime: number, freq: number, gain = 0.5, duration = 0.09) {
  const ac = getCtx();
  if (!ac) return;
  const osc = ac.createOscillator();
  const amp = ac.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(freq, atTime);
  amp.gain.setValueAtTime(0.0001, atTime);
  amp.gain.exponentialRampToValueAtTime(gain, atTime + 0.012);
  amp.gain.exponentialRampToValueAtTime(0.0001, atTime + duration);
  osc.connect(amp).connect(ac.destination);
  osc.start(atTime);
  osc.stop(atTime + duration + 0.02);
}

export type MetronomeHandle = { stop: () => void };

/** Chạy metronome theo BPM, gọi callback mỗi nhịp (1→4) */
export function startMetronome(
  bpm: number,
  onBeat: (beat: number) => void,
  countIn = 0,
): MetronomeHandle | null {
  const ac = getCtx();
  if (!ac) return null;

  let beat = 0;
  let stopped = false;
  const interval = 60 / bpm;
  // Lập lịch theo "lookahead" để nhịp không bị lệch khi tab bị throttle
  const scheduleAhead = 0.4;
  let nextNoteTime = ac.currentTime + 0.12;
  let scheduledUpTo = nextNoteTime;

  const tick = () => {
    if (stopped) return;
    while (scheduledUpTo < ac.currentTime + scheduleAhead) {
      const barBeat = beat % 4;
      const accent = barBeat === 0;
      click(scheduledUpTo, accent ? 1320 : 880, accent ? 0.5 : 0.3, accent ? 0.1 : 0.07);
      const delay = Math.max(0, (scheduledUpTo - ac.currentTime) * 1000);
      const currentBeat = countIn > 0 ? 0 : barBeat + 1;
      window.setTimeout(() => !stopped && onBeat(currentBeat), delay);
      scheduledUpTo += interval;
      beat += 1;
    }
  };
  const timer = window.setInterval(tick, 25);
  scheduledUpTo = nextNoteTime;
  tick();

  return {
    stop: () => {
      stopped = true;
      window.clearInterval(timer);
    },
  };
}

/** Encode Float32 mono → WAV 16-bit */
function encodeWav(samples: Float32Array, sampleRate: number): Blob {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);
  const writeStr = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i += 1) view.setUint8(offset + i, str.charCodeAt(i));
  };
  writeStr(0, "RIFF");
  view.setUint32(4, 36 + samples.length * 2, true);
  writeStr(8, "WAVE");
  writeStr(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeStr(36, "data");
  view.setUint32(40, samples.length * 2, true);
  let offset = 44;
  for (let i = 0; i < samples.length; i += 1) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    offset += 2;
  }
  return new Blob([view], { type: "audio/wav" });
}

function renderClickInto(data: Float32Array, startSample: number, freq: number, gain: number, sampleRate: number) {
  const dur = 0.12;
  const len = Math.floor(dur * sampleRate);
  for (let i = 0; i < len; i += 1) {
    const t = i / sampleRate;
    const env = Math.exp(-t * 34) * gain;
    const sample = Math.sin(2 * Math.PI * freq * t) * env + Math.sin(2 * Math.PI * freq * 2 * t) * env * 0.35;
    const idx = startSample + i;
    if (idx < data.length) data[idx] += sample;
  }
}

/**
 * Tạo file nhạc đếm nhịp: 4 nhịp/bARS × số bar, nhịp 1 có âm cao hơn,
 * kèm giọng "đếm" dạng beep mô phỏng 1-2-3-4.
 */
export function buildClickTrackWav(bpm: number, bars = 16): Blob {
  const sampleRate = 22050;
  const beatSec = 60 / bpm;
  const totalSec = bars * 4 * beatSec + 0.6;
  const data = new Float32Array(Math.floor(totalSec * sampleRate));
  for (let b = 0; b < bars * 4; b += 1) {
    const accent = b % 4 === 0;
    renderClickInto(data, Math.floor(b * beatSec * sampleRate), accent ? 1200 : 800, accent ? 0.55 : 0.35, sampleRate);
  }
  return encodeWav(data, sampleRate);
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 2000);
}
