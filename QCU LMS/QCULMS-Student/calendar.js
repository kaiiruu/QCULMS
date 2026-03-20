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

// ── EVENTS DATA ──
const events = [
  { date: new Date(2026, 1, 21), label: 'Quiz 1',         type: 'quiz',       time: '10:00 AM',  detail: 'CC101 — Arrays & Linked Lists' },
  { date: new Date(2026, 1, 24), label: 'Assignment 2',   type: 'assignment', time: '11:59 PM',  detail: 'CC101 — Stack Implementation' },
  { date: new Date(2026, 1, 26), label: 'Activity 3',     type: 'activity',   time: '1:00 PM',   detail: 'CC101 — Recursion Exercises' },
  { date: new Date(2026, 2,  3), label: 'Midterm Exam',   type: 'exam',       time: '8:00 AM',   detail: 'CC101 — Chapters 1–4' },
  { date: new Date(2026, 2,  10), label: 'Project Draft', type: 'project',    time: '11:59 PM',  detail: 'CC101 — Group Project Phase 1' },
  { date: new Date(2026, 2,  17), label: 'Quiz 2',        type: 'quiz',       time: '10:00 AM',  detail: 'CC101 — Trees & Graphs' },
  { date: new Date(2026, 2,  24), label: 'Assignment 3',  type: 'assignment', time: '11:59 PM',  detail: 'CC101 — Graph Traversal' },
  { date: new Date(2026, 3,  5), label: 'Final Exam',     type: 'exam',       time: '8:00 AM',   detail: 'CC101 — All Topics' },
];

// ── CALENDAR STATE ──
const today = new Date();
let viewYear  = today.getFullYear();
let viewMonth = today.getMonth();

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const SHORT_MON   = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function sameDay(a, b) {
  return a.getFullYear() === b.getFullYear() &&
         a.getMonth()    === b.getMonth()    &&
         a.getDate()     === b.getDate();
}

function getEventsOn(date) {
  return events.filter(e => sameDay(e.date, date));
}

// ── RENDER CALENDAR ──
function renderCalendar() {
  document.getElementById('month-label').textContent = `${MONTH_NAMES[viewMonth]} ${viewYear}`;

  const grid = document.querySelector('.cal-grid');
  // Remove old day cells (keep 7 headers)
  const cells = grid.querySelectorAll('.day-cell');
  cells.forEach(c => c.remove());

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrev  = new Date(viewYear, viewMonth, 0).getDate();

  // Prev month filler
  for (let i = firstDay - 1; i >= 0; i--) {
    const d = new Date(viewYear, viewMonth - 1, daysInPrev - i);
    grid.appendChild(makeCell(d, true));
  }
  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(viewYear, viewMonth, d);
    grid.appendChild(makeCell(date, false));
  }
  // Next month filler
  const total = firstDay + daysInMonth;
  const remaining = total % 7 === 0 ? 0 : 7 - (total % 7);
  for (let d = 1; d <= remaining; d++) {
    const date = new Date(viewYear, viewMonth + 1, d);
    grid.appendChild(makeCell(date, true));
  }

  renderUpcoming();
}

function makeCell(date, otherMonth) {
  const cell = document.createElement('div');
  cell.className = 'day-cell' + (otherMonth ? ' other-month' : '');

  const isToday = sameDay(date, today);
  if (isToday) cell.classList.add('today');

  const evs = getEventsOn(date);
  if (evs.length) cell.classList.add('has-event');

  const numEl = document.createElement('div');
  numEl.className = 'day-num';
  numEl.textContent = date.getDate();
  cell.appendChild(numEl);

  evs.slice(0, 2).forEach(ev => {
    const dot = document.createElement('span');
    dot.className = `event-dot ${ev.type}`;
    dot.textContent = ev.label;
    cell.appendChild(dot);
  });

  return cell;
}

// ── UPCOMING EVENTS ──
function renderUpcoming() {
  const list = document.getElementById('events-list');
  list.innerHTML = '';
  const upcoming = events
    .filter(e => e.date >= new Date(today.getFullYear(), today.getMonth(), today.getDate()))
    .sort((a, b) => a.date - b.date)
    .slice(0, 5);

  if (!upcoming.length) {
    list.innerHTML = '<p style="color:var(--text-muted);font-size:14px;">No upcoming events.</p>';
    return;
  }

  upcoming.forEach((ev, i) => {
    const row = document.createElement('div');
    row.className = 'event-row';
    row.style.animationDelay = `${i * 0.07}s`;
    row.innerHTML = `
      <div class="event-date-block">
        <div class="e-day">${ev.date.getDate()}</div>
        <div class="e-mon">${SHORT_MON[ev.date.getMonth()]}</div>
      </div>
      <div class="event-info">
        <div class="event-name">${ev.label}</div>
        <div class="event-meta">${ev.detail} &nbsp;·&nbsp; ${ev.time}</div>
      </div>
      <span class="event-tag ${ev.type}">${ev.type.charAt(0).toUpperCase() + ev.type.slice(1)}</span>
    `;
    list.appendChild(row);
  });
}

// ── NAV ──
document.getElementById('prev-month').addEventListener('click', () => {
  viewMonth--;
  if (viewMonth < 0) { viewMonth = 11; viewYear--; }
  renderCalendar();
});
document.getElementById('next-month').addEventListener('click', () => {
  viewMonth++;
  if (viewMonth > 11) { viewMonth = 0; viewYear++; }
  renderCalendar();
});

// Init
renderCalendar();

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