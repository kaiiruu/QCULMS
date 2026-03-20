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
  ['field-year',        'input-year'],
];

function enterEditMode() {
  fields.forEach(([boxId, inputId]) => {
    const box   = document.getElementById(boxId);
    const input = document.getElementById(inputId);
    input.value = box.textContent.trim();
    box.style.display   = 'none';
    input.style.display = 'flex';
  });
  editActions.style.display = 'flex';
  editBtn.classList.add('active');
  editBtn.title = 'Editing…';
}

function exitEditMode(save) {
  fields.forEach(([boxId, inputId]) => {
    const box   = document.getElementById(boxId);
    const input = document.getElementById(inputId);
    if (save) box.textContent = input.value.trim() || box.textContent;
    box.style.display   = 'flex';
    input.style.display = 'none';
  });
  editActions.style.display = 'none';
  editBtn.classList.remove('active');
  editBtn.title = 'Edit profile';
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
// ── PASSWORD SECTION ──
const passwordToggleBtn = document.getElementById('password-toggle-btn');
const passwordDisplay   = document.getElementById('password-display');
const passwordForm      = document.getElementById('password-form');
const pwCancel          = document.getElementById('pw-cancel');
const pwSave            = document.getElementById('pw-save');
const pwCurrent         = document.getElementById('pw-current');
const pwNew             = document.getElementById('pw-new');
const pwConfirm         = document.getElementById('pw-confirm');
const pwStrength        = document.getElementById('pw-strength');
const pwMatchMsg        = document.getElementById('pw-match-msg');
const pwToast           = document.getElementById('pw-toast');

// Toggle form
passwordToggleBtn.addEventListener('click', () => {
  const isOpen = passwordForm.style.display !== 'none';
  if (isOpen) {
    closePasswordForm();
  } else {
    openPasswordForm();
  }
});

function openPasswordForm() {
  passwordDisplay.style.display = 'none';
  passwordForm.style.display    = 'block';
  passwordToggleBtn.classList.add('active');
  pwCurrent.value = '';
  pwNew.value     = '';
  pwConfirm.value = '';
  pwStrength.textContent  = '';
  pwStrength.className    = 'pw-strength';
  pwMatchMsg.textContent  = '';
  pwMatchMsg.className    = 'pw-match-msg';
  setTimeout(() => pwCurrent.focus(), 50);
}

function closePasswordForm() {
  passwordDisplay.style.display = 'block';
  passwordForm.style.display    = 'none';
  passwordToggleBtn.classList.remove('active');
}

pwCancel.addEventListener('click', closePasswordForm);

// Password strength checker
pwNew.addEventListener('input', () => {
  const val = pwNew.value;
  if (!val) { pwStrength.textContent = ''; pwStrength.className = 'pw-strength'; return; }
  const strong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/.test(val);
  const fair   = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(val);
  if (strong) {
    pwStrength.textContent = '● Strong';
    pwStrength.className   = 'pw-strength strong';
  } else if (fair) {
    pwStrength.textContent = '● Fair';
    pwStrength.className   = 'pw-strength fair';
  } else {
    pwStrength.textContent = '● Weak — add numbers, symbols & uppercase';
    pwStrength.className   = 'pw-strength weak';
  }
  checkMatch();
});

// Confirm match checker
pwConfirm.addEventListener('input', checkMatch);
function checkMatch() {
  if (!pwConfirm.value) { pwMatchMsg.textContent = ''; pwMatchMsg.className = 'pw-match-msg'; return; }
  if (pwNew.value === pwConfirm.value) {
    pwMatchMsg.textContent = '✓ Passwords match';
    pwMatchMsg.className   = 'pw-match-msg match';
  } else {
    pwMatchMsg.textContent = '✗ Passwords do not match';
    pwMatchMsg.className   = 'pw-match-msg no-match';
  }
}

// Show/hide password toggle (eye buttons)
document.querySelectorAll('.pw-eye').forEach(btn => {
  btn.addEventListener('click', () => {
    const input = document.getElementById(btn.dataset.target);
    if (input.type === 'password') {
      input.type  = 'text';
      btn.textContent = '🙈';
    } else {
      input.type  = 'password';
      btn.textContent = '👁';
    }
  });
});

// Save password
pwSave.addEventListener('click', () => {
  if (!pwCurrent.value) { pwCurrent.focus(); pwCurrent.style.borderColor = '#c0392b'; return; }
  if (!pwNew.value)     { pwNew.focus();     pwNew.style.borderColor     = '#c0392b'; return; }
  if (pwNew.value !== pwConfirm.value) {
    pwConfirm.focus(); pwConfirm.style.borderColor = '#c0392b'; return;
  }
  // Success
  closePasswordForm();
  // Show toast
  pwToast.classList.add('show');
  setTimeout(() => pwToast.classList.remove('show'), 3000);
});

// Reset red borders on input
[pwCurrent, pwNew, pwConfirm].forEach(inp => {
  inp.addEventListener('input', () => inp.style.borderColor = '');
});