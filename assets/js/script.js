const editIcon = "bxs:edit";
const saveIcon = "material-symbols:select-check-box";
const deleteIcon = "mdi:delete";
let tasks = [];

window.addEventListener("load", () => {

    const newTaskForm = document.querySelector("#new-task-form");
    // const validationError = document.querySelector("#error");

    const clearAllBtn = document.querySelector("#clear-all");

    // Render the tasks
    displayTasks();

    // Listen on Submit form to add new tasks and render it
    newTaskForm.addEventListener("submit", (event) => {
        // Prevent browser from refresh when submit
        event.preventDefault();

        // List of objects, to be able to edit items values in list
        const task = {
            name: event.target.elements.content.value
        };
        tasks.push(task);

        // Clear the input field
        event.target.reset();

        // --------------------------------------------
        // TODO: Add custom input validation
        // [x] Added default browser validation with 'required' tag


        // let messages = [];
        // if (task === "" || task == null) {
        //     messages.push("Task field cannot be empty")
        // }

        // if (messages.length > 0) {
        //     event.preventDefault();
        //     validationError.innerText = messages.join(', ')
        // }
        // ---------------------------------------------

        // Render the tasks
        displayTasks();
    });

    // Listen on Clear All button to clear the list of tasks
    clearAllBtn.addEventListener("click", () => {
        tasks = [];
        displayTasks();
    });

});

function displayTasks() {
    /**
     * Function that create/render tasks in taskList field
     * Listen on each task for actions (like edit, delete etc.)
     */
    const tasksList = document.querySelector("#tasks-list");
    const pendingTasks = document.querySelector("#pending-tasks");

    if (tasks.length == 0) {
        pendingTasks.innerText = `You don't have any tasks`;
    } else if (tasks.length == 1) {
        pendingTasks.innerText = `You have ${tasks.length} pending task`;
    } else {
        pendingTasks.innerText = `You have ${tasks.length} pending tasks`;
    }

    // Clean the field before rendering, to prevent duplicates
    tasksList.innerHTML = "";

    tasks.forEach((singleTask) => {

        // Creation of HTML elements
        const taskElement = document.createElement("li");
        taskElement.classList.add("task");

        const taskName = document.createElement("input");
        taskName.classList.add("task-name");
        taskName.type = "text";
        taskName.value = singleTask.name;
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


        // Nesting of HTML elements
        taskEditBtn.appendChild(taskEditIcon);
        taskActions.appendChild(taskEditBtn);

        taskDeleteBtn.appendChild(taskDeleteIcon);
        taskActions.appendChild(taskDeleteBtn);

        taskElement.appendChild(taskName);
        taskElement.appendChild(taskActions);

        tasksList.appendChild(taskElement);

        // Liten on edit button to turn on modifications and styles
        taskEditBtn.addEventListener('click', () => {
            // Maybe change class with diffetent props instead of style change in JS

            if (taskEditIcon.getAttribute("icon") === editIcon) {
                taskName.removeAttribute("readonly");
                taskName.style.fontWeight = 500;
                taskName.focus();
                taskEditIcon.setAttribute("icon", saveIcon);
                taskEditBtn.style.opacity = 1;
                taskElement.style.outline = "2px solid var(--darkest-gray)";
                taskElement.style.boxShadow = "var(--shadow-hovered)";

                // Listen on input field to turn off modifications and styles and render actual list
                taskName.addEventListener("blur", (event) => {

                    // Condition to prevent saving task with no name
                    if (event.target.value == "") {
                        console.log("Can't save the blank name!");
                    } else {
                        taskName.setAttribute("readonly", true);
                        singleTask.name = event.target.value;
                        taskEditIcon.setAttribute("icon", editIcon);
                        taskName.style.fontWeight = 400;
                        taskEditBtn.style.opacity = 0;
                        taskElement.style.outline = "none";
                        taskElement.style.boxShadow = "var(--shadow)";
                        displayTasks();  // this is not necessary, because the change is done on HTML element and it's visible. It could be useful if the change would be done by JS on list item, not HTML element 
                    }
                });
            }
        });

        // Listen on delete button to delete task from list and render actual list
        taskDeleteBtn.addEventListener('click', () => {
            // Filter function will filter the tasks array, and leave rest of tasks that are not equal to current singleTask
            tasks = tasks.filter(task => task != singleTask);
            displayTasks();
        });
    });
}
