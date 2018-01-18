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

const staticHandler = new StaticFileHandler('public');
const serveTodoHandler = new ServeTodoHandler();
const compositeHandler = new CompositeHandler();
const logRequestHandler = new LogRequestHandler();
const loadUserHandler = new LoadUserHandler();
const loginHandler = new LoginHandler();
const getLoginHandler = new GetLoginHandler();
const postLoginHandler = new PostLoginHandler();

compositeHandler.addHandler(logRequestHandler);
compositeHandler.addHandler(loadUserHandler);
compositeHandler.addHandler(loginHandler);
compositeHandler.addHandler(staticHandler);
compositeHandler.addHandler(serveTodoHandler);

const app = WebApp.create();

app.use(compositeHandler.getRequestHandler());
app.use(lib.redirectLoggedInUserToHome);

app.get('/todoList',lib.getAllTodos);
app.get('/singletodo',lib.getATodo);
app.get('/login',getLoginHandler.getRequestHandler());
app.get('/logout',lib.logoutUser);
app.post('/login',postLoginHandler.getRequestHandler());
app.get('/createToDo',lib.getCreateTodoPage);
app.post('/createToDo',lib.createATodo);
app.get('/delete',lib.deleteTodo);
// app.get('/edit',lib.editTodo);
app.postUse(compositeHandler.getRequestHandler());
module.exports = app;
