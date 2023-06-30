import { addTask } from "../addTask.js";
import { removeTask } from "../deleteTask.js";

// addTask Test

test("Add button creates a new task on the Task List", () => {
  const taskList = document.getElementById("task-list");
  document.getElementById("addTask").value = "Wash the car";
  addTask();
  const taskItem = taskList.querySelector(".task-item");
  const label = taskItem.querySelector("label");
  console.log(label);
  // taskItem.style.display = "none";
  equal(
    label.textContent,
    "Wash the car",
    `Expected: ${label.textContent}, Recieved: Wash the car`
    // "Label text content should be 'Wash the car'"
  );
});

// removeTask Test

test("removeTask removes the parent element of button when pressed", () => {
  const textString = "delete button test"
  const taskList = document.getElementById("task-list");
  document.getElementById("addTask").value = textString;
  addTask();  // adds new task to task list
  const deleteDiv = [...document.getElementsByTagName("label")].filter(label => label.innerText == textString)[0].parentElement;  // find the new task div
  const containerElement = deleteDiv.parentElement; // get parent of new task
  const elementCount = containerElement.childElementCount; // count children
  removeTask(); // initialise remove task
  deleteDiv.querySelector(".delbtn").click();  // simulate click on delete button
  const elementCountFinal = containerElement.childElementCount // get updated count of children
  equal(  // ensure new count is one less than old count
    elementCountFinal, 
    elementCount - 1,
    `expected element count of ${elementCount-1}, received ${elementCountFinal}`
  )
});
// editTask Test
// filterTask Test
