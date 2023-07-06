import { removeTask } from "../removeTask.js";
import { addTask } from "../addTask.js";

export const removeTaskTest = () => {
  console.log("%cREMOVE BUTTON TESTS", "font-weight: bold; color:red");
  test("removeTask removes the parent element of button when pressed", () => {
    const textString = "delete button test";
    const taskList = document.getElementById("task-list");
    document.getElementById("addTask").value = textString;
    addTask(); // adds new task to task list
    const deleteDiv = [...document.getElementsByTagName("label")].filter(
      (label) => label.dataset.textStore == textString
    )[0].parentElement; // find the new task div
    const containerElement = deleteDiv.parentElement; // get parent of new task
    const elementCount = containerElement.childElementCount; // count children
    removeTask(); // initialise remove task
    deleteDiv.querySelector(".delbtn").click(); // simulate click on delete button
    const elementCountFinal = containerElement.childElementCount; // get updated count of children
    equal(
      // ensure new count is one less than old count
      elementCountFinal,
      elementCount - 1,
      `expected element count of ${
        elementCount - 1
      }, received ${elementCountFinal}`
    );
  });
};
