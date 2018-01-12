const getToDos = function (userComment) {
 let toDos = '';
 userComment.forEach(feedback=>{
   toDos += `
   <b>title:</b>${feedback.title}<br>
   <hr/>`;
 })
 return toDos;
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
