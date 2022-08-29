// Variables to hold the buttons
const deleteButton = document.querySelectorAll('.deleteButton')
const completeButton = document.querySelectorAll('.completeButton')
const unCompleteButton = document.querySelectorAll('.UncompleteButton')

//Creating an array from the button nodes and adding event listeners to each button
Array.from(deleteButton).forEach(elem => {
    elem.addEventListener('click', deleteTask)
})

Array.from(completeButton).forEach(elem => {
    elem.addEventListener('click', completetask)
})

Array.from(unCompleteButton).forEach(elem => {
    elem.addEventListener('click', unCompleteTask)
})

//Async function to delete tasks using taskName as the query parameter for the route
async function deleteTask() {
    const taskName = this.parentNode.parentNode.childNodes[1].childNodes[1].innerText
    try {
        const response = await fetch('/deleteTask', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              taskNameS: taskName,
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    } catch (err) {
        console.log(err)
    }
}

//Async function to delete tasks using taskName as the query parameter for the route
async function completetask() {
    const taskName = this.parentNode.parentNode.childNodes[1].childNodes[1].innerText
    try {
        const response = await fetch('addToCompleted', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              taskNameS: taskName,
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (err) {
        console.log(err)
    }

}

//Async function to delete tasks using taskName as the query parameter for the route
async function unCompleteTask() {
    const taskName = this.parentNode.parentNode.childNodes[1].childNodes[1].innerText
    try {
        const response = await fetch('addToUnComplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              taskNameS: taskName,
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch(err) {
        console.log(err)
    }
}