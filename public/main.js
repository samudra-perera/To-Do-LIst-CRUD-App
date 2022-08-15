const deleteButton = document.querySelectorAll('.deleteButton')
const completeButton = document.querySelectorAll('.completeButton')

Array.from(deleteButton).forEach(elem => {
    elem.addEventListener('click', deleteTask)
})

Array.from(completeButton).forEach(elem => {
    elem.addEventListener('click', completetask)
})

async function deleteTask() {
    const taskName = this.parentNode.childNodes[1].innerText
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

async function completetask() {
    const completed = Number(document.querySelector('.completedTasks').innerText)

    try {
        const response = await fetch('addToCompleted', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              completedS: completed,
            })
          })

        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (err) {
        console.log(err)
    }

}