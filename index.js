const addTaskButton = document.getElementById('addTaskBt')
const input = document.getElementById('input')
const todoUl = document.getElementById('todoUl')
const doingUl = document.getElementById('doingUl')
const doneUl = document.getElementById('doneUl')
const clearStorageButton = document.getElementById('clearStorageBt')
const dropzones = document.querySelectorAll('ul')
let storageToDo = []
let storageDoing = []
let storageDone = []
let draggingTask





catchStorageTasks()
setStorageTasks()




//==================== "CLEAR STORAGE" AND "CREATE NEW TASK" BUTTONS=====================

addTaskButton.addEventListener('click', () => {

    if (input.value != '') {
        createTask(input.value)

        storageToDo.push(input.value)

        //save task into local storage
        localStorage.setItem('arrayToDo', storageToDo)

        //reset input value
        input.value = ''
    }
})


clearStorageButton.addEventListener('click', () => {

    localStorage.clear()
    window.location.reload()
})







//==================== DRAG AND DROP FUNCTIONS: TASK =====================

function insertFunctionsToTask(task) {
    task.addEventListener('dragstart', dragstart)
    task.addEventListener('dragend', dragend)
}

function dragstart() {
    draggingTask = this
    this.classList.add('is-dragging')
    dropzones.forEach(dropzone => dropzone.classList.add('showDropzone'))

}

function dragend() {
    this.classList.remove('is-dragging')
    dropzones.forEach(dropzone => dropzone.classList.remove('showDropzone'))
}







//==================== DRAG AND DROP FUNCTIONS: DROPZONE =====================
dropzones.forEach(dropzone => {

    dropzone.addEventListener('dragover', dragover)
    dropzone.addEventListener('drop', drop)
})


function dragover(event) {

    event.preventDefault();
    this.appendChild(draggingTask)
}


function drop() {
    this.classList.remove('showDropzone')
    draggingTask.classList.remove('is-dragging')
    dropzones.forEach(dropzone => dropzone.classList.remove('showDropzone'))

    const taskColumnName = this.previousElementSibling.textContent
    const taskName = draggingTask.firstElementChild.textContent

    if (storageToDo.indexOf(taskName) !== -1) {

        storageToDo.splice(storageToDo.indexOf(taskName), 1)
        localStorage.setItem('arrayToDo', storageToDo)
        setTaskInNewColumn(taskColumnName, taskName)
    } 


    if (storageDoing.indexOf(taskName) !== -1) {

        storageDoing.splice(storageDoing.indexOf(taskName), 1)
        localStorage.setItem('arrayDoing', storageDoing)
        setTaskInNewColumn(taskColumnName, taskName)
    }


    if (storageDone.indexOf(taskName) !== -1) {

        storageDone.splice(storageDone.indexOf(taskName), 1)
        localStorage.setItem('arrayDone', storageDone)
        setTaskInNewColumn(taskColumnName, taskName)
    } //end if 
}





//======================== APP GENERAL FUNCTIONS

function catchStorageTasks() {

    if (localStorage.getItem('arrayToDo') !== null && localStorage.getItem('arrayToDo') !== "") {
        storageToDo = localStorage.getItem('arrayToDo').split(',')
    }

    if (localStorage.getItem('arrayDoing') !== null && localStorage.getItem('arrayDoing') !== "") {
        storageDoing = localStorage.getItem('arrayDoing').split(',')
    }

    if (localStorage.getItem('arrayDone') !== null && localStorage.getItem('arrayDone') !== "") {
        storageDone = localStorage.getItem('arrayDone').split(',')
    }

}

function setStorageTasks() {
    storageToDo.forEach(storageTask => {

        todoUl.appendChild(createTask(storageTask))
    })

    storageDoing.forEach(storageTask => {

        doingUl.appendChild(createTask(storageTask))
    })

    storageDone.forEach(storageTask => {

        doneUl.appendChild(createTask(storageTask))
    })
}

function createTask(taskName) {
    //create card elements
    const taskCard = document.createElement('li')
    const taskContent = document.createElement('p')

    taskCard.setAttribute("draggable", true)

    //set input value into paragraph
    taskContent.textContent = taskName

    //append new elements 
    taskCard.appendChild(taskContent)
    todoUl.appendChild(taskCard)

    insertFunctionsToTask(taskCard)

    return taskCard
}

function setTaskInNewColumn(taskColumnName, taskName) {

    switch (taskColumnName) {

        case "To do":
            storageToDo.push(taskName)
            localStorage.setItem("arrayToDo", storageToDo)
            break;
        case "Doing":
            storageDoing.push(taskName)
            localStorage.setItem("arrayDoing", storageDoing)
            break;

        case "Done":
            storageDone.push(taskName)
            localStorage.setItem("arrayDone", storageDone)
            break;

        default:
            break;
    }
}