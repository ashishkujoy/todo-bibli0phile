const getToDos = function (user) {
 let toDos = Object.keys(user.allTodo);
 let todoTitle ='';
 toDos.forEach(todoID=>{
   todoTitle += `<a href="todoId-${todoID}">${user.allTodo[todoID].title}</a><br>`;
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
