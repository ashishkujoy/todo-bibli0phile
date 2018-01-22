const WebApp = require('./webapp');
const lib = require('./appLib.js');
const StaticFileHandler = require('./handler/staticFileHandler.js');
const ServeTodoHandler = require('./handler/serveTodoHandler.js');
const CompositeHandler = require('./handler/compositeHandler.js');
const LogRequestHandler = require('./handler/logRequestHandler.js');
const LoadUserHandler = require('./handler/loadUserHandler.js');
const LoginHandler = require('./handler/loginHandler.js');
const GetLoginHandler = require('./handler/getLoginHandler.js');
const PostLoginHandler = require('./handler/postLoginHandler.js');
const UserRegistry = require('./src/usersRegistry.js');
let urlList = ['/', '/home.html', '/logout', '/viewToDo', '/todoList', '/aTodo', '/createToDo', '/delete', '/edit','/singletodo'];
let fs;
let userRegistry; 


const staticHandler = new StaticFileHandler('public');
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
compositeHandler.addHandler(staticHandler);
compositeHandler.addHandler(serveTodoHandler);

const app = WebApp.create();

app.use(compositeHandler.getRequestHandler());
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
app.postUse(compositeHandler.getRequestHandler());
app.initialize = function(customFs){
  fs = customFs;
  userRegistry = new UserRegistry(customFs,'./data/todoList.json');
  userRegistry.load();
}
module.exports = app;
