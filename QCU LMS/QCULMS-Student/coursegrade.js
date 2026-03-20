// ── CLOCK ──
function updateClock() {
  const now = new Date();
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const h = now.getHours() % 12 || 12;
  const m = String(now.getMinutes()).padStart(2,'0');
  const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
  document.getElementById('datetime').textContent =
    `${days[now.getDay()].slice(0,3)}  ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()} | ${h}:${m} ${ampm}`;
}
updateClock();
setInterval(updateClock, 1000);

// ── JOIN CLASS MODAL ──
const addClassBtn  = document.getElementById('add-class-btn');
const joinBackdrop = document.getElementById('join-backdrop');
const joinCancel   = document.getElementById('join-cancel');
const joinConfirm  = document.getElementById('join-confirm');
const joinInput    = document.getElementById('join-input');

addClassBtn.addEventListener('click', () => {
  joinInput.value = '';
  joinBackdrop.classList.add('active');
  setTimeout(() => joinInput.focus(), 100);
});
joinCancel.addEventListener('click', () => joinBackdrop.classList.remove('active'));
joinBackdrop.addEventListener('click', e => { if (e.target === joinBackdrop) joinBackdrop.classList.remove('active'); });
joinConfirm.addEventListener('click', () => {
  const code = joinInput.value.trim();
  if (!code) { joinInput.focus(); return; }
  alert(`Joining class with code: ${code}`);
  joinBackdrop.classList.remove('active');
});
joinInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') joinConfirm.click();
  if (e.key === 'Escape') joinBackdrop.classList.remove('active');
});

// ── LOGOUT MODAL ──
const logoutBtn     = document.getElementById('logout-btn');
const modalBackdrop = document.getElementById('modal-backdrop');
const modalCancel   = document.getElementById('modal-cancel');
const modalConfirm  = document.getElementById('modal-confirm');

logoutBtn.addEventListener('click', () => modalBackdrop.classList.add('active'));
modalCancel.addEventListener('click', () => modalBackdrop.classList.remove('active'));
modalBackdrop.addEventListener('click', e => { if (e.target === modalBackdrop) modalBackdrop.classList.remove('active'); });
modalConfirm.addEventListener('click', () => window.location.href = 'index.html');
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    modalBackdrop.classList.remove('active');
    joinBackdrop.classList.remove('active');
  }
});