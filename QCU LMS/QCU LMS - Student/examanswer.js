// ── LIVE CLOCK (matches class.js exactly) ──
function updateClock() {
  const now = new Date();
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const hours = now.getHours();
  const mins = String(now.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const h = hours % 12 || 12;
  document.getElementById('datetime').textContent =
    `${days[now.getDay()].slice(0,3)}  ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()} | ${h}:${mins} ${ampm}`;
}
updateClock();
setInterval(updateClock, 1000);

// ── CLEAR ──
document.getElementById('btn-clear').addEventListener('click', () => {
  document.querySelectorAll('input[type="radio"]').forEach(r => r.checked = false);
});

// ── SUBMIT ──
const submitModal  = document.getElementById('submit-modal');
const modalCancel  = document.getElementById('modal-cancel');
const modalConfirm = document.getElementById('modal-confirm');

document.getElementById('btn-submit').addEventListener('click', () => {
  submitModal.classList.add('active');
});

modalCancel.addEventListener('click', () => submitModal.classList.remove('active'));
submitModal.addEventListener('click', e => {
  if (e.target === submitModal) submitModal.classList.remove('active');
});

modalConfirm.addEventListener('click', () => {
  submitModal.classList.remove('active');
  document.querySelector('.quiz-wrap').innerHTML = `
    <div style="text-align:center; padding: 80px 20px;">
      <div style="font-size:72px; margin-bottom:20px;">✅</div>
      <h2 style="font-family:'Playfair Display',serif; font-size:32px; color:#8B0000; margin-bottom:12px;">Exam Submitted!</h2>
      <p style="font-size:15px; color:#888; margin-bottom:32px;">Your answers have been recorded successfully.</p>
      <button onclick="history.back()" style="padding:12px 40px; background:#8B0000; color:#fff; border:none; border-radius:10px; font-size:15px; font-weight:700; cursor:pointer; font-family:'DM Sans',sans-serif;">Back to Exam</button>
    </div>`;
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') submitModal.classList.remove('active');
});