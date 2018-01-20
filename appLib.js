const fs = require('fs');
const User = require('./src/user.js');
const Todo = require('./src/todo.js');
const TodoItem = require('./src/todoItem.js');
let allUser = JSON.parse(fs.readFileSync('./data/todoList.json'));

const regenerateItem = function(item,itemParentClass){
  item.__proto__ = new itemParentClass().__proto__;
}

const regenerateTodos = function(todo,todoParentClass,itemParentClass){
  todo.__proto__ = new todoParentClass().__proto__;
  todo.forEachItem(function(item){
    regenerateItem(item,itemParentClass)
  })
}

const giveBehavior = function() {
  if(allUser.length){
    allUser.forEach(user=>{
      user.__proto__ = new User().__proto__;
      user.forEachTodo(function(todo){
        regenerateTodos(todo,Todo,TodoItem);
      })
    })
  }
}
giveBehavior();


const writeJsonFile = function(res,userData) {
  fs.writeFile('./data/todoList.json',JSON.stringify(userData,null,2),()=>{});
  res.redirect('/viewToDo.html');
}
lib = {};

lib.redirectLoggedInUserToHome = (req,res)=>{
  if(req.urlIsOneOf(['/','/login']) && req.user) res.redirect('/home.html');
}
lib.logoutUser = function(req,res) {
  res.setHeader('Set-Cookie',[`sessionid=0,Expires=${new Date(1).toUTCString()}`]);
  delete req.user.sessionid;
  res.redirect('/login');
}
lib.getCreateTodoPage = function(req,res) {
  let file = fs.readFileSync('./public/createToDo.html').toString();
  res.write(file.replace('username',`${req.user.userName}` || ""));
  res.end();
}
lib.createATodo = function(req,res) {
  let user = allUser.find(u=>u.userName==req.user.userName);
  let newUser = user || new User(req.user.userName);
  let todo = newUser.addTodo(req.body.title,req.body.description);
  let items = req.body.item || '';
  if(typeof(items)=='string'){
    todo.addItem(items);
  } else {
    items.forEach((elem)=>todo.addItem(elem));
  }
  if(!user) allUser.unshift(newUser);
  writeJsonFile(res,allUser);
}
lib.getAllTodos = function(req,res) {
  let user = allUser.find(u=>u.userName==req.user.userName);
  res.write(JSON.stringify(user)||"");
  res.end();
}
const toHtmlParagraph = function(text){
  return `<h1>${text}</h1>`;
}
const getButton = function(item,onclickFunction,buttonName){
  return `<button id=${item.getId()} onclick="${onclickFunction}()">${buttonName}</button>`
}

const toHtmlItem = function(item){
  let checkboxStatus = '';
  if(item.status) checkboxStatus = 'checked';
  return `<h3><input type='checkbox' onclick="changeStatus()" id="${item.getId()}" ${checkboxStatus}> 
  <span>${item.getItem()}</span>${getButton(item,'editItem','Edit')}${getButton(item,'deleteItem','Delete')}</h3></hr>`
}

lib.getATodo = function(req,res) {
  let user = allUser.find(u=>u.userName==req.user.userName);
  let todo = user.getSingleTodo(req.cookies.todoId);
  let todoContent = {};
  todoContent.title = toHtmlParagraph("Title:"+todo.getTitle());
  todoContent.description = toHtmlParagraph("Description:"+todo.getDescription());
  todoContent.items = todo.mapItems(toHtmlItem).join('<br>');
  res.write(JSON.stringify(todoContent));
  res.end();
}
lib.deleteTodo = function(req,res) {
  let user = allUser.find(u=>u.userName==req.user.userName);
  user.deleteTodo(req.cookies.todoId);
  writeJsonFile(res,allUser);
}
lib.changeItemStatus = function(req,res){
  let user = allUser.find(u=>u.userName==req.user.userName);
  let todo = user.getSingleTodo(req.cookies.todoId);
  todo.changeItemStatus(req.body.itemId);
  fs.writeFile('./data/todoList.json',JSON.stringify(allUser,null,2),()=>{});
  res.end();
}

lib.deleteItem = function(req,res){
  let user = allUser.find(u=>u.userName==req.user.userName);
  let todo = user.getSingleTodo(req.cookies.todoId);
  todo.removeItem(req.body.itemId);
  fs.writeFile('./data/todoList.json',JSON.stringify(allUser,null,2));
  res.write(JSON.stringify({"itemId":req.body.itemId}),()=>{});
  res.end();
}
lib.editItem = function(req,res) {
  let user = allUser.find(u=>u.userName==req.user.userName);
  let todo = user.getSingleTodo(req.cookies.todoId);
  todo.editItem(req.body.itemId,req.body.newObjective);
  let editedItem = todo.getItem(req.body.itemId);
  fs.writeFile('./data/todoList.json',JSON.stringify(allUser,null,2));
  let response = {};
  response.newItem = toHtmlItem(editedItem)
  response.itemId = req.body.itemId;
  res.setHeader('Content-Type','application/json');
  res.write(JSON.stringify(response));
  res.end()
}

module.exports = lib;
