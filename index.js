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



//------------------------catch Storage Tasks
function catchStorageTasks() {

    if(localStorage.getItem('arrayToDo') !== null && localStorage.getItem('arrayToDo') !== ""){
        storageToDo = localStorage.getItem('arrayToDo').split(',')
    }

    if(localStorage.getItem('arrayDoing') !== null && localStorage.getItem('arrayDoing') !== ""){
        storageDoing = localStorage.getItem('arrayDoing').split(',')
    }

    if(localStorage.getItem('arrayDone') !== null && localStorage.getItem('arrayDone') !== ""){
        storageDone = localStorage.getItem('arrayDone').split(',')
    }

}

function setStorageTasks() {

    storageToDo.forEach(storageTask => {

        const newLi = document.createElement('li')
        const newP = document.createElement('p')

        newLi.setAttribute("draggable", true)
        newP.textContent = storageTask

        newLi.appendChild(newP)

        insertFunctionsToTask(newLi)

        todoUl.appendChild(newLi)

    })

    storageDoing.forEach(storageTask => {
        const newLi = document.createElement('li')
        const newP = document.createElement('p')

        newLi.setAttribute("draggable", true)
        newP.textContent = storageTask

        newLi.appendChild(newP)

        insertFunctionsToTask(newLi)

        doingUl.appendChild(newLi)
    })

    storageDone.forEach(storageTask => {

        const newLi = document.createElement('li')
        const newP = document.createElement('p')

        newLi.setAttribute("draggable", true)
        newP.textContent = storageTask

        newLi.appendChild(newP)

        insertFunctionsToTask(newLi)

        doneUl.appendChild(newLi)
    })
}

catchStorageTasks()
setStorageTasks()





//------------------------create task function
addTaskButton.addEventListener('click', () => {
    if (input.value != '') {
        createTask(input.value)
    }
})


function createTask(task) {

    //create card elements
    const newLi = document.createElement('li')
    const newP = document.createElement('p')

    newLi.setAttribute("draggable", true)

    //set input value into paragraph
    newP.textContent = task

    //append new elements 
    newLi.appendChild(newP)
    todoUl.appendChild(newLi)

    //reset input value
    input.value = ''

    storageToDo.push(newP.textContent)

    //save task into local storage
    localStorage.setItem('arrayToDo', storageToDo)

    insertFunctionsToTask(newLi)
}






//----------------------------clear Storage function
clearStorageButton.addEventListener('click', () => {
    localStorage.clear()
    window.location.reload()
})






//---------------------------drag and drop functions

function insertFunctionsToTask(task) {
    task.addEventListener('dragstart', dragstart)
    task.addEventListener('dragend', dragend)
}

function dragstart() {
    draggingTask = this
}

function dragend() {

}





dropzones.forEach(dropzone => {
    dropzone.addEventListener('dragover', dragover)
    dropzone.addEventListener('dragleave', dragleave)
    dropzone.addEventListener('drop', drop)
})


function dragover(event) {
    event.preventDefault();

    this.classList.add('showDropzone')

    this.appendChild(draggingTask)
}

function dragleave() {
    this.classList.remove('showDropzone')
}

function drop() {
    this.classList.remove('showDropzone')

    const newList = this.previousElementSibling.textContent
    const task = draggingTask.firstElementChild.textContent


    if (storageToDo.indexOf(task) !== -1) {
        storageToDo.splice(storageToDo.indexOf(task), 1)
        localStorage.setItem('arrayToDo', storageToDo)

        switch (newList) {

            case "To do":
                storageToDo.push(task)
                localStorage.setItem("arrayToDo", storageToDo)
                break;
            case "Doing":
                storageDoing.push(task)
                localStorage.setItem("arrayDoing", storageDoing)
                break;

            case "Done":
                storageDone.push(task)
                localStorage.setItem("arrayDone", storageDone)
                break;

            default:
                break;
        }//end switch
    } //end if 


    if (storageDoing.indexOf(task) !== -1) {
        storageDoing.splice(storageDoing.indexOf(task), 1)
        localStorage.setItem('arrayDoing', storageDoing)

        switch (newList) {

            case "To do":
                storageToDo.push(task)
                localStorage.setItem("arrayToDo", storageToDo)
                break;
            case "Doing":
                storageDoing.push(task)
                localStorage.setItem("arrayDoing", storageDoing)
                break;

            case "Done":
                storageDone.push(task)
                localStorage.setItem("arrayDone", storageDone)
                break;

            default:
                break;
        }//end switch
    } //end if 
    
    
        if (storageDone.indexOf(task) !== -1) {
            storageDone.splice(storageDone.indexOf(task), 1)
            localStorage.setItem('arrayDone', storageDone)
    
            switch (newList) {

                case "To do":
                    storageToDo.push(task)
                    localStorage.setItem("arrayToDo", storageToDo)
                    break;
                case "Doing":
                    storageDoing.push(task)
                    localStorage.setItem("arrayDoing", storageDoing)
                    break;
    
                case "Done":
                    storageDone.push(task)
                    localStorage.setItem("arrayDone", storageDone)
                    break;
    
                default:
                    break;
            }//end switch
        } //end if 

}