const User = require('./src/user.js');


const toHtmlParagraph = function(paraId,innerText,buttonId,onClickFunc){
  return `<p id="${paraId}">${innerText} ${getButton(buttonId,onClickFunc,'edit')}</p>`
}

const getButton = function(id,onclickFunction,buttonName){
  return `<button id="${id}" onclick="${onclickFunction}()">${buttonName}</button>`
}

const toHtmlItem = function(item){
  let checkboxStatus = '';
  if(item.status) checkboxStatus = 'checked';
  return `<h3><input type='checkbox' onclick="changeStatus()" id="${item.getId()}" ${checkboxStatus}>
  <span>${item.getItem()}</span>${getButton(item.getId(),'editItem','Edit')}${getButton(item.getId(),'deleteItem','Delete')}</h3></hr>`
}

const getTodo = function(req) {
  let user = req.app.userRegistry.getAUser(req.userName);
  return user.getSingleTodo(req.params.todoId);
}

let lib = {};

lib.redirectLoggedInUserToHome = (req,res)=>{
  if(req.urlIsOneOf(['/','/login']) && req.user) res.redirect('/home.html');
}
lib.logoutUser = function(req,res) {
  res.cookie('sessionid','0',{maxAge:0, encode:String, path:''});
  delete req.app.sessionManager.deleteSession(req.cookies.sessionid);
  res.redirect('/login');
}
lib.getCreateTodoPage = function(req,res) {
  let file = req.app.fs.readFileSync('./public/createToDo.html').toString();
  res.write(file.replace('username',`${req.userName}` || ""));
  res.end();
}
lib.getTodoPage = function(req,res){
  let todoPage = req.app.fs.readFileSync('./public/todo.html','utf8');
  let todo = getTodo(req);
  let todoTitle = toHtmlParagraph(req.params.todoId,todo.getTitle(),'','editTodoTitle');
  let todoDescription = toHtmlParagraph(req.params.todoId,todo.getDescription()||'no description','','editTodoDescription');
  let todoItems = todo.mapItems(toHtmlItem).join('');
  todoPage = todoPage.replace('REPLACE TITLE',todoTitle)
                      .replace('REPLACE DESCRIPTION',todoDescription)
                      .replace('REPLACE ITEMS',todoItems)
                      .replace('USERNAME',req.userName)
  res.write(todoPage);
  res.end();
}
lib.createATodo = function(req,res) {
  let user = req.app.userRegistry.getAUser(req.userName);
  if(!user) user = req.app.userRegistry.addNewUser(req.userName);
  let todo = user.addTodo(req.body.title,req.body.description);
  let items = req.body.item;
  if(items){
    if(typeof(items)=='string'){
        todo.addItem(items);
    } else {
      items.forEach((elem)=>todo.addItem(elem));
    }
  }
  req.app.userRegistry.write();
  res.redirect('/viewTodo.html');
}
lib.getAllTodos = function(req,res) {
  let user = req.app.userRegistry.getAUser(req.userName);
  res.write(JSON.stringify(user)||"");
  res.end();
}

lib.deleteTodo = function(req,res) {
  let user = req.app.userRegistry.getAUser(req.userName);
  user.deleteTodo(req.cookies.todoId);
  req.app.userRegistry.write()
  res.redirect('/viewTodo.html');
}
lib.changeItemStatus = function(req,res){
  let todo = getTodo(req);
  todo.changeItemStatus(req.params.itemId);
  req.app.userRegistry.write();
  res.end();
}
lib.deleteItem = function(req,res){
  let todo = getTodo(req);
  todo.removeItem(req.params.itemId);
  req.app.userRegistry.write();
  res.json({"itemId":req.params.itemId})
}
lib.editItem = function(req,res) {
  let todo = getTodo(req);
  todo.editItem(req.params.itemId,req.body.newObjective);
  let editedItem = todo.getItem(req.params.itemId);
  req.app.userRegistry.write();
  let response = {};
  response.newItem = toHtmlItem(editedItem)
  response.itemId = req.params.itemId;
  res.json(response);
}
lib.addNewItem = function(req,res){
  let todo = getTodo(req);
  let itemId=todo.addItem(req.body.itemObjective);
  let item = toHtmlItem(todo.getItem(itemId));
  res.send(item);
  req.app.userRegistry.write();
}
lib.editTodoTitle = function(req,res){
  let user = req.app.userRegistry.getAUser(req.userName);
  let todoTitle = user.editTodoTitle(req.params.todoId,req.body.newTitle);
  let titleHTMLformat = toHtmlParagraph(req.params.todoId,todoTitle,'','editTodoTitle');
  res.send(titleHTMLformat);
  req.app.userRegistry.write();
}
lib.editTodoDescription=function(req,res){
  let user = req.app.userRegistry.getAUser(req.userName);
  let todoDescription = user.editTodoDescription(req.params.todoId,req.body.newDescription);
  let descriptionHTMLformat = toHtmlParagraph(req.params.todoId,todoDescription,'','editTodoDescription');
  res.send(descriptionHTMLformat);
  req.app.userRegistry.write();
}



module.exports = lib;
