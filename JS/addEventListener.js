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

    // Set attributes and content
    checkbox.type = "checkbox";
    checkbox.name = "checkbox";
    checkbox.id = "checkbox";
    checkbox.className = "checkbox";
    taskItem.className = "task-item stack-md row center";

    label.htmlFor = "checkbox";
    label.className = "checkbox-label";
    label.textContent = inputValue;

    editButton.className = "btn";
    editButton.innerHTML = "&#9998;";

    deleteButton.className = "btn";
    deleteButton.innerHTML = "&#128465;";
  });
};
