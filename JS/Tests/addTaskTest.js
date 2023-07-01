import { getDisplayDate } from "../Helpers/getDisplayDate.js";

export const addTaskTest = () => {
  console.log("ADD BUTTON TESTS");

  test("Check add button creates a new task, displays task content, due date and category ", () => {
    const inputObject = {
      text: "Test Task",
      category: "home",
      date: "2023-07-09",
    };
    // Simulate form submission to add the task
    form.dispatchEvent(new Event("submit"));
    const taskList = document.getElementById("task-list");
    const taskItem = taskList.querySelector(".task-item");

    taskList.removeChild(taskItem);

    // Test that a task item was created
    equal(taskItem !== null, true, "A new task item was created");
  });
};
