const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const lib = require('./appLib.js');
const ServeTodoHandler = require('./handler/serveTodoHandler.js');
const CompositeHandler = require('./handler/compositeHandler.js');
const LogRequestHandler = require('./handler/logRequestHandler.js');
const LoadUserHandler = require('./handler/loadUserHandler.js');
const LoginHandler = require('./handler/loginHandler.js');
const GetLoginHandler = require('./handler/getLoginHandler.js');
const PostLoginHandler = require('./handler/postLoginHandler.js');
const UserRegistry = require('./src/usersRegistry.js');
let urlList = ['/', '/home.html', '/logout', '/viewTodo', '/todoList', '/todo', '/createToDo', '/delete', '/edit','/singletodo'];
let fs;
let userRegistry; 



const serveTodoHandler = new ServeTodoHandler();
const compositeHandler = new CompositeHandler();
const logRequestHandler = new LogRequestHandler();
const loadUserHandler = new LoadUserHandler();
const loginHandler = new LoginHandler(urlList);
const getLoginHandler = new GetLoginHandler('./public/login.html');
const postLoginHandler = new PostLoginHandler();

compositeHandler.addHandler(logRequestHandler);
compositeHandler.addHandler(loadUserHandler);
compositeHandler.addHandler(loginHandler);

compositeHandler.addHandler(serveTodoHandler);

const staticHandler = express.static('public')

const urlIsOneOf = function(allUrl){
  return allUrl.includes(this.url);
}
app.use(express.urlencoded({extended:false,encoding:"utf8"}))
app.use(function(req,res,next){
  req.urlIsOneOf = urlIsOneOf.bind(req);
  next();
})
app.use(cookieParser());
app.use(compositeHandler.getRequestHandler());
app.use(staticHandler)
app.use(lib.redirectLoggedInUserToHome);
app.get('/todoList',(req,res)=>{
  return lib.getAllTodos(userRegistry,req,res)
});
app.get('/singletodo',(req,res)=>{
  return lib.getATodo(userRegistry,req,res)
});
app.get('/login',getLoginHandler.getRequestHandler());
app.get('/logout',lib.logoutUser);
app.post('/login',postLoginHandler.getRequestHandler());
app.get('/createToDo',(req,res)=>{
  return lib.getCreateTodoPage(fs,req,res)
});
app.post('/createToDo',(req,res)=>{
  return lib.createATodo(userRegistry,req,res)
});
app.get('/delete',(req,res)=>{
  return lib.deleteTodo(userRegistry,req,res)
});
app.post('/changeItemStatus',(req,res)=>{
  return lib.changeItemStatus(userRegistry,req,res)
});
app.post('/deleteItem',(req,res)=>{
  return lib.deleteItem(userRegistry,req,res)
});
app.post('/editItem',(req,res)=>{
  return lib.editItem(userRegistry,req,res)
});
app.post('/addNewItem',(req,res)=>{
  lib.addNewItem(userRegistry,req,res);
})
app.post('/editTodoTitle',(req,res)=>{
  lib.editTodoTitle(userRegistry,req,res);
})
app.post('/editTodoDescription',(req,res)=>{
  lib.editTodoDescription(userRegistry,req,res);
})
app.initialize = function(customFs){
  fs = customFs;
  userRegistry = new UserRegistry(customFs,'./data/todoList.json');
  userRegistry.load();
}
module.exports = app;

