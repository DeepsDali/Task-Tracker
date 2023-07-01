import { addTask } from "./addTask.js";
import { removeTask } from "./removeTask.js";
import { editTask } from "./editTask.js";

const form = document.getElementById("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  addTask();
  removeTask();
  editTask();
});
