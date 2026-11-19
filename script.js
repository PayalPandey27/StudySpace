
// ===================================
// STUDYSPACE - STUDENT PLANNER
// ===================================


// ===================================
// SIDEBAR NAVIGATION
// ===================================

const navLinks = document.querySelectorAll("nav a");

const pages = document.querySelectorAll(".page-section");

navLinks.forEach(function(link) {

    link.addEventListener("click", function(event) {

        event.preventDefault();

        const selectedPage = link.dataset.page;

        // Hide all sections

        pages.forEach(function(page) {

            page.classList.remove("active-page");

        });

        // Show selected section

        document.getElementById(selectedPage)
            .classList.add("active-page");

        // Update active sidebar button

        navLinks.forEach(function(item) {

            item.classList.remove("active");

        });

        link.classList.add("active");

    });

});


// ===================================
// TASK MANAGEMENT
// ===================================

const taskForm = document.getElementById("taskForm");

const taskInput = document.getElementById("taskInput");

const taskSubject = document.getElementById("taskSubject");

const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");

const completedTasks = document.getElementById("completedTasks");

const pendingTasks = document.getElementById("pendingTasks");


// Load saved tasks

let tasks = JSON.parse(localStorage.getItem("studyTasks")) || [];


// Save tasks

function saveTasks() {

    localStorage.setItem(
        "studyTasks",
        JSON.stringify(tasks)
    );

}


// ===================================
// UPDATE DASHBOARD AND PROGRESS
// ===================================

function updateProgress() {

    const total = tasks.length;

    const completed = tasks.filter(function(task) {

        return task.completed;

    }).length;

    const pending = total - completed;


    totalTasks.textContent = total;

    completedTasks.textContent = completed;

    pendingTasks.textContent = pending;


    let percentage = 0;

    if (total > 0) {

        percentage = Math.round(
            (completed / total) * 100
        );

    }


    document.getElementById("progressPercentage")
        .textContent = percentage + "%";


    document.getElementById("progressFill")
        .style.width = percentage + "%";


    const message = document.getElementById("progressMessage");


    if (total === 0) {

        message.textContent =
            "Start completing your tasks to see your progress! 💗";

    }

    else if (percentage === 100) {

        message.textContent =
            "Amazing! You completed all your tasks today! 🎉";

    }

    else if (percentage >= 50) {

        message.textContent =
            "Great work! You are making wonderful progress! 🌸";

    }

    else {

        message.textContent =
            "Keep going! Every small step counts! 💗";

    }

}


// ===================================
// DISPLAY TASKS
// ===================================

function displayTasks() {

    taskList.innerHTML = "";


    if (tasks.length === 0) {

        const message = document.createElement("p");

        message.className = "empty-message";

        message.textContent =
            "No tasks added yet. Start planning! 🌷";

        taskList.appendChild(message);

        updateProgress();

        return;

    }


    tasks.forEach(function(task, index) {

        const taskItem = document.createElement("div");

        taskItem.className = "task-item";


        if (task.completed) {

            taskItem.classList.add("completed");

        }


        // Checkbox

        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.checked = task.completed;


        // Task information

        const taskInfo = document.createElement("div");

        taskInfo.className = "task-info";


        const taskName = document.createElement("strong");

        taskName.textContent = task.name;


        const subjectName = document.createElement("small");

        subjectName.textContent = task.subject;


        taskInfo.appendChild(taskName);

        taskInfo.appendChild(subjectName);


        // Delete button

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.className = "delete-btn";


        // Mark task completed or pending

        checkbox.addEventListener("change", function() {

            tasks[index].completed = checkbox.checked;

            saveTasks();

            displayTasks();

        });


        // Delete task

        deleteButton.addEventListener("click", function() {

            tasks.splice(index, 1);

            saveTasks();

            displayTasks();

        });


        taskItem.appendChild(checkbox);

        taskItem.appendChild(taskInfo);

        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);

    });


    updateProgress();

}


// ===================================
// ADD NEW TASK
// ===================================

taskForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const newTask = {

        name: taskInput.value.trim(),

        subject: taskSubject.value,

        completed: false

    };


    if (newTask.name === "" || newTask.subject === "") {

        return;

    }


    tasks.push(newTask);

    saveTasks();

    displayTasks();

    taskForm.reset();

});


// ===================================
// TIMETABLE MANAGEMENT
// ===================================

const timetableForm =
    document.getElementById("timetableForm");

const timetableList =
    document.getElementById("timetableList");

const studyTime =
    document.getElementById("studyTime");

const studySubject =
    document.getElementById("studySubject");

const studyActivity =
    document.getElementById("studyActivity");


// Load saved timetable

let timetable =
    JSON.parse(localStorage.getItem("studyTimetable")) || [];


// Save timetable

function saveTimetable() {

    localStorage.setItem(
        "studyTimetable",
        JSON.stringify(timetable)
    );

}


// Display timetable

function displayTimetable() {

    timetableList.innerHTML = "";


    if (timetable.length === 0) {

        const message = document.createElement("p");

        message.className = "empty-message";

        message.textContent =
            "Your timetable will appear here. 🌸";

        timetableList.appendChild(message);

        return;

    }


    timetable.forEach(function(item, index) {

        const timetableItem = document.createElement("div");

        timetableItem.className = "timetable-item";


        const info = document.createElement("div");

        info.className = "timetable-info";


        const time = document.createElement("strong");

        time.textContent = item.time;


        const subject = document.createElement("p");

        subject.textContent =
            item.subject + " - " + item.activity;


        info.appendChild(time);

        info.appendChild(subject);


        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.className = "delete-btn";


        deleteButton.addEventListener("click", function() {

            timetable.splice(index, 1);

            saveTimetable();

            displayTimetable();

        });


        timetableItem.appendChild(info);

        timetableItem.appendChild(deleteButton);

        timetableList.appendChild(timetableItem);

    });

}


// Add timetable entry

timetableForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const newEntry = {

        time: studyTime.value,

        subject: studySubject.value,

        activity: studyActivity.value.trim()

    };


    if (
        newEntry.time === "" ||
        newEntry.subject === "" ||
        newEntry.activity === ""
    ) {

        return;

    }


    timetable.push(newEntry);


    // Arrange entries according to time

    timetable.sort(function(a, b) {

        return a.time.localeCompare(b.time);

    });


    saveTimetable();

    displayTimetable();

    timetableForm.reset();

});


// ===================================
// MY NOTES MANAGEMENT
// ===================================

const noteFields = [

    {
        id: "javaNotes",
        key: "javaNotes",
        status: "javaStatus"
    },

    {
        id: "graphicsNotes",
        key: "graphicsNotes",
        status: "graphicsStatus"
    },

    {
        id: "dataMiningNotes",
        key: "dataMiningNotes",
        status: "dataMiningStatus"
    }

];


// Load and save notes

noteFields.forEach(function(note) {

    const textarea = document.getElementById(note.id);

    const status = document.getElementById(note.status);


    // Load previously saved notes

    textarea.value = localStorage.getItem(note.key) || "";


    // Automatically save notes

    textarea.addEventListener("input", function() {

        localStorage.setItem(
            note.key,
            textarea.value
        );

        status.textContent = "Saved successfully! 💗";

    });

});


// ===================================
// INITIAL DISPLAY
// ===================================

displayTasks();

displayTimetable();

updateProgress();

