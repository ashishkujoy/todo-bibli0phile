const WebApp = require('./webapp');
const lib = require('./appLib.js');

let app = WebApp.create();

app.use(lib.logRequest)
app.use(lib.loadUser);
app.use(lib.redirectLoggedInUserToHome);
app.use(lib.redirectLoggedOutUserToLogin);

app.get('/todoList',lib.getAllTodos);
app.get('/singletodo',lib.getATodo);
app.get('/login',lib.getLoginPage);
app.get('/logout',lib.logoutUser);
app.post('/login',lib.loginUser);
app.get('/createToDo',lib.getCreateTodoPage);
app.post('/createToDo',lib.createATodo);
app.postUse(lib.serveTodo);
app.postUse(app.showFile);

module.exports = app;
