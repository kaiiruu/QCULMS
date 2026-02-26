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

// Logout confirmation modal
const logoutBtn     = document.getElementById('logout-btn');
const modalBackdrop = document.getElementById('modal-backdrop');
const modalCancel   = document.getElementById('modal-cancel');
const modalConfirm  = document.getElementById('modal-confirm');

logoutBtn.addEventListener('click', () => {
  modalBackdrop.classList.add('active');
});

modalCancel.addEventListener('click', () => {
  modalBackdrop.classList.remove('active');
});

modalBackdrop.addEventListener('click', (e) => {
  if (e.target === modalBackdrop) modalBackdrop.classList.remove('active');
});

modalConfirm.addEventListener('click', () => {
  window.location.href = 'index.html';
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') modalBackdrop.classList.remove('active');
});

// Join Class modal
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

joinCancel.addEventListener('click', () => {
  joinBackdrop.classList.remove('active');
});

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

// Tab switching
function setTab(el, tab) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  renderCards(tab);
}

// Class data
const recent = [
  { subject: 'CS 301',   title: 'Data Structures & Algorithms',  teacher: 'Dr. Santos',     init: 'S', color: '#8B0000', badge: 'Active',   badgeColor: '#fff3f3', badgeText: '#8B0000' },
  { subject: 'IT 201',   title: 'Web Systems & Technologies',     teacher: 'Prof. Garcia',   init: 'G', color: '#C9A84C', badge: 'Due Soon', badgeColor: '#fffbea', badgeText: '#8a6800' },
  { subject: 'CS 401',   title: 'Software Engineering',           teacher: 'Dr. Reyes',      init: 'R', color: '#2d6a4f', badge: 'Active',   badgeColor: '#f0faf4', badgeText: '#2d6a4f' },
  { subject: 'MATH 301', title: 'Discrete Mathematics',           teacher: 'Prof. Cruz',     init: 'C', color: '#1d4e89', badge: 'Active',   badgeColor: '#eef4ff', badgeText: '#1d4e89' },
  { subject: 'IT 301',   title: 'Database Management Systems',    teacher: 'Dr. Lim',        init: 'L', color: '#6d2077', badge: 'Active',   badgeColor: '#faf0ff', badgeText: '#6d2077' },
  { subject: 'CS 302',   title: 'Operating Systems',              teacher: 'Prof. Dela Cruz', init: 'D', color: '#b5451b', badge: 'New',     badgeColor: '#fff8f5', badgeText: '#b5451b' },
  { subject: 'IT 101',   title: 'Introduction to Computing',      teacher: 'Dr. Tan',        init: 'T', color: '#0d6986', badge: 'Active',   badgeColor: '#edfaff', badgeText: '#0d6986' },
  { subject: 'GE 301',   title: 'Purposive Communication',        teacher: 'Prof. Aquino',   init: 'A', color: '#555555', badge: 'Active',   badgeColor: '#f5f5f5', badgeText: '#555555' },
];

const favorite = recent.filter((_, i) => [0, 2, 3].includes(i));

// Render class cards
function renderCards(tab = 'recent') {
  const data = tab === 'recent' ? recent : favorite;
  const grid = document.getElementById('cards-grid');
  grid.innerHTML = data.map((c, i) => `
    <div class="class-card" style="animation-delay:${i * 0.06}s">
      <div class="card-color-band" style="background:${c.color}"></div>
      <div class="card-body">
        <div class="card-subject">${c.subject}</div>
        <div class="card-title">${c.title}</div>
        <div class="card-footer">
          <div class="card-teacher">
            <div class="teacher-dot" style="background:${c.color}">${c.init}</div>
            ${c.teacher}
          </div>
          <span class="card-badge" style="background:${c.badgeColor};color:${c.badgeText}">${c.badge}</span>
        </div>
      </div>
    </div>
  `).join('');
}

// Initialize
renderCards('recent');