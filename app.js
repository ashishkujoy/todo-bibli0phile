const WebApp = require('./webapp');
const lib = require('./appLib.js');
const StaticFileHandler = require('./handler/staticFileHandler.js');
const ServeTodoHandler = require('./handler/serveTodoHandler.js');
const CompositeHandler = require('./handler/compositeHandler.js');
const LoginHandler = require('./handler/loginHandler.js');

const staticHandler = new StaticFileHandler('public');
const serveTodoHandler = new ServeTodoHandler();
const compositeHandler = new CompositeHandler();
const loginHandler = new LoginHandler();
compositeHandler.addHandler(loginHandler);
compositeHandler.addHandler(staticHandler);
compositeHandler.addHandler(serveTodoHandler);

const app = WebApp.create();

app.use(lib.logRequest)
app.use(lib.loadUser);
app.use(compositeHandler.getRequestHandler());
app.use(lib.redirectLoggedInUserToHome);

app.get('/todoList',lib.getAllTodos);
app.get('/singletodo',lib.getATodo);
app.get('/login',lib.getLoginPage);
app.get('/logout',lib.logoutUser);
app.post('/login',lib.loginUser);
app.get('/createToDo',lib.getCreateTodoPage);
app.post('/createToDo',lib.createATodo);
app.postUse(compositeHandler.getRequestHandler());
module.exports = app;
