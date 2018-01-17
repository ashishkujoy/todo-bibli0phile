const getToDos = function (user) {
 let toDos = Object.keys(user.allTodo);
 let todoTitle ='';
 toDos.forEach(todoID=>{
   todoTitle += `<a href="todoId-${todoID}">${user.allTodo[todoID].title}</a><br>`;
 })
 return todoTitle;
}

const toDos = function () {
  function requestListener(){
    let userTodos = JSON.parse(this.responseText);
    let toDo = document.getElementById('todolist');
    toDo.innerHTML = getToDos(userTodos);
  }
  var oReq = new XMLHttpRequest();
  oReq.addEventListener('load',requestListener);
  oReq.open('get','/todoList');
  oReq.send();
}

window.onload = toDos;
