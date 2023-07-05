const showAllBtn = document.getElementById("all");
const showPendingBtn = document.getElementById("pending");
const showCompletedBtn = document.getElementById("completed");
const taskContainer = document.getElementById("task-list");

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

}

function activeButtonFunc(e) {
    showAllBtn.classList.remove("active");
    showPendingBtn.classList.remove("active");
    showCompletedBtn.classList.remove("active");
    e.target.classList.add("active");
}

function showAllFunc() {
    const tasks = [...taskContainer.childNodes].filter(parent => parent.tagName == "DIV");
    [...tasks].forEach(task => task.style.display = "flex");
}

function filterTasksFunc(showPending) {
    showAllFunc();
    const tasks = [...taskContainer.childNodes].filter(parent => parent.tagName == "DIV");
    const completedTasks = [...tasks].filter((task) => task.childNodes[0].checked == showPending);
    [...completedTasks].forEach(task => task.style.display = "none");
}