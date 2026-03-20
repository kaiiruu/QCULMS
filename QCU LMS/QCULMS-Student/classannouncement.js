// ── LIVE CLOCK (matches class.js exactly) ──
function updateClock() {
  const now = new Date();
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const hours = now.getHours();
  const mins = String(now.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const h = hours % 12 || 12;
  const str = `${days[now.getDay()].slice(0,3)}  ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()} | ${h}:${mins} ${ampm}`;
  document.getElementById('datetime').textContent = str;

  // Post date (bold day + muted date/time)
  const postDate = document.getElementById('post-date');
  if (postDate) {
    postDate.innerHTML = `<strong>${days[now.getDay()]}</strong>&nbsp;&nbsp;${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()} | ${h}:${mins} ${ampm}`;
  }
}
updateClock();
setInterval(updateClock, 1000);

// ── CLASS COMMENTS ──
const commentInput   = document.getElementById('comment-input');
const sendBtn        = document.getElementById('send-btn');
const postedComments = document.getElementById('posted-comments');

function postComment() {
  const text = commentInput.value.trim();
  if (!text) return;
  const item = document.createElement('div');
  item.className = 'posted-comment-item';
  item.innerHTML = `
    <div class="commenter-avatar" style="width:36px;height:36px;border-radius:50%;background:#8B0000;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#fff;flex-shrink:0;">J</div>
    <div class="posted-bubble">
      <div class="c-name">Jheriemy Araullo</div>
      ${text}
    </div>`;
  postedComments.appendChild(item);
  commentInput.value = '';
  item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

sendBtn.addEventListener('click', postComment);
commentInput.addEventListener('keydown', e => { if (e.key === 'Enter') postComment(); });

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
joinBackdrop.addEventListener('click', e => {
  if (e.target === joinBackdrop) joinBackdrop.classList.remove('active');
});
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
modalBackdrop.addEventListener('click', e => {
  if (e.target === modalBackdrop) modalBackdrop.classList.remove('active');
});
modalConfirm.addEventListener('click', () => window.location.href = 'index.html');
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    modalBackdrop.classList.remove('active');
    joinBackdrop.classList.remove('active');
  }
});