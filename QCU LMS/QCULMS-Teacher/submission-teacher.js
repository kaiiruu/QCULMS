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

// ── SUBMISSIONS DATA ──
// Each item has: name, link (detail page)
const submissionsData = {
  Activity: [
    { name: 'Activity # 1', link: 'activity1-submission.html' },
  ],
  Assignment: [
    { name: 'Assignment # 1', link: 'assignment1-submission.html' },
  ],
  Quiz: [
    { name: 'Quiz No. 1', link: 'quiz1-submission.html' },
  ],
  Examination: [
    { name: 'Midterm Examination', link: 'exam1-submission.html' },
  ],
  Project: [
    { name: 'Midterm Project', link: 'proj1-submission.html' },
  ],
};

// ── RENDER LIST ──
let currentFilter = 'Activity';

function getMeta() {
  const now = new Date();
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const hours = now.getHours();
  const mins = String(now.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const h = hours % 12 || 12;
  return `<strong>${days[now.getDay()]}</strong>&nbsp;&nbsp;${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()} | ${h}:${mins} ${ampm}`;
}

function renderList(filter) {
  const list   = document.getElementById('submission-list');
  const empty  = document.getElementById('empty-state');
  const items  = submissionsData[filter] || [];
  const label  = document.querySelector('.topbar-center .label');

  document.getElementById('page-title').textContent = `Submissions (${filter})`;
  if (label) label.textContent = `Classes (${filter})`;

  if (items.length === 0) {
    list.innerHTML = '';
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';

  list.innerHTML = items.map((item, i) => `
    <div class="sub-row" onclick="window.location.href='${item.link}'" style="cursor:pointer;">
      <div class="sub-icon">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
        </svg>
      </div>
      <div class="sub-info">
        <div class="sub-name">${item.name}</div>
        <div class="sub-meta" id="meta-${filter}-${i}">${getMeta()}</div>
      </div>
      <div class="sub-due">NO DUE DATE</div>
      <button class="sub-more" onclick="event.stopPropagation()">&#8943;</button>
    </div>
  `).join('');
}

renderList(currentFilter);

// Check URL param for filter on load (e.g. from activity1-submission filter redirect)
const urlParams = new URLSearchParams(window.location.search);
const paramFilter = urlParams.get('filter');
if (paramFilter && submissionsData[paramFilter]) {
  currentFilter = paramFilter;
  document.querySelectorAll('.filter-option').forEach(o => {
    o.classList.toggle('active', o.dataset.value === paramFilter);
  });
  document.getElementById('filter-label').textContent = paramFilter;
  renderList(currentFilter);
}

// Update meta times every second
setInterval(() => {
  const items = submissionsData[currentFilter] || [];
  items.forEach((_, i) => {
    const el = document.getElementById(`meta-${currentFilter}-${i}`);
    if (el) el.innerHTML = getMeta();
  });
}, 1000);

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
    currentFilter = opt.dataset.value;
    filterLabel.textContent = opt.dataset.value;
    filterBtn.classList.remove('open');
    filterDropdown.classList.remove('open');
    renderList(currentFilter);
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
modalConfirm.addEventListener('click', () => window.location.href = 'index.html');
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    modalBackdrop.classList.remove('active');
    createBackdrop.classList.remove('active');
    filterBtn.classList.remove('open');
    filterDropdown.classList.remove('open');
  }
});