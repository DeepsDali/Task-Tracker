import { addTask } from "./JS/addTask.js";
import { removeTask } from "./JS/deleteTask.js";
import { editTask } from "./JS/editTask.js";

const form = document.getElementById("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  addTask();
  removeTask();
  editTask();
});
