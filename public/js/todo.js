let todoCategories = [
  "<tbody>",
  "<tr><td>School</td></tr>",
  "<tr><td>College</td></tr>",
  "<tr><td>Office</td></tr>",
  "</tbody>"
].join('');


let itemBox = '<input type="text" name="item" placeholder="Item" required>';

const createNewItemField = function() {
  let input = document.createElement('input');
  input.type = 'text';
  input.name = 'item';
  input.placeholder = 'Item';
  input.required = true;
  return input;
}

const showAddTaskOption = function() {
  let inputField = createNewItemField();
  let items = getElement('.todo form div');
  items.appendChild(inputField);
}

const getEmptyItemBoxs = function() {
  let itemBoxs = document.querySelectorAll('.todo form input[placeholder="Item"]');
  return itemBoxs.filter(isEmpty);
}



const saveItems = function() {
  let emptyItemBoxs = getEmptyItemBoxs();
  if(emptyItemBoxs.length>0) return;
  let formReponse = getFormResponse();
}

const renderPage = function() {
  //setInnerHtml('.todo-list table',todoCategories);
  setOnClickFunction('.todo input[value="Add Task"]',showAddTaskOption);
  getTodoList();
}

const consoleMe = function(text) {
  console.log(text);
}

const getTodoDetail = function(){
  let todoId = event.target.id;
  sendAjaxRequest('GET',`/todo/${todoId}`,function(){
    consoleMe(this.responseText);
  })
}

const displayTodoList = function (user) {
  let todoIds = Object.keys(user.allTodo);
  let todoLists = getElement('.todo-list');
  todoIds.forEach(function(id){
    let todoTitle = document.createElement('div')
    let todo = user.allTodo[id];
    todoTitle.innerText = todo.title;
    todoTitle.id = id;
    todoLists.appendChild(todoTitle);
    todoTitle.className = 'todoTitle';
    todoTitle.onclick = getTodoDetail;
  })
}


const getTodoList = function () {
  sendAjaxRequest('GET','/todoList',function(){
    displayTodoList(JSON.parse(this.responseText))
  })
}

const sendAjaxRequest = function(method,url,callBack,reqBody){
  let ajax = new XMLHttpRequest();
  ajax.onload=callBack;
  ajax.open(method,url);
  if(reqBody){
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    return ajax.send(reqBody)
  }
  ajax.send();
}

window.onload = renderPage;
