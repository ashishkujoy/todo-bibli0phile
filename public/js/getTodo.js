/* eslint-disable */
const getElement = function(selector){
  return document.querySelector(selector);
}
const getTodoId = function(){
  return getElement('#title p').id;
}
const updateInnerHTML = (selector,html)=>{
  document.querySelector(selector).innerHTML = html;
}

const getInnerText = function(id){
  let element = document.querySelector(`#${id}`);
  return element.innerText;
}

const createInputElement = function(type,value,id){
  let input = document.createElement('input');
  input.type = type;
  input.value = value||'';
  input.id = id||'';
  input.className = 'input';
  return input;
}

const createButton = function(innerText,id,onclickFunc){
  let button = document.createElement('button');
  button.id = id||"";
  button.innerText = innerText;
  button.onclick = onclickFunc;
  return button;
}

const showEditedItem = function(res){
  let editItemBlock = document.getElementById(res.itemId).parentElement;
  editItemBlock.innerHTML = res.newItem;
}

const saveEditedItem = function(){
  let itemId = event.target.id;
  let todoId = getTodoId()
  let editItemBlock = event.target.parentElement;
  let changedObjective = event.target.parentElement.children[0].value;
  let reqBody = `newObjective=${changedObjective}`;
  let path = `${todoId}/item/${itemId}/edit`
  return sendAjaxRequest('post',path,function(){
    showEditedItem(JSON.parse(this.responseText))
  },reqBody);
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
const removeItem = function(itemId){
  let item = document.getElementById(itemId).parentElement;
  let items = item.parentElement;
  items.removeChild(item);
}

const deleteItem = function(){
  let itemId = event.target.id;
  let path = `${getTodoId()}/item/${itemId}/delete`;
  return sendAjaxRequest('post',path,function(){
    let itemId = JSON.parse(this.responseText).itemId;
    removeItem(itemId)
  })
}

const changeStatus = function(){
  let itemId = event.target.id;
  let path = `${getTodoId()}/item/${itemId}/changeStatus`;
  return sendAjaxRequest('post',path,()=>{})
}

const showNewItem = function(text){
  let newItem = createElement('h3',text);
  let addItemBlock = document.getElementById('newItem').parentElement;
  let items = document.getElementById('items');
  items.replaceChild(newItem,addItemBlock);
  let addItemButton = createButton('Add Item','addItemButton',showTextBoxForNewItems);
  let saveButton = document.getElementById('saveNewItem');
  saveButton.replaceWith(addItemButton);
}

const addNewItem = function(){
  let itemObjective = document.getElementById("newItem").value;
  let reqBody = `itemObjective=${itemObjective}`;
  console.log(getTodoId());
  sendAjaxRequest('POST',`${getTodoId()}/addNewItem`,function(){
    showNewItem(this.responseText);
  },reqBody);
}

const newDiv = function(divId,innerHTML){
  let div = document.createElement('div');
  div.id = divId;
  div.innerHTML = innerHTML;
  return div;
}
const createElement = function(elementTag,innerHTML){
  let element = document.createElement(elementTag)
  element.innerHTML = innerHTML;
  return element;
}

const showEditedTitle = function(text){
  let editTitleBlock = getElement(".editBlock");
  let newTitle = newDiv('title',text)
  editTitleBlock.replaceWith(newTitle);
}
const showEditedDescription = function(text){
  let editDescriptionBlock = getElement(".editBlock");
  let newDescription = newDiv('description',text);
  editDescriptionBlock.replaceWith(newDescription)
}

const saveEditedTitle =function(){
  let todoId = getElement('.editBlock').id
  let newTitle = getElement('.editBlock input').value;
  let path = `${todoId}/editTitle`;
  let reqBody = `newTitle=${newTitle}`;
  sendAjaxRequest('POST',path,function(){
    showEditedTitle(this.responseText);
  },reqBody);
}
const editTodoTitle = function(){
  let titleDiv = document.querySelector('#title');
  let title = getInnerText('title');
  title = title.replace('Title: ','').replace(' edit','');
  let options = {
    blockId:getTodoId(),
    textBoxValue:title,
    textBoxId:'newTitle',
    saveFunction:saveEditedTitle
  }
  let editTitleBlock = createEditBlock(options);
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

const saveEditedDescription = function(){
  let newDescription = getElement('.editBlock input').value;
  let todoId = getElement('.editBlock').id;
  let reqBody = `newDescription=${newDescription}`;
  sendAjaxRequest('POST',`${todoId}/editDescription`,function(){
    showEditedDescription(this.responseText)
  },reqBody);
}

const editTodoDescription = function(){
  let descriptionDiv = document.querySelector('#description');
  let description = getInnerText('description');
  description = description.replace('Description: ','').replace(' edit','');
  let options = {
    blockId:getTodoId(),
    textBoxValue:description,
    textBoxId:'newDescription',
    saveFunction:saveEditedDescription
  }
  let editDescriptionBlock = createEditBlock(options);
  descriptionDiv.replaceWith(editDescriptionBlock);
}

const createEditBlock = function(options){
  let editBlock = document.createElement('h1');
  editBlock.className = 'editBlock';
  editBlock.id = options.blockId;
  editBlock.appendChild(createInputElement('text',options.textBoxValue,options.textBoxId));
  editBlock.appendChild(createButton('Save',null,options.saveFunction));
  return editBlock;
}

const loadPage = function(){
  // Have to change function name.
  let addItem = document.querySelector('#addItemButton')
  addItem.onclick=showTextBoxForNewItems;
};

window.onload = loadPage;
