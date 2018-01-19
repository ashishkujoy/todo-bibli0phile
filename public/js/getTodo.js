const getTitle = function(todo) {
  return `<h1>${todo.title}</h1>`;
}
const getDescription = function(todo) {
  return `<h2>${todo.description}</h2>`;
}
const getItems = function(todo) {
  let itemIds = Object.keys(todo.items);
  let itemView='';
  itemIds.forEach(itemId=>{
    if(todo.items[itemId]._isDone){
      itemView += `<h3><input type='checkbox' onclick="changeStatus()" checked> ${todo.items[itemId].objective}</h3></hr>`
    }else {
      itemView += `<h3><input type='checkbox' onclick="changeStatus()"> ${todo.items[itemId].objective}</h3></hr>`
    }
  })
  return itemView;
}

const getTodoView = function () {
  function requestListener(){
    let userTodos = JSON.parse(this.responseText);
    let todoTitle = document.getElementById('title');
    todoTitle.innerHTML = getTitle(userTodos);
    let todoDescription = document.getElementById('description');
    todoDescription.innerHTML = getDescription(userTodos);
    let todoItems = document.getElementById('items');
    todoItems.innerHTML = getItems(userTodos);
  }
  var oReq = new XMLHttpRequest();
  oReq.addEventListener('load',requestListener);
  oReq.open('get','/singletodo');
  oReq.send();
}

window.onload = getTodoView;
