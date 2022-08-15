const deleteButton = document.querySelectorAll('.deleteButton')
const completeButton = document.querySelectorAll('.completeButton')

Array.from(deleteButton).forEach(elem => {
    elem.addEventListener('click', deleteTask)
})

Array.from(completeButton).forEach(elem => {
    elem.addEventListener('click', {
        
    })
})

async function deleteTask() {
    const taskName = this.parentNode.childNodes[1].innerText
    console.log([taskName, 'taskName'])
    try {
        const response = await fetch('/deleteTask', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              taskNameS: taskName,
            })
          })
        const data = await response.json()
        console.log([data, 'data'])
        location.reload()

    } catch (err) {
        console.log(err)
    }
}