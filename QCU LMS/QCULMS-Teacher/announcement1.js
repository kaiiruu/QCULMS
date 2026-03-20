// Live clock
function updateClock() {
  const now = new Date();
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  document.getElementById('datetime').textContent =
    `${days[now.getDay()]} · ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()} · ${now.toLocaleTimeString()}`;
}
updateClock();
setInterval(updateClock, 1000);

// Update time-ago labels live
function updateTimeAgo() {
  document.querySelectorAll('.time-ago').forEach(el => {
    const mins = parseInt(el.dataset.minutes, 10);
    if (mins < 60) el.textContent = `${mins}m`;
    else if (mins < 1440) el.textContent = `${Math.floor(mins / 60)}h`;
    else el.textContent = `${Math.floor(mins / 1440)}d`;
  });
}
updateTimeAgo();
// Create modal
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

// Logout modal
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
  if (e.key === 'Escape') modalBackdrop.classList.remove('active');
});