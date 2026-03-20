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

  const dt = document.getElementById('datetime');
  const qdt = document.getElementById('quiz-datetime');

  if(dt) dt.textContent = str;
  if(qdt) qdt.textContent = str;
}

updateClock();
setInterval(updateClock, 1000);



/* ---------------------------
CLASS COMMENTS
----------------------------*/

const commentInput = document.getElementById('class-comment');
const sendComment  = document.getElementById('send-comment');
const commentList  = document.getElementById('comment-list');

function postComment() {

  if(!commentInput || !commentList) return;

  const text = commentInput.value.trim();
  if (!text) return;

  const item = document.createElement('div');
  item.className = 'comment-item';

  item.innerHTML = `
    <div class="comment-avatar">J</div>
    <div class="comment-bubble">
      <div class="c-name">Jheriemy Araullo</div>
      ${text}
    </div>
  `;

  commentList.appendChild(item);
  commentInput.value = '';

  item.scrollIntoView({behavior:'smooth',block:'nearest'});
}

if(sendComment){
  sendComment.addEventListener('click', postComment);
}

if(commentInput){
  commentInput.addEventListener('keydown', e=>{
    if(e.key === 'Enter') postComment();
  });
}



/* ---------------------------
PRIVATE COMMENTS (SAFE)
----------------------------*/

const privateTrigger = document.getElementById('private-comment-trigger');
const privateWrap    = document.getElementById('private-input-wrap');
const privateInput   = document.getElementById('private-comment');
const sendPrivate    = document.getElementById('send-private');

if(privateTrigger && privateWrap && privateInput && sendPrivate){

  privateTrigger.addEventListener('click', () => {
    privateWrap.style.display = 'flex';
    privateTrigger.style.display = 'none';
    privateInput.focus();
  });

  sendPrivate.addEventListener('click', () => {

    if (!privateInput.value.trim()) return;

    privateInput.value = '';

    privateWrap.style.display = 'none';
    privateTrigger.style.display = 'block';

    privateTrigger.textContent = "✓ Comment sent to Professor's Name";
    privateTrigger.style.color = '#2d6a4f';

  });

}



/* ---------------------------
FILE UPLOAD
----------------------------*/

function handleFileUpload(input){

  const fileList = document.getElementById('file-list');
  if(!fileList) return;

  Array.from(input.files).forEach(file=>{

    const item = document.createElement('div');

    item.className = 'file-item';

    item.style.cssText =
    'display:flex;align-items:center;justify-content:space-between;background:#fdf5e6;border-radius:8px;padding:7px 12px;font-size:13px;margin-bottom:6px;';

    item.innerHTML = `
      <span>📄 ${file.name}</span>
      <button onclick="this.parentElement.remove()"
      style="background:none;border:none;cursor:pointer;color:#888;font-size:16px;padding:0 2px;">✕</button>
    `;

    fileList.appendChild(item);

  });

  input.value='';

}



/* ---------------------------
MARK AS DONE (SAFE)
----------------------------*/

const btnMark = document.querySelector('.btn-mark-done');
const workStatus = document.querySelector('.work-status');

if(btnMark && workStatus){

let done = false;

btnMark.addEventListener('click',()=>{

done=!done;

if(done){

btnMark.textContent='Marked as done ✓';
btnMark.style.background='#2d6a4f';

workStatus.textContent='Done';
workStatus.className='work-status done';

}else{

btnMark.textContent='Mark as done';
btnMark.style.background='';

workStatus.textContent='Assigned';
workStatus.className='work-status assigned';

}

});

}



/* ---------------------------
CREATE CLASS MODAL
----------------------------*/

const addClassBtn = document.getElementById('add-class-btn');
const createBackdrop = document.getElementById('create-backdrop');
const createCancel = document.getElementById('create-cancel');
const createConfirm = document.getElementById('create-confirm');

const classNameInput = document.getElementById('class-name');
const sectionInput = document.getElementById('class-section');
const subjectInput = document.getElementById('class-subject');
const roomInput = document.getElementById('class-room');

if(addClassBtn){

addClassBtn.addEventListener('click',()=>{

classNameInput.value='';
sectionInput.value='';
subjectInput.value='';
roomInput.value='';

createBackdrop.classList.add('active');

setTimeout(()=>classNameInput.focus(),100);

});

}

if(createCancel){
createCancel.addEventListener('click',()=>{
createBackdrop.classList.remove('active');
});
}

if(createBackdrop){

createBackdrop.addEventListener('click',e=>{
if(e.target===createBackdrop){
createBackdrop.classList.remove('active');
}
});

}

if(createConfirm){

createConfirm.addEventListener('click',()=>{

const name = classNameInput.value.trim();
const section = sectionInput.value.trim();
const subject = subjectInput.value.trim();
const room = roomInput.value.trim();

if(!name || !section || !subject || !room){
alert("Please fill in all fields.");
return;
}

const classList = document.querySelector('.class-list');

const newClass = document.createElement('div');
newClass.className='class-list-item';
newClass.textContent=name;

classList.appendChild(newClass);

alert(`Class Created:
Name: ${name}
Section: ${section}
Subject: ${subject}
Room: ${room}`);

createBackdrop.classList.remove('active');

});

}



/* ---------------------------
LOGOUT MODAL
----------------------------*/

const logoutBtn = document.getElementById('logout-btn');
const modalBackdrop = document.getElementById('modal-backdrop');
const modalCancel = document.getElementById('modal-cancel');
const modalConfirm = document.getElementById('modal-confirm');

if(logoutBtn){
logoutBtn.addEventListener('click',()=>modalBackdrop.classList.add('active'));
}

if(modalCancel){
modalCancel.addEventListener('click',()=>modalBackdrop.classList.remove('active'));
}

if(modalBackdrop){

modalBackdrop.addEventListener('click',e=>{
if(e.target===modalBackdrop){
modalBackdrop.classList.remove('active');
}
});

}

if(modalConfirm){
modalConfirm.addEventListener('click',()=>window.location.href='index.html');
}



/* ---------------------------
TEACHER EDIT ACTIVITY
----------------------------*/

let editing=false;

function toggleEdit(button){

const title=document.getElementById("activity-title");
const points=document.getElementById("activity-points");
const due=document.getElementById("activity-due");
const instructions=document.getElementById("activity-instructions");

editing=!editing;

title.contentEditable=editing;
points.contentEditable=editing;
due.contentEditable=editing;
instructions.contentEditable=editing;

if(editing){
button.innerText="Save";
}else{
button.innerText="Edit";
}

}
