const getTodoView = function () {
  function requestListener(){
    let userTodos = JSON.parse(this.responseText);
    let todoTitle = document.getElementById('title');
    todoTitle.innerHTML=userTodos.title;
    let todoDescription = document.getElementById('description');
    todoDescription.innerHTML=userTodos.description;
    let todoItems = document.getElementById('items');
    todoItems.innerHTML=userTodos.items;
  }
  return sendAjexRequest('get','/singletodo',requestListener);
}

const sendAjexRequest = function(method,url,callBack,reqBody){
  var ajex = new XMLHttpRequest();
  ajex.onload=callBack;
  ajex.open(method,url);
  ajex.send(reqBody||'');
}

let foo;
const haveToRemoveItem = function(){
  let itemId = JSON.parse(this.responseText).itemId;
  let item = document.getElementById(itemId).parentElement;
  let items = item.parentElement;
  items.removeChild(item);
}


const deleteItem = function(){
  let itemId = event.target.id;
  let reqBody = `itemId=${itemId}`;
  return sendAjexRequest('post','/deleteItem',haveToRemoveItem,reqBody)
}
const showStatus = function(){console.log('hello')};

const changeStatus = function(){
  let itemId = event.target.id;
  let reqBody = `itemId=${itemId}`;
  return sendAjexRequest('post','/changeItemStatus',showStatus,reqBody)
  foo=event;
}

window.onload = getTodoView;
