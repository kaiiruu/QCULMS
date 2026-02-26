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
  document.getElementById('quiz-datetime').textContent = str;
}
updateClock();
setInterval(updateClock, 1000);

// ── CLASS COMMENTS ──
const commentInput = document.getElementById('class-comment');
const sendComment  = document.getElementById('send-comment');
const commentList  = document.getElementById('comment-list');

function postComment() {
  const text = commentInput.value.trim();
  if (!text) return;
  const item = document.createElement('div');
  item.className = 'comment-item';
  item.innerHTML = `
    <div class="comment-avatar">J</div>
    <div class="comment-bubble">
      <div class="c-name">Jheriemy Araullo</div>
      ${text}
    </div>`;
  commentList.appendChild(item);
  commentInput.value = '';
  item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
sendComment.addEventListener('click', postComment);
commentInput.addEventListener('keydown', e => { if (e.key === 'Enter') postComment(); });

// ── PRIVATE COMMENTS ──
const privateTrigger = document.getElementById('private-comment-trigger');
const privateWrap    = document.getElementById('private-input-wrap');
const privateInput   = document.getElementById('private-comment');
const sendPrivate    = document.getElementById('send-private');

privateTrigger.addEventListener('click', () => {
  privateWrap.style.display = 'flex';
  privateTrigger.style.display = 'none';
  privateInput.focus();
});
sendPrivate.addEventListener('click', () => {
  if (!privateInput.value.trim()) return;
  privateInput.value = '';
  privateWrap.style.display = 'none';
  privateTrigger.style.display = 'block';
  privateTrigger.textContent = "✓ Comment sent to Professor's Name";
  privateTrigger.style.color = '#2d6a4f';
});

// ── FILE UPLOAD ──
function handleFileUpload(input) {
  const fileList = document.getElementById('file-list');
  Array.from(input.files).forEach(file => {
    const item = document.createElement('div');
    item.className = 'file-item';
    item.style.cssText = 'display:flex;align-items:center;justify-content:space-between;background:#fdf5e6;border-radius:8px;padding:7px 12px;font-size:13px;margin-bottom:6px;';
    item.innerHTML = `
      <span>&#128196; ${file.name}</span>
      <button onclick="this.parentElement.remove()" style="background:none;border:none;cursor:pointer;color:#888;font-size:16px;padding:0 2px;" title="Remove">&#10005;</button>
    `;
    fileList.appendChild(item);
  });
  input.value = '';
}

// ── MARK AS DONE ──
const btnMark    = document.querySelector('.btn-mark-done');
const workStatus = document.querySelector('.work-status');
let done = false;
btnMark.addEventListener('click', () => {
  done = !done;
  if (done) {
    btnMark.textContent = 'Marked as done ✓';
    btnMark.style.background = '#2d6a4f';
    workStatus.textContent = 'Done';
    workStatus.className = 'work-status done';
  } else {
    btnMark.textContent = 'Mark as done';
    btnMark.style.background = '';
    workStatus.textContent = 'Assigned';
    workStatus.className = 'work-status assigned';
  }
});

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