const fs = require('fs');
const timeStamp = require('./time.js').timeStamp;
const User = require('./src/user.js');
const Todo = require('./src/todo.js');
const registered_users = [{userName:'pallabi'},{userName:'sayima'}];
let allUser = JSON.parse(fs.readFileSync('./data/todoList.json'));
const toS = o=>JSON.stringify(o,null,2);
const urlList=['/', '/home.html', '/logout', '/viewToDo', '/todoList', '/aTodo', '/createToDo', '/delete', '/edit'];

const writeJsonFile = function(res,userData) {
  fs.writeFile('./data/todoList.json',JSON.stringify(userData,null,2));
  res.redirect('/viewToDo.html');
  res.end();
}
const removeOlderFile = function(folder,username) {
  return folder.filter(u=>u.userName!=username);
}
lib = {};
lib.redirectLoggedInUserToHome = (req,res)=>{
  if(req.urlIsOneOf(['/','/login']) && req.user) res.redirect('/home.html');
}
lib.redirectLoggedOutUserToLogin = (req,res)=>{
  if(req.urlIsOneOf(urlList) && !req.user) res.redirect('/login');
}
lib.logRequest = (req,res)=>{
  let text = ['------------------------------',
    `${timeStamp()}`,
    `${req.method} ${req.url}`,
    `HEADERS=> ${toS(req.headers)}`,
    `COOKIES=> ${toS(req.cookies)}`,
    `BODY=> ${toS(req.body)}`,''].join('\n');
  fs.appendFile('request.log',text,()=>{});
  console.log(`${req.method} ${req.url}`);
}
lib.loadUser = (req,res)=>{
  let sessionid = req.cookies.sessionid;
  let user = registered_users.find(u=>u.sessionid==sessionid);
  if(sessionid && user){
    req.user = user;
  }
};
lib.loginUser = function(req,res) {
  let user = registered_users.find(u=>u.userName==req.body.userName);
  if(!user) {
    res.setHeader('Set-Cookie',"message=Login Failed; Max-Age=5");
    res.redirect('/login');
    return;
  }
  let sessionid = new Date().getTime();
  res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
  user.sessionid = sessionid;
  res.redirect('/home.html');
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
  let items = req.body.item;
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
lib.getLoginPage = function(req,res) {
  let file = fs.readFileSync('./public/login.html').toString();
  res.write(file.replace('Bad_login',req.cookies.message || ""));
  res.end();
}
lib.serveTodo = function(req,res) {
  let todoId = req.url.split('-').pop();
  let action = req.url.split('-').shift();
  if(action=='/todoId'){
    res.setHeader('Set-Cookie',`todoId=${todoId}`)
    res.redirect('/aTodo.html');
  }
}

module.exports = lib;
