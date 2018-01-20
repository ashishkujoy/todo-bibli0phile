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


const createInputElement = function(type,value){
  let input = document.createElement('input');
  input.type = type;
  input.value = value;
  return input;
}

const createButton = function(innerText,id,onclickFunc){
  let button = document.createElement('button');
  button.id = id;
  button.innerText = innerText;
  button.onclick = onclickFunc;
  return button;
}

const showEditedItem = function(oldItem){
  let res = JSON.parse(this.responseText);
  let editItemBlock = document.getElementById(res.itemId).parentElement;
  editItemBlock.innerHTML = res.newItem;
}

const saveEditedItem = function(){
  let itemId = event.target.id;
  let editItemBlock = event.target.parentElement;
  let changedObjective = event.target.parentElement.children[0].value;
  return sendAjexRequest('post','/editItem',showEditedItem,`itemId=${itemId}&newObjective=${changedObjective}`);
}

const editItem = function(){
  let item = event.target.parentElement;
  let itemId =event.target.id;
  let itemObjective = item.children[1].innerText;
  let editItemBlock = document.createElement('h3');
  editItemBlock.appendChild(createInputElement('text',itemObjective));
  editItemBlock.appendChild(createButton('Save',itemId,saveEditedItem))
  item.replaceWith(editItemBlock);
}
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
const showStatus = function(){};

const changeStatus = function(){
  let itemId = event.target.id;
  let reqBody = `itemId=${itemId}`;
  return sendAjexRequest('post','/changeItemStatus',showStatus,reqBody)
}

window.onload = getTodoView;
