const User = require('./src/user.js');
const Todo = require('./src/todo.js');

lib = {};

lib.redirectLoggedInUserToHome = (req,res)=>{
  if(req.urlIsOneOf(['/','/login']) && req.user) res.redirect('/home.html');
}
lib.logoutUser = function(req,res) {
  res.setHeader('Set-Cookie',[`sessionid=0,Expires=${new Date(1).toUTCString()}`]);
  delete req.user.sessionid;
  res.redirect('/login');
}
lib.getCreateTodoPage = function(fs,req,res) {
  let file = fs.readFileSync('./public/createToDo.html').toString();
  res.write(file.replace('username',`${req.user.userName}` || ""));
  res.end();
}
lib.createATodo = function(userRegistry,req,res) {
  debugger;
  let user = userRegistry.getAUser(req.user.userName);
  let newUser = user || new User(req.user.userName);
  let todo = newUser.addTodo(req.body.title,req.body.description);
  let items = req.body.item || '';
  if(typeof(items)=='string'){
    todo.addItem(items);
  } else {
    items.forEach((elem)=>todo.addItem(elem));
  }
  if(!user) userRegistry.addNewUser(newUser);
  userRegistry.write();
  res.redirect('/viewToDo.html');
}
lib.getAllTodos = function(userRegistry,req,res) {
  debugger;
  let user = userRegistry.getAUser(req.user.userName);
  res.write(JSON.stringify(user)||"");
  res.end();
}

const toHtmlParagraph = function(options){
  return `<h1 id="${options.id}">${options.text} ${getButton(options.buttonId,options.onClickFunc,options.buttonName)}</h1>`
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

lib.getATodo = function(userRegistry,req,res) {
  let user = userRegistry.getAUser(req.user.userName);
  let todo = user.getSingleTodo(req.cookies.todoId);
  let todoContent = {};
  let options = {
    text:"Title:"+todo.getTitle(),
    id:'title',
    buttonId:'',
    onClickFunc:'editTodoTitle',
    buttonName:'edit'
  }
  todoContent.title = toHtmlParagraph(options);
  options.text = "Description:"+todo.getDescription();
  options.id = 'description';
  options.onClickFunc = 'editTodoDescription';
  todoContent.description = toHtmlParagraph(options);
  todoContent.items = todo.mapItems(toHtmlItem).join('');
  deliverFile(res,'application/json',JSON.stringify(todoContent));
}
lib.deleteTodo = function(userRegistry,req,res) {
  let user = userRegistry.getAUser(req.user.userName);
  user.deleteTodo(req.cookies.todoId);
  userRegistry.write()
  res.redirect('/viewToDo.html');
}
lib.changeItemStatus = function(userRegistry,req,res){
  let user = userRegistry.getAUser(req.user.userName);  
  let todo = user.getSingleTodo(req.cookies.todoId);
  todo.changeItemStatus(req.body.itemId);
  userRegistry.write();
  res.end();
}

lib.deleteItem = function(userRegistry,req,res){
  let user = userRegistry.getAUser(req.user.userName);    
  let todo = user.getSingleTodo(req.cookies.todoId);
  todo.removeItem(req.body.itemId);
  userRegistry.write();
  deliverFile(res,'application/json',JSON.stringify({"itemId":req.body.itemId}))
}
lib.editItem = function(userRegistry,req,res) {
  let user = userRegistry.getAUser(req.user.userName);      
  let todo = user.getSingleTodo(req.cookies.todoId);
  todo.editItem(req.body.itemId,req.body.newObjective);
  let editedItem = todo.getItem(req.body.itemId);
  userRegistry.write();  
  let response = {};
  response.newItem = toHtmlItem(editedItem)
  response.itemId = req.body.itemId;
  deliverFile(res,'application/json',JSON.stringify(response));
}
lib.addNewItem = function(userRegistry,req,res){
  let user = userRegistry.getAUser(req.user.userName);      
  let todo = user.getSingleTodo(req.cookies.todoId);
  let itemId=todo.addItem(req.body.itemObjective);
  let item = toHtmlItem(todo.getItem(itemId));
  deliverFile(res,'text/html',item);
}
lib.editTodoTitle = function(userRegistry,req,res){
  let user = userRegistry.getAUser(req.user.userName);
  let todoTitle = user.editTodoTitle(req.cookies.todoId,req.body.newTitle);
  let options = {
    text:`Title:${todoTitle}`,
    id:'title',
    buttonId:'',
    onClickFunc:'editTodoTitle',
    buttonName:'edit'
  }
  let titleHTMLformat = toHtmlParagraph(options);
  deliverFile(res,'text/html',titleHTMLformat);
}

const deliverFile = function(res,contentType,file){
  res.setHeader('Content-Type',contentType);  
  res.write(file||'');
  res.end();
}

module.exports = lib;
