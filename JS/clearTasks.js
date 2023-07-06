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
