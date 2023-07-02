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
    const editInput = createTextInput(label.innerHTML);  
    // swaps new editor related elements on to page
    nodeSwap(parent, [
      [editInput, label],
      [acceptEdit, editBtn],
      [cancelBtn, delBtn]
    ]);
  
    acceptEdit.addEventListener("click", () => closeEditor(true, parent, [[label, editInput], [editBtn, acceptEdit], [delBtn, cancelBtn]]));
    cancelBtn.addEventListener("click", () => closeEditor(false, parent, [[label, editInput], [editBtn, acceptEdit], [delBtn, cancelBtn]]));
  }
  
  function closeEditor(acceptChanges, parent, nodeArr) {
    const [originalNode, newNode] = nodeArr[0];
    if (acceptChanges) originalNode.innerHTML = newNode.dataset.htmlStore.concat(newNode.value);
    else newNode.dataset.htmlStore.concat(newNode.dataset.textStore);
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
  
  function createTextInput(value) {
    const stringSplitPoint = value.search('<br>') + 5; // find position we want to split html string
    const textString = value.slice(stringSplitPoint); // save the text content only
    const htmlString = value.slice(0,stringSplitPoint); // save the html content only
    const input = document.createElement("input");
    input.classList.add("edittext");
    input.type = "text";
    input.value = textString;
    input.dataset.htmlStore = htmlString;  // save the html content as data attribute so we can access it down the line
    input.dataset.textStore = textString;  //
    return input;
  }
  