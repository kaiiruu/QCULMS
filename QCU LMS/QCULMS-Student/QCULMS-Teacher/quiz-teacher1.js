// ADD QUESTION BUTTON
const addBtn = document.getElementById("addQuestion");
const area = document.getElementById("question-area");

addBtn.addEventListener("click", () => {

  const question = document.createElement("div");
  question.className = "question";

  question.innerHTML = `
    <h3 contenteditable="true">QUESTION</h3>

    <div class="option">
      <input type="radio" name="correct">
      <input type="text" placeholder="Option A">
    </div>

    <div class="option">
      <input type="radio" name="correct">
      <input type="text" placeholder="Option B">
    </div>

    <div class="option">
      <input type="radio" name="correct">
      <input type="text" placeholder="Option C">
    </div>

    <div class="option">
      <input type="radio" name="correct">
      <input type="text" placeholder="Add option">
    </div>
  `;

  area.appendChild(question);

});