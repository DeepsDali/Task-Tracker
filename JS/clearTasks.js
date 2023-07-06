import { toggleEmptyMessage } from "./Helpers/toggleEmptyMessage.js";

const removeChecked = () => {
  const taskList = document.querySelector("#task-list");
  const completedTasks = taskList.querySelectorAll(
    ".task-item input[type='checkbox']:checked"
  );

  completedTasks.forEach((task) => {
    const taskItem = task.parentNode;
    taskList.removeChild(taskItem);
  });

  toggleEmptyMessage();
};

export const clearCompletedTasks = () => {
  const clearCompleted = document.querySelector("#clear-completed");
  clearCompleted.addEventListener("click", removeChecked);
};

const removeAll = () => {
  const taskItems = document.querySelectorAll(".task-item");
  const taskList = document.querySelector("#task-list");
  taskItems.forEach((task) => {
    taskList.removeChild(task);
  });

  toggleEmptyMessage();
};

export const clearAllTasks = () => {
  const clearAll = document.querySelector("#clear-all");
  clearAll.addEventListener("click", removeAll);
};
