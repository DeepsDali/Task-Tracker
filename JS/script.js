import { addTask } from "./addTask.js";
import { removeTask } from "./removeTask.js";
import { editTask } from "./editTask.js";
import { toggleEmptyMessage } from "./Helpers/toggleEmptyMessage.js";
import { clearCompletedTasks, clearAllTasks } from "./clearTasks.js";
const form = document.getElementById("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  addTask();
  removeTask();
  editTask();
});

clearCompletedTasks();
clearAllTasks();

window.addEventListener("DOMContentLoaded", function () {
  toggleEmptyMessage();
});
