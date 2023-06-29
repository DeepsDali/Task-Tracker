export const removeTask = () => {
    const delBtns = document.getElementsByClassName("delbtn");  // creates array from all element nodes with delbtn class
    [...delBtns].forEach(btn => // spread delbtns array so we can access each node
        btn.addEventListener("click", //adds event listener to each node
        e => e.target.parentElement.remove()));  // removes parent element (taking children with it) on button press
}

