

// ── JOIN CLASS MODAL ──
const addClassBtn = document.getElementById("add-class-btn");
const createBackdrop = document.getElementById("create-backdrop");
const createCancel = document.getElementById("create-cancel");

if(addClassBtn){

addClassBtn.addEventListener("click", () => {
  createBackdrop.classList.add("active");
});

}

if(createCancel){

createCancel.addEventListener("click", () => {
  createBackdrop.classList.remove("active");
});

}

createBackdrop.addEventListener("click", (e) => {
  if(e.target === createBackdrop){
    createBackdrop.classList.remove("active");
  }
});

// ── LOGOUT MODAL ──
const logoutBtn     = document.getElementById('logout-btn');
const modalBackdrop = document.getElementById('modal-backdrop');
const modalCancel   = document.getElementById('modal-cancel');
const modalConfirm  = document.getElementById('modal-confirm');

logoutBtn.addEventListener('click', () => modalBackdrop.classList.add('active'));
modalCancel.addEventListener('click', () => modalBackdrop.classList.remove('active'));
modalBackdrop.addEventListener('click', e => { if (e.target === modalBackdrop) modalBackdrop.classList.remove('active'); });
modalConfirm.addEventListener('click', () => window.location.href = '../index.html');
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    modalBackdrop.classList.remove('active');
    joinBackdrop.classList.remove('active');
  }
});

const gradeBtn = document.getElementById("change-grade-btn");
const gradeBackdrop = document.getElementById("grade-backdrop");
const gradeCancel = document.getElementById("grade-cancel");
const gradeSave = document.getElementById("grade-save");

if (gradeBtn && gradeBackdrop) {

  gradeBtn.addEventListener("click", () => {
    gradeBackdrop.classList.add("active");
  });

}

if (gradeCancel) {
  gradeCancel.addEventListener("click", () => {
    gradeBackdrop.classList.remove("active");
  });
}

if (gradeSave) {

  gradeSave.addEventListener("click", () => {

    let activity = document.getElementById("grade-activity").value;
    let assignment = document.getElementById("grade-assignment").value;
    let quiz = document.getElementById("grade-quiz").value;
    let exam = document.getElementById("grade-exam").value;
    let project = document.getElementById("grade-project").value;

    document.getElementById("activity-percent").innerText = activity + "%";
    document.getElementById("assignment-percent").innerText = assignment + "%";
    document.getElementById("quiz-percent").innerText = quiz + "%";
    document.getElementById("exam-percent").innerText = exam + "%";
    document.getElementById("project-percent").innerText = project + "%";

    gradeBackdrop.classList.remove("active");

  });

}
