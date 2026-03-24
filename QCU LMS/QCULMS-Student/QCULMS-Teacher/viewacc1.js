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

// ── EDIT MODE TOGGLE ──
const editBtn     = document.getElementById('edit-btn');
const editActions = document.getElementById('edit-actions');
const btnCancel   = document.getElementById('btn-cancel');
const btnSave     = document.getElementById('btn-save');

// All field pairs: [display div id, input id]
const fields = [
  ['field-student-num', 'input-student-num'],
  ['field-user-id',     'input-user-id'],
  ['field-program',     'input-program'],
  ['field-last',        'input-last'],
  ['field-first',       'input-first'],
  ['field-middle',      'input-middle'],
  ['field-password', 'input-current-pass'],
];

function enterEditMode() {
  fields.forEach(([boxId, inputId]) => {
    const box = document.getElementById(boxId);
    const input = document.getElementById(inputId);

    if (!box || !input) return;

    if (boxId !== 'field-password') {
      input.value = box.textContent.trim();
    }

    box.style.display = 'none';
    input.style.display = 'block';
  });

  document.getElementById("input-new-pass").style.display = "block";
  document.getElementById("input-confirm-pass").style.display = "block";
  
  editActions.style.display = 'flex';
  editBtn.classList.add('active');
}

function exitEditMode(save) {
  fields.forEach(([boxId, inputId]) => {
    const box = document.getElementById(boxId);
    const input = document.getElementById(inputId);

    if (!box || !input) return;

    if (save && boxId !== 'field-password') {
      box.textContent = input.value.trim() || box.textContent;
    }

    box.style.display = 'flex';
    input.style.display = 'none';
  });

  document.getElementById("input-new-pass").style.display = "none";
  document.getElementById("input-confirm-pass").style.display = "none";
  
  editActions.style.display = 'none';
  editBtn.classList.remove('active');
}

editBtn.addEventListener('click', () => {
  if (editBtn.classList.contains('active')) {
    exitEditMode(false);
  } else {
    enterEditMode();
  }
});


btnCancel.addEventListener('click', () => exitEditMode(false));
btnSave.addEventListener('click',   () => exitEditMode(true));

// ── PHOTO UPLOAD ──
const photoInput = document.getElementById('photo-input');
const avatarImg  = document.getElementById('avatar-img');
const avatarInitials = document.querySelector('.avatar-initials');

photoInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    avatarImg.src = ev.target.result;
    avatarImg.style.display = 'block';
    avatarInitials.style.display = 'none';
  };
  reader.readAsDataURL(file);
});