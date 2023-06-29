export const editTask = () => {
    const editBtns = document.getElementsByClassName("editbtn");  // creates array from all element nodes with editbtn class
    [...editBtns].forEach(btn => // spread editbtns array so we can access each node
        btn.addEventListener("click", //adds event listener to each node
        openEditor));  // removes parent element (taking children with it) on button press
}

function openEditor() {
    const parent = event.target.parentElement;
    const label = parent.querySelector(".checkbox-label");
    // buttons
    const delBtn = parent.querySelector(".delbtn");
    const editBtn = event.target;
    const acceptEdit = editBtn.cloneNode();
    // button swap
    acceptEdit.innerHTML = "&#10003";
    acceptEdit.classList.toggle("editbtn");
    parent.replaceChild(acceptEdit,editBtn);
    const cancelBtn = delBtn.cloneNode();
    cancelBtn.innerHTML = "&#10060";
    cancelBtn.classList.add("canceledit");
    cancelBtn.classList.toggle("delbtn");
    parent.replaceChild(cancelBtn,delBtn);

    // define text input
    const editInput = document.createElement("input");
    editInput.classList.add("edittext");
    editInput.type = "text";
    editInput.value = label.textContent;
    editInput.placeholder = label.textContent;
    // swap in text input
    parent.replaceChild(editInput,label);

    const btnArr = [[acceptEdit,editBtn],[cancelBtn,delBtn]];
    acceptEdit.addEventListener("click", e => {
        closeEditor(true,label,btnArr);
    });
    cancelBtn.addEventListener("click", e => {
        closeEditor(false,label,btnArr);
    })
}

function closeEditor(acceptChanges,label,btnArr) {
    const parent = event.target.parentElement;
    const editInput = parent.querySelector(".edittext")    

    if (acceptChanges) label.textContent = editInput.value;
    else label.textContent = editInput.placeholder;

    parent.replaceChild(label,editInput);
    btnArr.forEach(e => parent.replaceChild(e[1],e[0]))
}
