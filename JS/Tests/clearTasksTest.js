import { clearCompletedTasks, clearAllTasks } from "../clearTasks.js";
import { toggleEmptyMessage } from "../Helpers/toggleEmptyMessage.js";

export const clearTasksTest = () => {
  console.log("%cCLEAR TASK TESTS", "font-weight: bold; color:red");
  let isToggleEmptyMessageCalled = false;
  if (toggleEmptyMessage) {
    isToggleEmptyMessageCalled = true;
  }
};
