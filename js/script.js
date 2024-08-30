// Key to used in local storage
const localStorageKey = 'TodoList'

const validateNewTask = ((input) => {
    return !JSON.parse(localStorage.getItem(localStorageKey) || "[]").find(x => x.task.toUpperCase() == input.toUpperCase()) ? false : true
})

const displayWarning = ((warning, input) => {
    alert(warning)
    input.style.border = '2px solid red'
})

const showData = (() => {
    const data = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    document.getElementById('to-do-list').innerHTML = ''
    for (let i = 0; i < data.length; i++) {
        document.getElementById('to-do-list').innerHTML += `
        <li>
            <p>${data[i].task}</p>
            <button id='btn-ok' onclick='removeItem("${i}")'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-check-lg" viewBox="0 0 16 16">
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                </svg>
            </button>
        </li>
        `
    }
    document.getElementById('input-new-task').focus()    
    document.getElementById('input-new-task').value = ''
})

const removeItem = ((dataToDelete) => {
    const data = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    data.splice(dataToDelete, 1)
    localStorage.setItem(localStorageKey, JSON.stringify(data))
    showData()
})

document.getElementById('input-new-task').addEventListener('keypress', (e) => {
    e.key === 'Enter' ? document.getElementById('btn-new-task').click() : ''
})

document.getElementById('input-new-task').addEventListener('focus', () => {
    document.getElementById('input-new-task').style.border = ''
})

document.getElementById('btn-new-task').addEventListener('click', () => {
    const input = document.getElementById('input-new-task')
    if (!input.value) {
        displayWarning('Digite uma tarefa para inserir na sua lista!', input)
    }
    else if (validateNewTask(input.value)) {
        displayWarning('Já existe uma tarefa com essa descrição!', input)
        const oldInput = input.value
        input.value = oldInput
    }
    else {
        const data = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
        data.push({ task: input.value.charAt(0).toUpperCase() + input.value.toString().slice(1) })
        localStorage.setItem(localStorageKey, JSON.stringify(data))
        showData()
    }
})

showData()