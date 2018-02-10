const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const lib = require('./appLib.js');
const CompositeHandler = require('./handler/compositeHandler.js');
const LogRequestHandler = require('./handler/logRequestHandler.js');
const LoadUserHandler = require('./handler/loadUserHandler.js');
const LoginHandler = require('./handler/loginHandler.js');
const GetLoginHandler = require('./handler/getLoginHandler.js');
const PostLoginHandler = require('./handler/postLoginHandler.js');
const UserRegistry = require('./src/usersRegistry.js');
let urlList = ['/', '/viewTodo.html', '/logout',  '/todoList', '/createTodo', '/delete', '/edit','/singletodo','/viewTodo.html'];


const compositeHandler = new CompositeHandler();
const logRequestHandler = new LogRequestHandler();
const loadUserHandler = new LoadUserHandler();
const loginHandler = new LoginHandler(urlList);
const getLoginHandler = new GetLoginHandler('./public/login.html');
const postLoginHandler = new PostLoginHandler();

compositeHandler.addHandler(logRequestHandler);
compositeHandler.addHandler(loadUserHandler);
compositeHandler.addHandler(loginHandler);

let todoApp = express.Router({mergeParams:true});
todoApp.use(function(req,res,next){
  if(!req.userName) return res.redirect('/login');
  next();
})
todoApp.get('/:todoId',lib.getTodoPage);
todoApp.post('/:todoId/item/:itemId/changeStatus',lib.changeItemStatus);
todoApp.post('/:todoId/item/:itemId/delete',lib.deleteItem);
todoApp.post('/:todoId/item/:itemId/edit',lib.editItem);
todoApp.post('/:todoId/addNewItem',lib.addNewItem);
todoApp.post('/:todoId/editTitle',lib.editTodoTitle);
todoApp.post('/:todoId/editDescription',lib.editTodoDescription);

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
app.use('/todo',todoApp);
app.get('/todoList',lib.getAllTodos);
app.route('/login')
  .get(getLoginHandler.getRequestHandler())
  .post(postLoginHandler.getRequestHandler());
app.get('/logout',lib.logoutUser);
app.route('/createTodo')
  .get(lib.getCreateTodoPage)
  .post(lib.createATodo);
app.get('/delete',lib.deleteTodo);
app.initialize = function(customFs,sessionManager){
  app.sessionManager = sessionManager;
  app.fs= customFs
  let userRegistry = new UserRegistry(customFs,'./data/todoList.json');
  userRegistry.load();
  app.userRegistry = userRegistry;
}
module.exports = app;
