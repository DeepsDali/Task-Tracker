const showAllBtn = document.getElementById("all");
const showPendingBtn = document.getElementById("pending");
const showCompletedBtn = document.getElementById("completed");
const homeBtn = document.getElementById("home-btn");
const workBtn = document.getElementById("work-btn");
const taskContainer = document.getElementById("task-list");
const noTasksMessage = document.getElementById("message");

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

function activeButtonFunc(e) {
    showAllBtn.classList.remove("active");
    showPendingBtn.classList.remove("active");
    showCompletedBtn.classList.remove("active");
    e.target.classList.add("active");
}

function showAllFunc() {
    noTasksMessage.style.display = "none";
    const tasks = [...taskContainer.childNodes].filter(parent => parent.tagName == "DIV");
    console.log(tasks);
    if (tasks.length == 0) noTasksToDisplay();
    [...tasks].forEach(task => task.style.display = "flex");
}

function filterTasksFunc(showPending) {
    showAllFunc();
    const tasks = [...taskContainer.childNodes].filter(parent => parent.tagName == "DIV");
    const completedTasks = [...tasks].filter((task) => task.childNodes[0].checked == showPending);
    console.log(completedTasks);
    if (completedTasks.length > 0 && (tasks.length - completedTasks.length) <= 0) noTasksToDisplay();
    [...completedTasks].forEach(task => task.style.display = "none");
}

function filterByTaskType(taskType) {
    showAllFunc();
    filterNewTasks();
    const tasks = [...taskContainer.childNodes].filter(parent => parent.tagName == "DIV");
    const completedTasks = [...tasks].filter((task) => task.childNodes[1].dataset.taskType == taskType);
    if (completedTasks.length > 0 && (tasks.length - completedTasks.length) <= 0) noTasksToDisplay();
    [...completedTasks].forEach(task => task.style.display = "none");
}

function noTasksToDisplay() {
    noTasksMessage.style.display = "flex";
}
export function filterNewTasks() {
    console.log("here");
    if (showCompletedBtn.classList.contains("active")) showCompletedBtn.click();
    else if (showPendingBtn.classList.contains("active")) showPendingBtn.click();
    else showAllBtn.click();
}