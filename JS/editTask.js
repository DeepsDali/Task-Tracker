export const editTask = () => {
    const editBtns = document.getElementsByClassName("editbtn");  // creates array from all element nodes with editbtn class
    [...editBtns].forEach(btn => // spread editbtns array so we can access each node
        btn.addEventListener("click", //adds event listener to each node
        openEditor));  // removes parent element (taking children with it) on button press
}

function openEditor() {
    const parent = event.target.parentElement;
    const label = parent.querySelector(".checkbox-label");
    const delBtn = parent.querySelector(".delbtn");

    const editInput = document.createElement("input");
    editInput.classList.add("edittext");
    editInput.type = "text";
    editInput.value = label.textContent;
    editInput.placeholder = label.textContent;
    parent.replaceChild(editInput,label);

    event.target.innerHTML = "&#10003";
    event.target.classList.toggle("editbtn")  // this should not be needed but because im accessing this file with setInterval the eventlistener gets added back automatically can remove once integrated in script properly
    const cancelBtn = delBtn.cloneNode();
    cancelBtn.innerHTML = "&#10060";
    cancelBtn.classList.add("canceledit");
    cancelBtn.classList.toggle("delbtn");
    // delBtn.innerHTML = "&#10060";
    parent.replaceChild(cancelBtn,delBtn);
    event.target.removeEventListener("click",openEditor);
    event.target.addEventListener("click", e => {
        closeEditor(true);
    });
    cancelBtn.addEventListener("click", e => {
        closeEditor(false);
    })
}

function closeEditor(acceptChanges) {
    const parent = event.target.parentElement;
    const editInput = parent.querySelector(".edittext")
    console.log("close edit",{editInput});
    const label = document.createElement("label");
    label.htmlFor = "checkbox";
    label.className = "checkbox-label";

    if (acceptChanges) label.textContent = editInput.value;
    else label.textContent = editInput.placeholder;

    parent.replaceChild(label,editInput);
    event.target.innerHTML = "&#9998";
    event.target.classList.toggle("editbtn")  // this should not be needed but because im accessing this file with setInterval the eventlistener gets added back automatically can remove once integrated in script properly
    event.target.removeEventListener("click",closeEditor);
    event.target.addEventListener("click",openEditor)
}
