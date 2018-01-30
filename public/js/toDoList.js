/* eslint-disable */
const getToDos = function (user) {
 let toDos = Object.keys(user.allTodo);
 let todoTitle ='';
 let index = 1;
 toDos.forEach(todoID=>{
   todoTitle += `${index} <a href="todo/${todoID}">${user.allTodo[todoID].title}</a><br>`;
   index++;
 })
 return todoTitle;
}

const displayTodoList=function(userTodo){
  let toDo = document.getElementById('todolist');
  toDo.innerHTML = getToDos(userTodo);
}
const toDos = function () {
  sendAjaxRequest('GET','/todoList',function(){
    displayTodoList(JSON.parse(this.responseText))
  })
}

window.onload = toDos;
