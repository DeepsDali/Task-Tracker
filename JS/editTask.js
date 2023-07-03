import { getDisplayDate } from "./Helpers/getDisplayDate.js";

export const editTask = () => {
    const editBtns = document.getElementsByClassName("editbtn");  // creates array from all element nodes with editbtn class
    [...editBtns].forEach(btn => // spread editbtns array so we can access each node
        btn.addEventListener("click", //adds event listener to each node
        openEditor));  // removes parent element (taking children with it) on button press
}
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
    const editContainer = createTextInput(label.dataset.textStore,label.dataset.dateStore,label.dataset.taskType);  
    // swaps new editor related elements on to page
    nodeSwap(parent, [
      [editContainer, label],
      [acceptEdit, editBtn],
      [cancelBtn, delBtn]
    ]);
  
    acceptEdit.addEventListener("click", () => closeEditor(true, parent, [[label, editContainer], [editBtn, acceptEdit], [delBtn, cancelBtn]]));
    cancelBtn.addEventListener("click", () => closeEditor(false, parent, [[label, editContainer], [editBtn, acceptEdit], [delBtn, cancelBtn]]));
  }
  
  function closeEditor(acceptChanges, parent, nodeArr) {
    const [originalNode, newNode] = nodeArr[0];
    console.log(newNode)
    if (acceptChanges) {
      // originalNode.innerHTML = newNode.dataset.htmlStore.concat(newNode.firstChild.value);
      const newValue = newNode.firstChild.value;
      const selectedDate = newNode.children[1].value;
      const taskType = newNode.children[2].value;
      originalNode.innerHTML = ` <span class="highlight">Due: ${getDisplayDate(selectedDate)} </span><br> ${newValue}`;
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
    nodeArr.forEach(([newNode, oldNode]) => parent.replaceChild(newNode, oldNode));
  }
  
  function createButton(text, className) {  // this and one below should be abstracted in to a single helper file for the whole project ideally
    const button = document.createElement("button");
    button.innerHTML = text;
    button.classList.add(className);
    return button;
  }
  
  function createTextInput(textStore,dateStore,taskType) {  // this function quite bloated would be good to split up.
    const input = document.createElement("input");
    input.classList.add("edit-text-input");
    input.type = "text";
    input.value = textStore;
    input.classList.add(".edit-task-text");

    const date = document.createElement("input");
    date.type = "date";
    date.value = dateStore;
    date.classList.add("edit-due-date");

    const taskInput = document.createElement("select");
    taskInput.classList.add("edit-type");
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

    const div = document.createElement("div");
    div.classList.add("edit-task");
    div.appendChild(input);
    div.appendChild(date);
    div.appendChild(taskInput);
    div.dataset.textStore = textStore;  //
    return div;
  }

 /*  Use this on add task date selector
function todaysDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate(); 
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  const formattedToday = `${yyyy}-${mm}-${dd}`;
  return formattedToday
} */