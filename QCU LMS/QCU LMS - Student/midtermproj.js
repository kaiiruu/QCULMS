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

function postPrivateComment() {
  const text = privateInput.value.trim();
  if (!text) return;
  const list = document.getElementById('private-list');
  const item = document.createElement('div');
  item.className = 'private-comment-item';
  item.innerHTML = `
    <div class="private-comment-avatar">J</div>
    <div class="private-comment-bubble">
      <div class="pc-name">Jheriemy Araullo</div>
      ${text}
    </div>`;
  list.appendChild(item);
  privateInput.value = '';
  privateWrap.style.display = 'none';
  privateTrigger.style.display = 'block';
  privateTrigger.textContent = "Add comment to Professor's Name";
  item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

sendPrivate.addEventListener('click', postPrivateComment);
privateInput.addEventListener('keydown', e => { if (e.key === 'Enter') postPrivateComment(); });

// ── ADD OR CREATE DROPDOWN ──
const btnAddCreate      = document.getElementById('btn-add-create');
const addCreateDropdown = document.getElementById('add-create-dropdown');
const optFile           = document.getElementById('opt-file');
const optLink           = document.getElementById('opt-link');

btnAddCreate.addEventListener('click', (e) => {
  e.stopPropagation();
  addCreateDropdown.classList.toggle('open');
  hideLinkRow();
});

// Option: Attach file
optFile.addEventListener('click', () => {
  addCreateDropdown.classList.remove('open');
  document.getElementById('file-upload').click();
});

// Option: Add link — show inline input row in file-list
let linkRowEl = null;
optLink.addEventListener('click', () => {
  addCreateDropdown.classList.remove('open');
  showLinkRow();
});

function showLinkRow() {
  if (linkRowEl) return;
  const fileList = document.getElementById('file-list');
  linkRowEl = document.createElement('div');
  linkRowEl.style.cssText = 'display:flex;align-items:center;gap:6px;margin-bottom:8px;animation:fadeUp 0.18s ease;';
  linkRowEl.innerHTML = `
    <input id="inline-link-input" type="url" placeholder="Paste link here..."
      style="flex:1;padding:7px 10px;border:1px solid #e0d8cc;border-radius:8px;font-size:12px;font-family:DM Sans,sans-serif;outline:none;background:#faf8f5;color:#1a1a1a;min-width:0;">
    <button id="inline-link-add"
      style="background:#8B0000;color:#fff;border:none;border-radius:7px;padding:7px 12px;font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap;font-family:DM Sans,sans-serif;">Add</button>
    <button id="inline-link-cancel"
      style="background:none;border:none;cursor:pointer;color:#888;font-size:18px;padding:2px 4px;" title="Cancel">&#10005;</button>
  `;
  fileList.prepend(linkRowEl);
  const input = document.getElementById('inline-link-input');
  input.focus();
  input.style.borderColor = '#8B0000';

  document.getElementById('inline-link-add').addEventListener('click', confirmLinkRow);
  document.getElementById('inline-link-cancel').addEventListener('click', hideLinkRow);
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') confirmLinkRow();
    if (e.key === 'Escape') hideLinkRow();
  });
}

function confirmLinkRow() {
  const input = document.getElementById('inline-link-input');
  if (!input) return;
  const url = input.value.trim();
  if (!url) { input.focus(); return; }
  const label = url.replace(/^https?:\/\//, '').split('/')[0];
  hideLinkRow();
  const fileList = document.getElementById('file-list');
  const item = document.createElement('div');
  item.style.cssText = 'display:flex;align-items:center;justify-content:space-between;background:#fdf5e6;border-radius:8px;padding:7px 12px;font-size:13px;margin-bottom:6px;';
  item.innerHTML = `
    <a href="${url}" target="_blank" style="color:#8B0000;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:160px;text-decoration:underline;">&#128279; ${label}</a>
    <button onclick="removeFile(this)" style="background:none;border:none;cursor:pointer;color:#888;font-size:16px;padding:0 2px;" title="Remove">&#10005;</button>
  `;
  fileList.appendChild(item);
  updateSubmitBtn();
}

function hideLinkRow() {
  if (linkRowEl) { linkRowEl.remove(); linkRowEl = null; }
}

// Close dropdown on outside click
document.addEventListener('click', e => {
  if (!btnAddCreate.contains(e.target) && !addCreateDropdown.contains(e.target)) {
    addCreateDropdown.classList.remove('open');
  }
});

// ── FILE UPLOAD ──
function handleFileUpload(input) {
  const fileList = document.getElementById('file-list');
  Array.from(input.files).forEach(file => {
    const item = document.createElement('div');
    item.style.cssText = 'display:flex;align-items:center;justify-content:space-between;background:#fdf5e6;border-radius:8px;padding:7px 12px;font-size:13px;margin-bottom:6px;';
    item.innerHTML = `
      <span>&#128196; ${file.name}</span>
      <button onclick="removeFile(this)" style="background:none;border:none;cursor:pointer;color:#888;font-size:16px;padding:0 2px;" title="Remove">&#10005;</button>
    `;
    fileList.appendChild(item);
  });
  input.value = '';
  updateSubmitBtn();
}

function removeFile(btn) {
  btn.parentElement.remove();
  updateSubmitBtn();
}

function updateSubmitBtn() {
  const submitBtn = document.getElementById('btn-submit-work');
  const hasFiles = document.getElementById('file-list').children.length > 0;
  if (submitBtn) submitBtn.style.display = hasFiles ? 'block' : 'none';
}

// ── SUBMIT WORK ──
const btnSubmitWork = document.getElementById('btn-submit-work');
if (btnSubmitWork) {
  btnSubmitWork.addEventListener('click', function() {
    this.textContent = 'Submitted ✓';
    this.disabled = true;
    this.style.background = '#2d6a4f';
    this.style.boxShadow = 'none';
    workStatus.textContent = 'Turned in';
    workStatus.className = 'work-status done';
  });
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
    if (typeof linkBackdrop !== 'undefined') linkBackdrop.classList.remove('active');
    if (typeof addCreateDropdown !== 'undefined') addCreateDropdown.classList.remove('open');
  }
});