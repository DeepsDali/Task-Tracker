export const editTask = () => {
    const editBtns = document.getElementsByClassName("editbtn");  // creates array from all element nodes with editbtn class
    [...editBtns].forEach(btn => // spread editbtns array so we can access each node
        btn.addEventListener("click", //adds event listener to each node
        openEditor));  // removes parent element (taking children with it) on button press
}
function openEditor() {
    const parent = event.target.parentElement;
    const label = parent.querySelector(".checkbox-label")
    console.log("here",{parent},label.textContent)
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = label.textContent;
    parent.replaceChild(editInput,label);
}