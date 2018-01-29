const User = require('./src/user.js');


const toHtmlParagraph = function(paraId,innerText,buttonId,onClickFunc,buttonName){
  return `<p id="${paraId}">${innerText} ${getButton(buttonId,onClickFunc,buttonName)}</p>`
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
lib.createATodo = function(req,res) {
  let user = req.app.userRegistry.getAUser(req.userName);
  let newUser = user || new User(req.userName);
  let todo = newUser.addTodo(req.body.title,req.body.description);
  let items = req.body.item;
  if(items){
    if(typeof(items)=='string'){
        todo.addItem(items);
    } else {
      items.forEach((elem)=>todo.addItem(elem));
    }
  }
  if(!user) req.app.userRegistry.addNewUser(newUser);
  req.app.userRegistry.write();
  res.redirect('/viewTodo.html');
}
lib.getAllTodos = function(req,res) {
  let user = req.app.userRegistry.getAUser(req.userName);
  res.write(JSON.stringify(user)||"");
  res.end();
}
lib.getATodo = function(req,res) {
  let user = req.app.userRegistry.getAUser(req.userName);
  let todo = user.getSingleTodo(req.cookies.todoId);
  let todoContent = {};
  let text=`Title:  ${todo.getTitle()}`;
  todoContent.username = req.userName;
  todoContent.title = toHtmlParagraph(todo.getId(),text,'','editTodoTitle','edit');
  text = `Description:  ${todo.getDescription()}`;
  todoContent.description = toHtmlParagraph('description',text,'','editTodoDescription','edit');
  todoContent.items = todo.mapItems(toHtmlItem).join('');
  res.json(todoContent);
}
lib.deleteTodo = function(req,res) {
  let user = req.app.userRegistry.getAUser(req.userName);
  user.deleteTodo(req.cookies.todoId);
  req.app.userRegistry.write()
  res.redirect('/viewTodo.html');
}
lib.changeItemStatus = function(req,res){
  let user = req.app.userRegistry.getAUser(req.userName);
  let todo = user.getSingleTodo(req.params.todoId);
  todo.changeItemStatus(req.params.itemId);
  req.app.userRegistry.write();
  res.end();
}
lib.deleteItem = function(req,res){
  let user = req.app.userRegistry.getAUser(req.userName);
  let todo = user.getSingleTodo(req.params.todoId);
  todo.removeItem(req.params.itemId);
  req.app.userRegistry.write();
  res.json({"itemId":req.params.itemId})
}
lib.editItem = function(req,res) {
  let user = req.app.userRegistry.getAUser(req.userName);
  debugger;
  let todo = user.getSingleTodo(req.params.todoId);
  todo.editItem(req.params.itemId,req.body.newObjective);
  let editedItem = todo.getItem(req.params.itemId);
  req.app.userRegistry.write();
  let response = {};
  response.newItem = toHtmlItem(editedItem)
  response.itemId = req.params.itemId;
  res.set('Content-Type','application/json')
  res.send(response);
}
lib.addNewItem = function(req,res){
  let user = req.app.userRegistry.getAUser(req.userName);
  let todo = user.getSingleTodo(req.params.todoId);
  let itemId=todo.addItem(req.body.itemObjective);
  let item = toHtmlItem(todo.getItem(itemId));
  res.set('Content-Type','text/html')
  res.send(item);
  req.app.userRegistry.write();
}
lib.editTodoTitle = function(req,res){
  let user = req.app.userRegistry.getAUser(req.userName);
  let todoTitle = user.editTodoTitle(req.params.todoId,req.body.newTitle);
  let text=`Title:  ${todoTitle}`;
  let titleHTMLformat = toHtmlParagraph('title',text,'','editTodoTitle','edit');
  res.set('Content-Type','text/html')
  res.send(titleHTMLformat);
  req.app.userRegistry.write();
}
lib.editTodoDescription=function(req,res){
  let user = req.app.userRegistry.getAUser(req.userName);
  let todoDescription = user.editTodoDescription(req.params.todoId,req.body.newDescription);
  let text=`Description:  ${todoDescription}`;
  let descriptionHTMLformat = toHtmlParagraph('description',text,'','editTodoDescription','edit');
  res.set('Content-Type','text/html')
  res.send(descriptionHTMLformat);
  req.app.userRegistry.write();

}



module.exports = lib;
