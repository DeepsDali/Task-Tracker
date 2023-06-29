export const editTask = () => {
    const editBtns = document.getElementsByClassName("editbtn");  // creates array from all element nodes with editbtn class
    [...editBtns].forEach(btn => // spread editbtns array so we can access each node
        btn.addEventListener("click", //adds event listener to each node
        openEditor));  // removes parent element (taking children with it) on button press
}

function openEditor() {
    const parent = event.target.parentElement;
    const label = parent.querySelector(".checkbox-label")
    console.log("edit",{parent},label.textContent)
    const editInput = document.createElement("input");
    editInput.classList.add("edittext")
    editInput.type = "text";
    editInput.value = label.textContent;
    parent.replaceChild(editInput,label);
    event.target.innerHTML = "&#10003";
    event.target.classList.toggle("editbtn")
    event.target.removeEventListener("click",openEditor);
    event.target.addEventListener("click",closeEditor)
}

function closeEditor() {
    const parent = event.target.parentElement;
    const editInput = parent.querySelector(".edittext")
    console.log("close edit",{editInput});
    const label = document.createElement("label");
    label.htmlFor = "checkbox";
    label.className = "checkbox-label";
    label.textContent = editInput.value;
    parent.replaceChild(label,editInput);
    event.target.innerHTML = "&#9998";
    event.target.classList.toggle("editbtn")
    event.target.removeEventListener("click",closeEditor);
    event.target.addEventListener("click",openEditor)
}
