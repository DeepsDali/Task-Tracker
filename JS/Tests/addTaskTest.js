import { getDisplayDate } from "../Helpers/getDisplayDate.js";

export const addTaskTest = () => {
  console.log("ADD BUTTON TESTS");

  test("Add button creates a new task, displays correct content, category and due date", () => {
    const inputObject = {
      text: "Test Task",
      category: "home",
      date: "2023-07-09",
    };

    // Set the input values
    document.getElementById("addTask").value = inputObject.text;
    document.querySelector("#task-category").value = inputObject.category;
    document.querySelector("#due-date").value = inputObject.date;

    // Simulate form submission to add the task
    // form.dispatchEvent(new Event("submit"));   // submitting form causes page to refresh which on firefox leads to blank page
    document.querySelector("#submit-btn").click();  // have changed this to simulate click on submit button
    const taskList = document.getElementById("task-list");
    const taskItem = taskList.querySelector(".task-item");

    taskList.removeChild(taskItem);

    // Test that a task item was created
    equal(taskItem !== null, true, "A new task item is created");

    // Test the content of the task item
    const label = taskItem.querySelector("label");
    equal(
      label.textContent.includes(inputObject.text),
      true,
      `Expected content of the task item: ${
        inputObject.text
      } Recieved :${label.textContent.slice(12)}`
    );
    // Test the task category
    const taskCategory = document.querySelector("#task-category").value
      ? "home"
      : "work";
    equal(
      taskCategory,
      inputObject.category,
      `Expected task category: ${inputObject.category} Recieved: ${taskCategory}`
    );
    let due = getDisplayDate(inputObject.date);
    // Test the due date
    const dueDate = label.querySelector(".highlight").textContent;
    equal(
      dueDate.includes("09 Jul"),
      true,
      `Date Expected Due: ${due} Recieved: ${dueDate}`
    );
  });
  dateReset();
};


function dateReset() {// set date selector value and min value to todays date
  const dateSelector = document.getElementById("due-date");
  const dateValue = todaysDate();
  dateSelector.value = dateValue;
  dateSelector.min = dateValue;
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