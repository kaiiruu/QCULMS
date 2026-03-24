// Live clock
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

// ── SELECT CLASS ──
function selectClass(name, el) {
  document.querySelectorAll('.class-list-item').forEach(i => i.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('banner-title').textContent = `Welcome to ${name}!`;
  // Reset to Course tab on class switch
  document.querySelectorAll('.class-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  document.querySelector('.class-tab').classList.add('active');
  document.getElementById('tab-course').classList.add('active');
}

// ── COURSE/PEOPLE TABS ──
function setClassTab(el, tab) {
  document.querySelectorAll('.class-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('tab-' + tab).classList.add('active');
}

// ── CREATE CLASS MODAL ──
const addClassBtn      = document.getElementById('add-class-btn');
const createBackdrop   = document.getElementById('create-backdrop');
const createCancel     = document.getElementById('create-cancel');
const createConfirm    = document.getElementById('create-confirm');

const classNameInput   = document.getElementById('class-name');
const sectionInput     = document.getElementById('class-section');
const subjectInput     = document.getElementById('class-subject');
const roomInput        = document.getElementById('class-room');

addClassBtn.addEventListener('click', () => {
  classNameInput.value = '';
  sectionInput.value = '';
  subjectInput.value = '';
  roomInput.value = '';
  createBackdrop.classList.add('active');
  setTimeout(() => classNameInput.focus(), 100);
});

createCancel.addEventListener('click', () => {
  createBackdrop.classList.remove('active');
});

createBackdrop.addEventListener('click', e => {
  if (e.target === createBackdrop)
    createBackdrop.classList.remove('active');
});

createConfirm.addEventListener('click', () => {
  const name    = classNameInput.value.trim();
  const section = sectionInput.value.trim();
  const subject = subjectInput.value.trim();
  const room    = roomInput.value.trim();

  if (!name || !section || !subject || !room) {
    alert("Please fill in all fields.");
    return;
  }

  // Create new class item dynamically
  const classList = document.querySelector('.class-list');
  const newClass = document.createElement('div');
  newClass.className = 'class-list-item';
  newClass.textContent = name;

  newClass.onclick = function() {
    selectClass(name, this);
  };

  classList.appendChild(newClass);

  alert(`Class Created:
Name: ${name}
Section: ${section}
Subject: ${subject}
Room: ${room}`);

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
modalConfirm.addEventListener('click', () => window.location.href = 'QCULMS-Student/index.html');
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    modalBackdrop.classList.remove('active');
    joinBackdrop.classList.remove('active');
  }
});
