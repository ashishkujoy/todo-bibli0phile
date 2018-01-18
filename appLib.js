const fs = require('fs');
const User = require('./src/user.js');
const Todo = require('./src/todo.js');
const TodoItem = require('./src/todoItem.js');
const registered_users = [{userName:'pallabi'},{userName:'sayima'}];
let allUser = JSON.parse(fs.readFileSync('./data/todoList.json'));

const giveBehavior = function() {
  if(allUser.length){
    allUser.forEach(user=>{
      user.__proto__ = new User().__proto__;
      let todoIds = Object.keys(user.allTodo);
      todoIds.forEach(todoId=>{
        let todo = user.allTodo[todoId];
        todo.__proto__ = new Todo().__proto__;
        let itemIDs = Object.keys(todo.items);
        itemIDs.forEach(itemId=>{
          todo.items[itemId].__proto__ = new TodoItem().__proto__;
        })
      })
    })
  }
}
giveBehavior();


const writeJsonFile = function(res,userData) {
  fs.writeFile('./data/todoList.json',JSON.stringify(userData,null,2));
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
lib.getATodo = function(req,res) {
  let user = allUser.find(u=>u.userName==req.user.userName);
  todo = user.getSingleTodo(req.cookies.todoId);
  res.write(JSON.stringify(todo));
  res.end();
}
lib.deleteTodo = function(req,res) {
  let user = allUser.find(u=>u.userName==req.user.userName);
  user.deleteTodo(req.cookies.todoId);
  writeJsonFile(res,allUser);
}


module.exports = lib;
