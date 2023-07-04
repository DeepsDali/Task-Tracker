import { getDisplayDate } from "../Helpers/getDisplayDate.js";

export const editTaskTest = () => {
  console.log("EDIT BUTTON TESTS");
  test("openEditor should replace checkbox label with an input of type text, an input of type date and a select input", () => {
    const textString = "open editor test";
    const taskList = document.getElementById("task-list");
    document.getElementById("addTask").value = textString;
    document.getElementById("submit-btn").click(); // adds new task to task list
    const editDiv = [...document.getElementsByTagName("label")].filter(
      (label) => label.dataset.textStore == textString
    )[0].parentElement; // find the new task div
    editDiv.querySelector(".editbtn").click(); // simulate click on edit button
    const labelCheck = editDiv.querySelector(".edit-text-input").type; // check type of checkbox label
    const dateCheck = editDiv.querySelector(".edit-due-date").type;
    const selectCheck = editDiv.querySelector(".edit-type").tagName;
    equal(
      labelCheck,
      "text",
      `When editor opened expect element type "text", received "${labelCheck}"`
    );
    equal(
      dateCheck,
      "date",
      `When editor opened expect element type "date", received "${dateCheck}"`
    );
    equal(
      selectCheck,
      "SELECT",
      `When editor opened expect element type "SELECT", received "${selectCheck}"`
    );
    editDiv.remove();
  });

  test("openEditor should replace buttons with editor related ones", () => {
    const textString = "editor button check";
    const taskList = document.getElementById("task-list");
    document.getElementById("addTask").value = textString;
    document.getElementById("submit-btn").click(); // adds new task to task list
    const editDiv = [...document.getElementsByTagName("label")].filter(
      (label) => label.dataset.textStore == textString
    )[0].parentElement; // find the new task div
    const preEditButtonCount = editDiv.querySelectorAll("button").length; // check number of buttons in div
    editDiv.querySelector(".editbtn").click(); // simulate click on edit button
    const [acceptButton, cancelButton] = editDiv.querySelectorAll("button"); // get both buttons
    const postEditButtonCount = editDiv.querySelectorAll("button").length; // check number of buttons in div
    equal(
      acceptButton.innerHTML,
      "✓",
      `New button should have value "✓", received "${acceptButton.innerHTML}"`
    );
    equal(
      cancelButton.innerHTML,
      "❌",
      `New button should have value "❌", received "${cancelButton.innerHTML}"`
    );
    equal(
      postEditButtonCount,
      preEditButtonCount,
      `There should be a total of 2 buttons before and after opening the editor. Expected ${preEditButtonCount}, recieved ${postEditButtonCount}`
    );
    editDiv.remove();
  });

  test("closing editor should replace all three inputs with a single label", () => {
    const textString = "close editor test";
    const taskList = document.getElementById("task-list");
    document.getElementById("addTask").value = textString;
    document.getElementById("submit-btn").click(); // adds new task to task list
    const editDiv = [...document.getElementsByTagName("label")].filter(
      (label) => label.dataset.textStore == textString
    )[0].parentElement; // find the new task div
    editDiv.querySelector(".editbtn").click(); // simulate click on edit button
    editDiv.querySelector("button").click(); // simulate click on accept changes button
    const editCheck = editDiv.querySelector(".checkbox-label").tagName; // check type of checkbox label
    equal(
      editCheck,
      "LABEL",
      `When editor opened expect element type "LABEL", received "${editCheck}"`
    );
    editDiv.remove();
  });

  test("accept changes button should replace text input with a label with value of newDate & newString the background colour should also be updated to reflect changes in task type", () => {
    const textString = "accept button editor test";
    const newTextString = "changes accepted";
    const newDate = "2023-08-05";
    const newDateString = getDisplayDate(newDate);
    const taskList = document.getElementById("task-list");
    document.getElementById("addTask").value = textString;
    document.getElementById("submit-btn").click(); // adds new task to task list
    const editDiv = [...document.getElementsByTagName("label")].filter(
      (label) => label.dataset.textStore == textString
    )[0].parentElement; // find the new task div
    editDiv.querySelector(".editbtn").click(); // simulate click on edit button
    editDiv.querySelector(".edit-text-input").value = newTextString; // give text input new value
    editDiv.querySelector(".edit-due-date").value = newDate;
    editDiv.querySelector(".edit-type").value = "work";
    editDiv.querySelector("button").click(); // simulate click on accept changes button
    const textEditCheck = editDiv.querySelector(".checkbox-label").textContent.slice(14); // check text content of label and remove date section of text
    const dateEditCheck = editDiv.querySelector(".checkbox-label").textContent.slice(6,12);
    const taskTypeEditCheck = editDiv.querySelector(".checkbox-label").dataset.taskType;
    equal(
      textEditCheck,
      newTextString,
      `When changes accepted label should have text content of "${newTextString}", received "${textEditCheck}"`
    );
    equal(
      dateEditCheck,
      newDateString,
      `When changes accepted label should have text content of "${newDateString}", received "${dateEditCheck}"`
    );
    equal(
      taskTypeEditCheck,
      "work",
      `When changes accepted label should have data content of "work", received "${taskTypeEditCheck}"`
    );
    editDiv.remove();
  });

  test("cancel changes button should replace text input with a label with it's original date, text value and tasktype", () => {
    const textString = "cancel button editor test";
    const newTextString = "new text string";
    const newDate = "2023-08-05";
    const oldDateString = getDisplayDate(document.getElementById("due-date").value);
    const taskList = document.getElementById("task-list");
    document.getElementById("addTask").value = textString;
    document.getElementById("submit-btn").click(); // adds new task to task list
    const editDiv = [...document.getElementsByTagName("label")].filter(
      (label) => label.dataset.textStore == textString
    )[0].parentElement; // find the new task div
    editDiv.querySelector(".editbtn").click(); // simulate click on edit button
    editDiv.querySelector(".edit-text-input").value = newTextString; // give text input new value
    editDiv.querySelector(".edit-due-date").value = newDate;
    editDiv.querySelector(".edit-type").value = "work";
    editDiv.querySelectorAll("button")[1].click(); // simulate click on cancel changes button
    const editCheck = editDiv.querySelector(".checkbox-label").textContent.slice(14); // check text content of label
    const dateEditCheck = editDiv.querySelector(".checkbox-label").textContent.slice(6,12);
    const taskTypeEditCheck = editDiv.querySelector(".checkbox-label").dataset.taskType;
    equal(
      editCheck,
      textString,
      `When changes canceled label should have original text still of "${textString}", received "${editCheck}"`
    );
    equal(
      dateEditCheck,
      oldDateString,
      `When changes accepted label should have text content of "${oldDateString}", received "${dateEditCheck}"`
    );
    equal(
      taskTypeEditCheck,
      "home",
      `When changes accepted label should have data content of "home", received "${taskTypeEditCheck}"`
    );
    editDiv.remove();
  });
};
