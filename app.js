const todoInput = document.getElementById('todo-item')
const addTodoBtn = document.querySelector('.form__button-submit')
const resetTodoBtn = document.querySelector('.form__button-reset')
const todosWrapper = document.querySelector('.todos__wrapper')
let todos = []

addTodoBtn.addEventListener('click',event=>{
    event.preventDefault()
    // console.log(event)
    if (todoInput.value){
        newTodoObject()
    }
})

resetTodoBtn.addEventListener('click',event=>{
    event.preventDefault()
    clearTodos()
})

function clearTodos(){
    todos = []
    todosWrapper.innerHTML = ''
    todoInput.value = ''
}

function newTodoObject(){
    let todoTitle = todoInput.value
    let newTodoObject = {
        id : todos.length + 1,
        title : todoTitle,
        complete : false
    }
    todoInput.innerText = ''
    todos.push(newTodoObject)
    saveToLocalStorage()
    addTodoToDom()
}

function saveToLocalStorage(){
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getOfLocalStorage(){
    let localStorageTodos = JSON.parse(localStorage.getItem('todos'))
    if (localStorageTodos)
        todos = localStorageTodos
    else
        todos = []
    addTodoToDom()
}
function addTodoToDom(){
    todosWrapper.innerHTML = ''

    todos.forEach(todoItem=>{
        const todo = document.createElement('div')
        todo.className = 'todo'
        const todoTitle = document.createElement('p')
        todoTitle.innerText = todoItem.title
        todoTitle.classList.add('todo__title')
        const todoStatusBtn = document.createElement('button')
        todoStatusBtn.innerText = "Complete"
        todoStatusBtn.classList.add('todo__status')
        todoStatusBtn.setAttribute('onclick', 'changeStatusTodo(' + todoItem.id + ')')
        if (todoItem.complete == true) {
            todoStatusBtn.classList.add('complete')
            todoStatusBtn.innerText = "UnComplete"
        }

        const todoRemoveBtn = document.createElement('button')
        todoRemoveBtn.innerText = "Remove"
        todoRemoveBtn.classList.add('todo__delete')
        todoRemoveBtn.setAttribute('onclick', 'removeTodo(' + todoItem.id + ')')

        todo.append(todoTitle, todoStatusBtn, todoRemoveBtn)
        todosWrapper.appendChild(todo)
    })
}

function changeStatusTodo(todoId){
    todos.map(todo=>{
        if (todo.id == todoId)
            todo.complete = ! todo.complete
    })
    saveToLocalStorage()
    addTodoToDom()
}

function removeTodo(todoId){
    let todoIndex = todos.findIndex(todo=>{
        return todo.id == todoId
    })
    // console.log(todoIndex)
    todos.splice(todoIndex, 1)
    saveToLocalStorage()
    addTodoToDom()
}

window.addEventListener('load', getOfLocalStorage)