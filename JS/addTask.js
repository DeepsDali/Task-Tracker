import { getDisplayDate } from "./Helpers/getDisplayDate.js";
import { filterNewTasks } from "./filterTasks.js";
import { toggleEmptyMessage } from "./Helpers/toggleEmptyMessage.js";

export const addTask = () => {
  const taskList = document.getElementById("task-list");
  const inputValue = document.getElementById("addTask").value;
  const taskItem = document.createElement("div");
  const checkbox = document.createElement("input");
  const label = document.createElement("label");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");

  // Set attributes and content
  checkbox.type = "checkbox";
  checkbox.name = "checkbox";
  checkbox.id = "checkbox";
  checkbox.className = "checkbox";
  checkbox.addEventListener("click", filterNewTasks);
  taskItem.className = "task-item stack-lg row center";
  label.htmlFor = "checkbox";
  label.className = "checkbox-label";
  label.dataset.textStore = inputValue;

  // Set task item background
  const taskCategorySelect = document.querySelector("#task-category");
  const selectedOption = taskCategorySelect.value;
  taskItem.style.backgroundColor =
    selectedOption === "home"
      ? "rgba(6, 67, 199, 0.317)"
      : "rgba(57, 17, 79, 0.333)";
  label.dataset.taskType = selectedOption;

  // Set Date
  const dueDate = document.querySelector("#due-date");
  const selectedDate = dueDate.value;
  const displayDate = getDisplayDate(selectedDate);
  label.innerHTML = ` <span class="highlight">Due: ${displayDate} </span><br> ${inputValue}`;
  label.dataset.dateStore = selectedDate; // saves date in html attribute to be used later
  //Edit and Delete buttons
  editButton.classList.add("btn", "editbtn");
  editButton.innerHTML = "&#9998;";

  deleteButton.classList.add("btn", "delbtn");
  deleteButton.innerHTML = "&#128465;";

  // Accessibility attributes
  checkbox.setAttribute("aria-labelledby", label.id);
  checkbox.setAttribute(
    "aria-describedby",
    `${editButton.id} ${deleteButton.id}`
  );
  label.id = "label-" + Date.now(); // Generate a unique ID for each label
  label.setAttribute("for", checkbox.id);
  editButton.id = "edit-" + Date.now(); // Generate a unique ID for edit button
  deleteButton.id = "delete-" + Date.now(); // Generate a unique ID for delete button
  editButton.setAttribute("aria-label", "Edit");
  deleteButton.setAttribute("aria-label", "Delete");

  // Append elements to the task item div
  taskItem.appendChild(checkbox);
  taskItem.appendChild(label);
  taskItem.appendChild(editButton);
  taskItem.appendChild(deleteButton);

  // Append the task item div to the task list
  taskList.appendChild(taskItem);

  toggleEmptyMessage();

  // Clear the input field
  document.getElementById("addTask").value = "";
};
