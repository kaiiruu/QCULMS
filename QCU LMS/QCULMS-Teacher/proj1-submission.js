// ── LIVE CLOCK ──
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

// ── ACTIVITY META ──
function updateMeta() {
  const now = new Date();
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const hours = now.getHours();
  const mins = String(now.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const h = hours % 12 || 12;
  const el = document.getElementById('proj1-submission-meta');
  if (el) el.innerHTML =
    `<strong>${days[now.getDay()]}</strong>&nbsp;&nbsp;${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()} | ${h}:${mins} ${ampm}`;

  // Also update panel meta if open
  const pm = document.getElementById('panel-meta');
  if (pm) pm.innerHTML =
    `<strong>${days[now.getDay()]}</strong>&nbsp;&nbsp;${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()} | ${h}:${mins} ${ampm}`;
}
updateMeta();
setInterval(updateMeta, 1000);

// ── STUDENT DATA ──
const students = [
  { name: 'Jheriemy Araullo',      day: 'Saturday', date: 'Feb 22, 2026', time: '6:45 AM' },
  { name: 'Kurt Jomari Francisco', day: 'Saturday', date: 'Feb 22, 2026', time: '6:52 AM' },
  { name: 'John Wick',             day: 'Friday',   date: 'Feb 21, 2026', time: '11:30 PM' },
  { name: 'Student Name',          day: 'Saturday', date: 'Feb 22, 2026', time: '7:00 AM' },
];

// Render submitted times in main list
students.forEach((s, i) => {
  const el = document.getElementById(`st-time-${i}`);
  if (el) el.innerHTML = `<strong>${s.day}</strong>&nbsp;&nbsp;${s.date} | ${s.time} Submitted`;
});

// ── STUDENT PANEL ──
const panelOverlay    = document.getElementById('panel-overlay');
const studentPanel    = document.getElementById('student-panel');
const panelClose      = document.getElementById('panel-close');
const panelStudentName = document.getElementById('panel-student-name');
const panelSubmittedTime = document.getElementById('panel-submitted-time');
const panelPrivateTrigger = document.getElementById('panel-private-trigger');
const panelPrivateWrap = document.getElementById('panel-private-wrap');
const panelPrivateInput = document.getElementById('panel-private-input');
const panelSendPrivate = document.getElementById('panel-send-private');

function openPanel(student) {
  panelStudentName.textContent = student.name;
  panelSubmittedTime.innerHTML =
    `<strong>${student.day}</strong>&nbsp;&nbsp;${student.date} | ${student.time} Submitted`;
  // Reset private comment
  panelPrivateWrap.style.display = 'none';
  panelPrivateTrigger.style.display = 'block';
  panelPrivateTrigger.textContent = `Add comment to ${student.name}`;
  panelPrivateTrigger.style.color = '';
  panelPrivateInput.value = '';
  // Show panel
  panelOverlay.classList.add('active');
  // Re-animate panel
  studentPanel.style.animation = 'none';
  requestAnimationFrame(() => {
    studentPanel.style.animation = '';
  });
}

function closePanel() {
  panelOverlay.classList.remove('active');
}

// Wire student rows
document.querySelectorAll('.student-row').forEach((row, i) => {
  row.style.cursor = 'pointer';
  row.addEventListener('click', () => openPanel(students[i]));
});

panelClose.addEventListener('click', closePanel);

// Close when clicking outside panel
panelOverlay.addEventListener('click', e => {
  if (!studentPanel.contains(e.target)) closePanel();
});

// Private comment in panel
panelPrivateTrigger.addEventListener('click', () => {
  panelPrivateWrap.style.display = 'flex';
  panelPrivateTrigger.style.display = 'none';
  panelPrivateInput.focus();
});
panelSendPrivate.addEventListener('click', () => {
  if (!panelPrivateInput.value.trim()) return;
  panelPrivateInput.value = '';
  panelPrivateWrap.style.display = 'none';
  panelPrivateTrigger.style.display = 'block';
  panelPrivateTrigger.textContent = '✓ Comment sent';
  panelPrivateTrigger.style.color = '#2d6a4f';
});
panelPrivateInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') panelSendPrivate.click();
  if (e.key === 'Escape') closePanel();
});

// ── FILTER DROPDOWN ──
const filterBtn      = document.getElementById('filter-btn');
const filterDropdown = document.getElementById('filter-dropdown');
const filterLabel    = document.getElementById('filter-label');
const filterOptions  = document.querySelectorAll('.filter-option');

filterBtn.addEventListener('click', () => {
  filterBtn.classList.toggle('open');
  filterDropdown.classList.toggle('open');
});
filterOptions.forEach(opt => {
  opt.addEventListener('click', () => {
    filterOptions.forEach(o => o.classList.remove('active'));
    opt.classList.add('active');
    filterLabel.textContent = opt.dataset.value;
    filterBtn.classList.remove('open');
    filterDropdown.classList.remove('open');
    window.location.href = `submission-teacher.html?filter=${opt.dataset.value}`;
  });
});
document.addEventListener('click', e => {
  if (!filterBtn.contains(e.target) && !filterDropdown.contains(e.target)) {
    filterBtn.classList.remove('open');
    filterDropdown.classList.remove('open');
  }
});

// ── CREATE CLASS MODAL ──
const addClassBtn    = document.getElementById('add-class-btn');
const createBackdrop = document.getElementById('create-backdrop');
const createCancel   = document.getElementById('create-cancel');
const createConfirm  = document.getElementById('create-confirm');

addClassBtn.addEventListener('click', () => createBackdrop.classList.add('active'));
createCancel.addEventListener('click', () => createBackdrop.classList.remove('active'));
createBackdrop.addEventListener('click', e => {
  if (e.target === createBackdrop) createBackdrop.classList.remove('active');
});
createConfirm.addEventListener('click', () => {
  const name = document.getElementById('class-name').value.trim();
  if (!name) { document.getElementById('class-name').focus(); return; }
  alert(`Class "${name}" created!`);
  createBackdrop.classList.remove('active');
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
modalConfirm.addEventListener('click', () => window.location.href = '../QCULMS-Student/index.html');

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closePanel();
    modalBackdrop.classList.remove('active');
    createBackdrop.classList.remove('active');
    filterBtn.classList.remove('open');
    filterDropdown.classList.remove('open');
  }
});