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
app.get('/todoList',lib.getAllTodos);
app.get('/singletodo',lib.getATodo);
app.get('/login',getLoginHandler.getRequestHandler());
app.get('/logout',lib.logoutUser);
app.post('/login',postLoginHandler.getRequestHandler());
app.get('/createToDo',lib.getCreateTodoPage);
app.post('/createToDo',lib.createATodo);
app.get('/delete',lib.deleteTodo);
app.post('/changeItemStatus',lib.changeItemStatus);
app.post('/deleteItem',lib.deleteItem);
app.post('/editItem',lib.editItem);
app.post('/addNewItem',lib.addNewItem);
app.post('/editTodoTitle',lib.editTodoTitle);
app.post('/editTodoDescription',lib.editTodoDescription);
app.initialize = function(customFs,sessionManager){
  app.sessionManager = sessionManager;
  app.fs= customFs
  let userRegistry = new UserRegistry(customFs,'./data/todoList.json');
  userRegistry.load();
  app.userRegistry = userRegistry;
}
module.exports = app;
