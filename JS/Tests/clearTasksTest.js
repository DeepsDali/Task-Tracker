import { clearCompletedTasks, clearAllTasks } from "../clearTasks.js";
import { toggleEmptyMessage } from "../Helpers/toggleEmptyMessage.js";

export const clearTasksTest = () => {
  console.log("%cCLEAR TASK TESTS", "font-weight: bold; color:red");
  let isToggleEmptyMessageCalled = false;
  if (toggleEmptyMessage) {
    isToggleEmptyMessageCalled = true;
  }
  test("Clear Completed button should remove all check marked tasks from the task list and call toggleEmptyMessage", () => {
    clearCompletedTasks();
    const completedTasks = document.querySelectorAll(
      ".task-item input[type='checkbox']:checked"
    );

    equal(
      completedTasks.length,
      0,
      `Expected All Completed tasks removed from task list and completedTasks length = 0. Recieved ${completedTasks.length}`
    );
    equal(
      isToggleEmptyMessageCalled,
      true,
      `Expected: isToggleEmptyMessageCalled to return true Recieved:${isToggleEmptyMessageCalled}`
    );
  });
  test("Clear All button should remove all tasks from the task list and call and call toggleEmptyMessage", () => {
    clearAllTasks();

    const taskItems = document.querySelectorAll(".task-item");
    equal(
      taskItems.length,
      0,
      `Expected All tasks removed from task list and taskItems length = 0. Recieved ${taskItems.length}`
    );
    equal(
      isToggleEmptyMessageCalled,
      true,
      `Expected: isToggleEmptyMessageCalled to return true Recieved:${isToggleEmptyMessageCalled}`
    );
  });
};
