export const editTask = () => {
    const editBtns = document.getElementsByClassName("editbtn");  // creates array from all element nodes with editbtn class
    [...editBtns].forEach(btn => // spread editbtns array so we can access each node
        btn.addEventListener("click", //adds event listener to each node
        openEditor));  // removes parent element (taking children with it) on button press
}

function openEditor() {  // opens text editor and changes buttons // could do with refactor fair bit of repetition
    const parent = event.target.parentElement;
    const label = parent.querySelector(".checkbox-label");
    // buttons
    const delBtn = parent.querySelector(".delbtn");
    const editBtn = event.target;
    const acceptEdit = editBtn.cloneNode();
    // button swap
    acceptEdit.innerHTML = "&#10003";
    acceptEdit.classList.toggle("editbtn");
    const cancelBtn = delBtn.cloneNode();
    cancelBtn.innerHTML = "&#10060";
    cancelBtn.classList.toggle("delbtn");    
    // define text input
    const editInput = document.createElement("input");
    editInput.classList.add("edittext");
    editInput.type = "text";
    editInput.value = label.textContent;
    editInput.placeholder = label.textContent;

    nodeSwap(parent,[[editInput,label],[acceptEdit,editBtn],[cancelBtn,delBtn]]);
    // event listeners for accept changes and cancel changes
    const nodeArr = [[label,editInput],[editBtn,acceptEdit],[delBtn,cancelBtn]];
    acceptEdit.addEventListener("click", e => {
        closeEditor(true,nodeArr);
    });
    cancelBtn.addEventListener("click", e => {
        closeEditor(false,nodeArr);
    })
}

function closeEditor(acceptChanges,nodeArr) {
    const parent = event.target.parentElement;  
    if (acceptChanges) nodeArr[0][0].textContent = nodeArr[0][1].value;
    else nodeArr[0][0].textContent = nodeArr[0][1].placeholder;
    nodeSwap(parent,nodeArr);
}

function nodeSwap(parent,nodeArr) {
    nodeArr.forEach(e => parent.replaceChild(e[0],e[1]));
}