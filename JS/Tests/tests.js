import { addTask } from "../addTask.js";

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
    "Label text content should be 'Wash the car'"
  );
});

// removeTask Test
// editTask Test
// filterTask Test
