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

const createInputElement = function(type,value,id){
  let input = document.createElement('input');
  input.type = type;
  input.value = value||'';
  input.id = id||'';
  return input;
}

const createButton = function(innerText,id,onclickFunc){
  let button = document.createElement('button');
  button.id = id||"";
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

const showNewItem = function(){
  let newItem = document.createElement('h3');
  newItem.innerHTML = this.responseText;
  let addItemBlock = document.getElementById('newItem').parentElement;
  let items = document.getElementById('items');
  items.replaceChild(newItem,addItemBlock);
  let addItemButton = createButton('Add Item','addItemButton',showTextBoxForNewItems);
  let saveButton = document.getElementById('saveNewItem');
  saveButton.replaceWith(addItemButton);
}

let foo;
const addNewItem = function(){
  let itemObjective = document.getElementById("newItem").value;
  let reqBody = `itemObjective=${itemObjective}`;
  sendAjexRequest('POST','/addNewItem',showNewItem,reqBody);
}

const showEditedTitle = function(){
  let editTitleBlock = document.getElementById("editTitleBlock");
  let newTitle = document.createElement('h4');
  newTitle.innerHTML = this.responseText;
  editTitleBlock.replaceWith(newTitle); 
}

const saveEditedTitle =function(){
  let newTitle = document.getElementById('newTitle').value;
  let reqBody = `newTitle=${newTitle}`;
  sendAjexRequest('POST','/editTodoTitle',showEditedTitle,reqBody);
}
const editTodoTitle = function(){
  let titleDiv = document.getElementById('title');
  let title = titleDiv.innerText;
  title = title.replace('Title:','').replace(' edit','');
  let editTitleBlock = document.createElement('h1');
  editTitleBlock.id = "editTitleBlock";
  editTitleBlock.appendChild(createInputElement('text',title,"newTitle"));
  editTitleBlock.appendChild(createButton('Save',null,saveEditedTitle));
  titleDiv.replaceWith(editTitleBlock);
}

const showTextBoxForNewItems = function(){
  let addItemBlock = document.createElement('h3');
  addItemBlock.appendChild(createInputElement('text',null,'newItem'));
  let items = document.getElementById('items');
  items.appendChild(addItemBlock);
  let saveButton = createButton('save','saveNewItem',addNewItem);
  let addItem = document.getElementById('addItemButton');
  addItem.replaceWith(saveButton);
}

window.onload = getTodoView;
