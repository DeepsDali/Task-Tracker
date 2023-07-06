export const filterTasksTest = () => {
  console.log("%cFILTER BUTTONS TESTS", "font-weight: bold; color:red");
  const allBtn = document.getElementById("all");
  const pendingBtn = document.getElementById("pending");
  const completedBtn = document.getElementById("completed");
  const homeBtn = document.getElementById("home-btn");
  const workBtn = document.getElementById("work-btn");
  const taskList = document.getElementById("task-list");
  test("Each filter button should show all relevant tasks", () => {
    const taskArr = ["task1", "task2", "task3", "task4"];
    taskArr.forEach((task) => {
      document.getElementById("addTask").value = task;
      document.getElementById("submit-btn").click(); // adds new task to task list
    });
    const tasks = [...taskList.childNodes].filter(
      (parent) => parent.tagName == "DIV"
    );
    const taskCount = tasks.length;
    completedBtn.click();
    let visibleTasks = tasks.filter(
      (task) => task.style.display == "flex"
    ).length;
    equal(
      visibleTasks,
      0,
      `When no tasks checked off completed filter should have no visible tasks. Expected 0, received ${visibleTasks}`
    );
    pendingBtn.click();
    visibleTasks = tasks.filter((task) => task.style.display == "flex").length;
    equal(
      visibleTasks,
      taskCount,
      `When no tasks checked off pending filter should have all tasks visible. Expected ${taskCount}, received ${visibleTasks}`
    );
    allBtn.click();
    visibleTasks = tasks.filter((task) => task.style.display == "flex").length;
    equal(
      visibleTasks,
      taskCount,
      `all filter should always have all tasks visible. Expected ${taskCount}, received ${visibleTasks}`
    );
    tasks[2].childNodes[0].checked = true;
    completedBtn.click();
    visibleTasks = tasks.filter((task) => task.style.display == "flex").length;
    equal(
      visibleTasks,
      1,
      `When one task checked off completed filter should have one visible task. Expected 1, received ${visibleTasks}`
    );
    pendingBtn.click();
    visibleTasks = tasks.filter((task) => task.style.display == "flex").length;
    equal(
      visibleTasks,
      taskCount - 1,
      `When one tasks checked off pending filter should have all tasks minus one visible. Expected ${
        taskCount - 1
      }, received ${visibleTasks}`
    );
    allBtn.click();
    visibleTasks = tasks.filter((task) => task.style.display == "flex").length;
    equal(
      visibleTasks,
      taskCount,
      `all filter should always have all tasks visible. Expected ${taskCount}, received ${visibleTasks}`
    );
    homeBtn.click();
    visibleTasks = tasks.filter((task) => task.style.display == "flex").length;
    equal(
      visibleTasks,
      taskCount,
      `When all tasks set to home type home filter should have all tasks visible. Expected ${taskCount}, received ${visibleTasks}`
    );
    workBtn.click();
    visibleTasks = tasks.filter((task) => task.style.display == "flex").length;
    equal(
      visibleTasks,
      0,
      `When no tasks set to work type work filter should have no visible tasks. Expected 0, received ${visibleTasks}`
    );
    tasks[1].childNodes[1].dataset.taskType = "work";
    homeBtn.click();
    visibleTasks = tasks.filter((task) => task.style.display == "flex").length;
    equal(
      visibleTasks,
      taskCount - 1,
      `When one task set to work type home filter should have all but 1 tasks visible. Expected ${
        taskCount - 1
      }, received ${visibleTasks}`
    );
    workBtn.click();
    visibleTasks = tasks.filter((task) => task.style.display == "flex").length;
    equal(
      visibleTasks,
      1,
      `When one task set to work type work filter should have one visible task. Expected 1, received ${visibleTasks}`
    );
    allBtn.click();
    document.getElementById("clear-all").click();
  });
};
