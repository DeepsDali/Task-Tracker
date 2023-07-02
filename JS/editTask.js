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
    const editContainer = createTextInput(label.innerHTML,label.dataset.dateStore);  
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
      let selectedDate = newNode.children[1].value;
      originalNode.innerHTML = ` <span class="highlight">Due: ${getDisplayDate(selectedDate)} </span><br> ${newNode.firstChild.value}`
      originalNode.dataset.dateStore = selectedDate;
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
  
  function createTextInput(value,dateStore) {
    const stringSplitPoint = value.search('<br>') + 5; // find position we want to split html string
    const textString = value.slice(stringSplitPoint); // save the text content only
    const htmlString = value.slice(0,stringSplitPoint); // save the html content only
    const input = document.createElement("input");
    input.classList.add("edit-text-input");
    input.type = "text";
    input.value = textString;
    input.classList.add(".edit-task-text")
    const date = document.createElement("input");
    date.type = "date"
    date.value = dateStore;
    date.classList.add("edit-due-date")
    const div = document.createElement("div");
    div.classList.add("edit-task")
    div.appendChild(input);
    div.appendChild(date)
    div.dataset.htmlStore = htmlString;  // save the html content as data attribute so we can access it down the line
    div.dataset.textStore = textString;  //
    return div;
  }

  function todaysDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate(); 
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    const formattedToday = `${yyyy}-${mm}-${dd}`;
    return formattedToday
  }