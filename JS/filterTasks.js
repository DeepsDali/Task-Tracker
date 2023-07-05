const showAllBtn = document.getElementById("all");
const showPendingBtn = document.getElementById("pending");
const showCompletedBtn = document.getElementById("completed");
const homeBtn = document.getElementById("home-btn");
const workBtn = document.getElementById("work-btn");
const taskContainer = document.getElementById("task-list");
const noTasksMessage = document.getElementById("message");

// adds event listeners to all the filter options
export function filterHandler() {
    showAllBtn.addEventListener("click", e => {
        activeButtonFunc(e);
        showAllFunc();
    });

    showPendingBtn.addEventListener("click", e => {
        activeButtonFunc(e);
        filterTasksFunc(true);
    });

    showCompletedBtn.addEventListener("click", e => {
        activeButtonFunc(e);
        filterTasksFunc(false);
    });

    homeBtn.addEventListener("click", e => {
        filterByTaskType("work")
    })
    workBtn.addEventListener("click", e => {
        filterByTaskType("home")
    })
}

// gives active button class 'active' to visually differentiate
function activeButtonFunc(e) {
    showAllBtn.classList.remove("active");  // seemed easier to just clear active from all instead of tracking down which one is currently active
    showPendingBtn.classList.remove("active");
    showCompletedBtn.classList.remove("active");
    e.target.classList.add("active");  // set the button that triggered this event to active
}
// makes all tasks visible
function showAllFunc() {
    noTasksMessage.style.display = "none";
    const tasks = [...taskContainer.childNodes].filter(parent => parent.tagName == "DIV"); // get's array containing all tasks (if any) filter used because there are some none task related elements in the container
    if (tasks.length == 0) noTasksToDisplay();
    [...tasks].forEach(task => task.style.display = "flex");
}
/**
 * function to filter by pending/completed
 * @param {boolean} showPending if true filter will show pending tasks. false only completed tasks
 */
function filterTasksFunc(showPending) {
    showAllFunc();  // reset all tasks to visible to avoid having multiple filters apply at once
    const tasks = [...taskContainer.childNodes].filter(parent => parent.tagName == "DIV");
    const completedTasks = [...tasks].filter((task) => task.childNodes[0].checked == showPending);
    if (completedTasks.length > 0 && (tasks.length - completedTasks.length) <= 0) noTasksToDisplay();
    [...completedTasks].forEach(task => task.style.display = "none");
}
/**
 * function to filter by task type home/work
 * @param {string} taskType should be either "home" or "work" will filter out whichever is passed
 */
function filterByTaskType(taskType) {
    // showAllFunc(); // redundant as all possible outcomes of filterNewTasks call showAllFunc()
    filterNewTasks();
    const tasks = [...taskContainer.childNodes].filter(parent => parent.tagName == "DIV");
    const completedTasks = [...tasks].filter((task) => task.childNodes[1].dataset.taskType == taskType);
    if (completedTasks.length > 0 && (tasks.length - completedTasks.length) <= 0) noTasksToDisplay();
    [...completedTasks].forEach(task => task.style.display = "none");
}
// shows no tasks to display message when filter empty
function noTasksToDisplay() {
    noTasksMessage.style.display = "flex";
}
// makes show/hide run when new task added, edited or deleted. Stops new tasks appearing in filter when they shouldn't
export function filterNewTasks() {
    if (showCompletedBtn.classList.contains("active")) showCompletedBtn.click();
    else if (showPendingBtn.classList.contains("active")) showPendingBtn.click();
    else showAllBtn.click();
}