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

    // editButton.className = "btn";
    editButton.classList.add("btn","editbtn");
    editButton.innerHTML = "&#9998;";

    // deleteButton.className = "btn";
    // deleteButton.className = "delbtn";
    deleteButton.classList.add("btn","delbtn");
    deleteButton.innerHTML = "&#128465;";
    // Append elements to the task item div
    taskItem.appendChild(checkbox);
    taskItem.appendChild(label);
    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);

    // Append the task item div to the task list
    taskList.appendChild(taskItem);

    // Clear the input field
    document.getElementById("addTask").value = "";
  });
};
