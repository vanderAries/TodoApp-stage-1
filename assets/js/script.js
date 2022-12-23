const editIcon = "bxs:edit";
const saveIcon = "material-symbols:select-check-box";
const deleteIcon = "mdi:delete";

window.addEventListener("load", () => {
    const newTaskForm = document.querySelector("#new-task-form");
    const newTaskField = document.querySelector("#new-task-field");


    newTaskForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const task = newTaskField.value;

        displayTasks(task);
    });
});

function displayTasks(singleTask) {

    const tasksList = document.querySelector("#tasks-list");

    const taskElement = document.createElement("li");
    taskElement.classList.add("task");

    // const taskName = document.createElement("p");
    // taskName.classList.add("task-name");
    // taskName.innerText = singleTask;

    const taskName = document.createElement("input");
    taskName.classList.add("task-name");
    taskName.type = "text";
    taskName.value = singleTask;
    taskName.setAttribute("readonly", "readonly");

    const taskActions = document.createElement("div");
    taskActions.classList.add("task-actions");

    const taskEditBtn = document.createElement("button");
    taskEditBtn.classList.add("edit-task");

    const taskEditIcon = document.createElement("iconify-icon");
    taskEditIcon.classList.add("edit-icon");
    taskEditIcon.setAttribute("icon", editIcon);


    const taskDeleteBtn = document.createElement("button");
    taskDeleteBtn.classList.add("delete-task");

    const taskDeleteIcon = document.createElement("iconify-icon");
    taskDeleteIcon.classList.add("delete-icon");
    taskDeleteIcon.setAttribute("icon", deleteIcon);


    taskEditBtn.appendChild(taskEditIcon);
    taskActions.appendChild(taskEditBtn);

    taskDeleteBtn.appendChild(taskDeleteIcon);
    taskActions.appendChild(taskDeleteBtn);

    taskElement.appendChild(taskName);
    taskElement.appendChild(taskActions);

    tasksList.appendChild(taskElement);

    taskEditBtn.addEventListener('click', () => {
        if (taskEditIcon.getAttribute("icon") === editIcon) {
            taskName.removeAttribute("readonly");
            taskName.style.fontWeight = 500;
            taskName.focus();
            taskEditIcon.setAttribute("icon", saveIcon);
            taskEditBtn.style.opacity = 1;
            taskElement.style.outline = "2px solid var(--darkest-gray)";
            taskElement.style.boxShadow = "var(--shadow-hovered)";
        } else {
            taskName.setAttribute("readonly", "readonly");
            taskEditIcon.setAttribute("icon", editIcon);
            taskName.style.fontWeight = 400;
            taskEditBtn.style.opacity = 0;
            taskElement.style.outline = "none";
            taskElement.style.boxShadow = "var(--shadow)";
        }
    });

    taskDeleteBtn.addEventListener('click', () => {
        tasksList.removeChild(taskElement)
    })
}
