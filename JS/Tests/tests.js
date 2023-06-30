import { addTask } from "../addTask.js";
import { removeTask } from "../deleteTask.js";
import { editTask } from "../editTask.js";

// addTask Test

test("Add button creates a new task on the Task List", () => {
  const taskList = document.getElementById("task-list");
  document.getElementById("addTask").value = "Wash the car";
  addTask();
  const taskItem = taskList.querySelector(".task-item");
  const label = taskItem.querySelector("label");
  console.log(label);
  taskItem.style.display = "none";
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

test("openEditor should replace checkbox label with an input of type text", () => {
  const textString = "open editor test"
  const taskList = document.getElementById("task-list");
  document.getElementById("addTask").value = textString;
  addTask();  // adds new task to task list
  const editDiv = [...document.getElementsByTagName("label")].filter(label => label.innerText == textString)[0].parentElement;  // find the new task div
  editTask(); // init remove task
  editDiv.querySelector(".editbtn").click();  // simulate click on edit button
  const editCheck = editDiv.querySelector(".edittext").type; // check type of checkbox label
  equal(
    editCheck,
    "text",
    `When editor opened expect element type "text", received "${editCheck}"`
  )
  editDiv.remove();
})

test("openEditor should replace buttons with editor related ones", () => {
  const textString = "editor button check"
  const taskList = document.getElementById("task-list");
  document.getElementById("addTask").value = textString;
  addTask();  // adds new task to task list
  const editDiv = [...document.getElementsByTagName("label")].filter(label => label.innerText == textString)[0].parentElement;  // find the new task div
  editTask(); // init remove task
  const preEditButtonCount = editDiv.querySelectorAll("button").length; // check number of buttons in div
  editDiv.querySelector(".editbtn").click();  // simulate click on edit button
  const [acceptButton, cancelButton] = editDiv.querySelectorAll("button"); // get both buttons
  const postEditButtonCount = editDiv.querySelectorAll("button").length; // check number of buttons in div
  equal(
    acceptButton.innerHTML,
    "✓",
    `New button should have value "✓", received "${acceptButton.innerHTML}"`
  )
  equal(
    cancelButton.innerHTML,
    "❌",
    `New button should have value "❌", received "${cancelButton.innerHTML}"`
  )
  equal(
    postEditButtonCount,
    preEditButtonCount,
    `There should be a total of 2 buttons before and after opening the editor. Expected ${preEditButtonCount}, recieved ${postEditButtonCount}`
  )
  editDiv.remove();
})

test("closing editor should replace text input with a label", () => {
  const textString = "close editor test"
  const taskList = document.getElementById("task-list");
  document.getElementById("addTask").value = textString;
  addTask();  // adds new task to task list
  const editDiv = [...document.getElementsByTagName("label")].filter(label => label.innerText == textString)[0].parentElement;  // find the new task div
  editTask(); // init remove task
  editDiv.querySelector(".editbtn").click();  // simulate click on edit button
  editDiv.querySelector("button").click(); // simulate click on accept changes button
  const editCheck = editDiv.querySelector(".checkbox-label").tagName; // check type of checkbox label
  equal(
    editCheck,
    "LABEL",
    `When editor opened expect element type "LABEL", received "${editCheck}"`
  )
  editDiv.remove();
})

test("accept changes button should replace text input with a label with value of newstring", () => {
  const textString = "accept button editor test"
  const newTextString = "changes accepted"
  const taskList = document.getElementById("task-list");
  document.getElementById("addTask").value = textString;
  addTask();  // adds new task to task list
  const editDiv = [...document.getElementsByTagName("label")].filter(label => label.innerText == textString)[0].parentElement;  // find the new task div
  editTask(); // init remove task
  editDiv.querySelector(".editbtn").click();  // simulate click on edit button
  editDiv.querySelector(".edittext").value = newTextString; // give text input new value
  editDiv.querySelector("button").click(); // simulate click on accept changes button
  const editCheck = editDiv.querySelector(".checkbox-label").textContent; // check text content of label
  equal(
    editCheck,
    newTextString,
    `When changes accepted label should have text content of "${newTextString}", received "${editCheck}"`
  )
  editDiv.remove();
})

test("cancel changes button should replace text input with a label with value of newstring", () => {
  const textString = "cancel button editor test"
  const newTextString = "new text string"
  const taskList = document.getElementById("task-list");
  document.getElementById("addTask").value = textString;
  addTask();  // adds new task to task list
  const editDiv = [...document.getElementsByTagName("label")].filter(label => label.innerText == textString)[0].parentElement;  // find the new task div
  editTask(); // init remove task
  editDiv.querySelector(".editbtn").click();  // simulate click on edit button
  editDiv.querySelector(".edittext").value = newTextString; // give text input new value
  editDiv.querySelectorAll("button")[1].click(); // simulate click on cancel changes button
  const editCheck = editDiv.querySelector(".checkbox-label").textContent; // check text content of label
  equal(
    editCheck,
    textString,
    `When changes accepted label should have original text still of "${textString}", received "${editCheck}"`
  )
  editDiv.remove();
})
// filterTask Test
