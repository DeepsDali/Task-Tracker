export const addEventListener = () => {
  const form = document.getElementById("form");
  const taskList = document.getElementById("task-list");
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const inputValue = document.getElementById("addTask").value;

    const taskItem = document.createElement("div");
    const checkbox = document.createElement("input");
    const label = document.createElement("label");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");
  });
};
