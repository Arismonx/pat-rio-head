const pet = document.getElementById('pet');
const hand = document.getElementById('hand');
const scoreEl = document.getElementById('score');

const GIF_SRC = hand.src;
let score = 0;
let hideTimer;

// สร้างเสียงด้วย Web Audio (ไม่ต้องมีไฟล์เสียง)
// ถ้าอยากใช้ไฟล์เสียงเอง: const sound = new Audio('sound/pat.mp3'); แล้วเรียก sound.currentTime=0; sound.play();
let audioCtx;
function playSound() {
  audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
  const t = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(600, t);
  osc.frequency.exponentialRampToValueAtTime(900, t + 0.1);
  gain.gain.setValueAtTime(0.3, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
  osc.connect(gain).connect(audioCtx.destination);
  osc.start(t);
  osc.stop(t + 0.15);
}

pet.addEventListener('click', () => {
  score++;
  scoreEl.textContent = score;
  playSound();

  // รีสตาร์ท gif ทุกครั้งที่กด
  hand.classList.remove('show');
  hand.src = '';
  hand.src = GIF_SRC;
  hand.classList.add('show');
  clearTimeout(hideTimer);
  hideTimer = setTimeout(() => hand.classList.remove('show'), 300);

  // เด้ง
  pet.classList.remove('bounce');
  void pet.offsetWidth;
  pet.classList.add('bounce');
});
