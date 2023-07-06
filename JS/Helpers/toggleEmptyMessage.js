export const toggleEmptyMessage = () => {
  const message = document.getElementById("message");
  const taskList = document.getElementById("task-list");
  if (taskList.children.length > 1) {
    message.style.display = "none";
  } else {
    message.style.display = "block";
  }
};
