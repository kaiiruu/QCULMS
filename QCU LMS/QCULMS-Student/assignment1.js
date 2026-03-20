// ── CLOCK ──
function updateClock() {
  const now = new Date();
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const h = now.getHours() % 12 || 12;
  const m = String(now.getMinutes()).padStart(2,'0');
  const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
  const str = `${days[now.getDay()].slice(0,3)}  ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()} | ${h}:${m} ${ampm}`;
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
const privateList    = document.getElementById('private-comment-list');

privateTrigger.addEventListener('click', () => {
  privateWrap.style.display = 'flex';
  privateInput.focus();
});

function postPrivate() {
  const text = privateInput.value.trim();
  if (!text) return;
  const now = new Date();
  const h = now.getHours() % 12 || 12;
  const m = String(now.getMinutes()).padStart(2,'0');
  const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
  const timeStr = `${h}:${m} ${ampm}`;

  const msg = document.createElement('div');
  msg.className = 'private-msg';
  msg.innerHTML = `<div class="p-name">Jheriemy Araullo</div>${text}<div class="p-time">${timeStr}</div>`;
  privateList.appendChild(msg);
  privateInput.value = '';
  msg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

sendPrivate.addEventListener('click', postPrivate);
privateInput.addEventListener('keydown', e => { if (e.key === 'Enter') postPrivate(); });


// ── ADD OR CREATE ──
const btnAddCreate   = document.getElementById('btn-add-create');
const addCreateMenu  = document.getElementById('add-create-menu');
const fileUpload     = document.getElementById('file-upload');
const menuFile       = document.getElementById('menu-file');
const menuLink       = document.getElementById('menu-link');
const attachedFiles  = document.getElementById('attached-files');
const linkInputWrap  = document.getElementById('link-input-wrap');
const linkInput      = document.getElementById('link-input');
const btnAddLink     = document.getElementById('btn-add-link');

btnAddCreate.addEventListener('click', (e) => {
  e.stopPropagation();
  const isOpen = addCreateMenu.style.display !== 'none';
  addCreateMenu.style.display = isOpen ? 'none' : 'block';
});

document.addEventListener('click', (e) => {
  if (!document.getElementById('add-create-wrap').contains(e.target)) {
    addCreateMenu.style.display = 'none';
  }
});

fileUpload.addEventListener('change', () => {
  Array.from(fileUpload.files).forEach(file => addAttachment(file.name, 'file'));
  fileUpload.value = '';
  addCreateMenu.style.display = 'none';
});

menuLink.addEventListener('click', () => {
  addCreateMenu.style.display = 'none';
  linkInputWrap.style.display = 'flex';
  linkInput.focus();
});

btnAddLink.addEventListener('click', () => {
  const url = linkInput.value.trim();
  if (!url) return;
  addAttachment(url, 'link');
  linkInput.value = '';
  linkInputWrap.style.display = 'none';
});

linkInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') btnAddLink.click();
  if (e.key === 'Escape') linkInputWrap.style.display = 'none';
});

function addAttachment(name, type) {
  const item = document.createElement('div');
  item.className = 'attached-item';
  const icon = type === 'file'
    ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>`
    : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`;
  item.innerHTML = `${icon}<span class="file-name">${name}</span><button class="remove-file" title="Remove">&times;</button>`;
  item.querySelector('.remove-file').addEventListener('click', () => item.remove());
  attachedFiles.appendChild(item);
}

// ── MARK AS DONE ──
const btnMark = document.querySelector('.btn-mark-done');
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

// ── SUBMIT ASSIGNMENT ──
const btnSubmit = document.querySelector('.btn-submit-assign');
if (btnSubmit) {
  btnSubmit.addEventListener('click', () => {
    if (confirm('Submit Assignment #1?')) {
      btnSubmit.textContent = 'Submitted ✓';
      btnSubmit.style.background = '#2d6a4f';
      btnSubmit.disabled = true;
      workStatus.textContent = 'Turned in';
      workStatus.className = 'work-status done';
    }
  });
}

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