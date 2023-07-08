import { getDisplayDate } from "./Helpers/getDisplayDate.js";

export const editTask = () => {
  const editBtns = document.getElementsByClassName("editbtn"); // creates array from all element nodes with editbtn class
  [...editBtns].forEach(
    (
      btn // spread editbtns array so we can access each node
    ) =>
      btn.addEventListener(
        "click", //adds event listener to each node
        openEditor
      )
  ); // removes parent element (taking children with it) on button press
};
// opens text editor and changes buttons to text editor relevant ones
function openEditor() {
  const parent = event.target.parentElement;
  const label = parent.querySelector(".checkbox-label");
  const delBtn = parent.querySelector(".delbtn");
  const editBtn = event.target;
  // creates text editor buttons gives them some preset attributes
  const acceptEdit = createButton("&#10003", "btn");
  const cancelBtn = createButton("&#10060", "btn");
  // creates text input field gives it some preset attributes
  const editContainer = createTextInput(
    label.dataset.textStore,
    label.dataset.dateStore,
    label.dataset.taskType
  );
  // swaps new editor related elements on to page
  nodeSwap(parent, [
    [editContainer, label],
    [acceptEdit, editBtn],
    [cancelBtn, delBtn],
  ]);
  acceptEdit.addEventListener("click", () =>
    document.getElementById("hiddenSubmitBtn").click()
  );
  editContainer.addEventListener("submit", (e) => {
    e.preventDefault();
    closeEditor(true, parent, [
      [label, editContainer],
      [editBtn, acceptEdit],
      [delBtn, cancelBtn],
    ]);
  });
  cancelBtn.addEventListener("click", () =>
    closeEditor(false, parent, [
      [label, editContainer],
      [editBtn, acceptEdit],
      [delBtn, cancelBtn],
    ])
  );
}

function closeEditor(acceptChanges, parent, nodeArr) {
  const [originalNode, newNode] = nodeArr[0];
  if (acceptChanges) {
    // originalNode.innerHTML = newNode.dataset.htmlStore.concat(newNode.firstChild.value);
    const newValue = newNode.firstChild.value;
    const selectedDate = newNode.children[1].value;
    const taskType = newNode.children[2].value;
    originalNode.innerHTML = ` <span class="highlight">Due: ${getDisplayDate(
      selectedDate
    )} </span><br> ${newValue}`;
    parent.style.backgroundColor =
      taskType === "home"
        ? "rgba(6, 67, 199, 0.317)"
        : "rgba(57, 17, 79, 0.333)";
    originalNode.dataset.dateStore = selectedDate;
    originalNode.dataset.textStore = newValue;
    originalNode.dataset.taskType = taskType;
  }
  nodeSwap(parent, nodeArr);
}

function nodeSwap(parent, nodeArr) {
  nodeArr.forEach(([newNode, oldNode]) =>
    parent.replaceChild(newNode, oldNode)
  );
}

function createButton(text, className) {
  // this and one below should be abstracted in to a single helper file for the whole project ideally
  const button = document.createElement("button");
  button.innerHTML = text;
  button.classList.add(className);
  button.setAttribute("aria-label", text); // Set ARIA label for accessibility
  return button;
}

function createTextInput(textStore, dateStore, taskType) {
  // this function quite bloated would be good to split up.
  const input = document.createElement("input");
  input.classList.add("edit-text-input");
  input.type = "text";
  input.value = textStore;
  input.classList.add(".edit-task-text");
  input.required = true;
  input.setAttribute("aria-label", "Edit Task Text"); // Set ARIA label for accessibility

  const date = document.createElement("input");
  date.type = "date";
  date.value = dateStore;
  date.classList.add("edit-due-date");
  date.setAttribute("aria-label", "Edit Due Date"); // Set ARIA label for accessibility

  const taskInput = document.createElement("select");
  taskInput.classList.add("edit-type");
  taskInput.setAttribute("aria-label", "Edit Task Type"); // Set ARIA label for accessibility

  const work = document.createElement("option");
  const home = document.createElement("option");
  work.value = "work";
  work.innerText = "work";
  home.value = "home";
  home.innerText = "home";
  if (taskType == "home") home.selected = "selected";
  else work.selected = "selected";
  taskInput.appendChild(work);
  taskInput.appendChild(home);

  const submitBtn = document.createElement("button"); // making a submit button that the accept changes button will trigger onclick. accept changes button is sibling to the form so would have to change lots of css to have it inside the form.
  submitBtn.type = "submit";
  submitBtn.id = "hiddenSubmitBtn";
  submitBtn.style.display = "none";
  submitBtn.setAttribute("aria-hidden", "true"); // Hide the button from accessibility tree
  const form = document.createElement("form");
  // form.action = "javascript:;";
  // form.method = "POST";
  form.classList.add("edit-task");
  form.appendChild(input);
  form.appendChild(date);
  form.appendChild(taskInput);
  form.appendChild(submitBtn);
  form.dataset.textStore = textStore; //
  return form;
}
