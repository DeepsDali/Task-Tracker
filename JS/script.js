import { addTask } from "./addTask.js";
import { removeTask } from "./removeTask.js";
import { editTask } from "./editTask.js";
import { filterHandler } from "./filterTasks.js";

const form = document.getElementById("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  addTask();
  removeTask();
  editTask();
});
window.addEventListener("DOMContentLoaded", function () {
  const message = document.getElementById("message");
  message.style.display = "block";
});
filterHandler();