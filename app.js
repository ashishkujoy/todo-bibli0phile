let fs = require('fs');
const timeStamp = require('./time.js').timeStamp;
const WebApp = require('./webapp');
let registered_users = [{userName:'pallabi'},{userName:'sayima'}];
let toS = o=>JSON.stringify(o,null,2);
let toDos = fs.readFileSync('./data/todoList.json');
toDos = JSON.parse(toDos);
let urlList=['/home.html','/logout','/viewToDo','/todoList','/aTodo','/createToDo','/delete','/edit'];
const User= function(username) {
  this.userName=username;
  this.todoList =[];
}
const ToDo = function(date,title,items) {
  this.date = date
  this.title = title;
  this.item = items;
}
const writeJsonFile = function(res,toDoList) {
  fs.writeFile('./data/todoList.json',JSON.stringify(toDoList,null,2));
  res.redirect('/viewToDo');
  res.end();
}
const isNotValidTodo = function(req,user) {
  return user.todoList.find(u=>u.title==req.body.title);
}

let loadUser = (req,res)=>{
  let sessionid = req.cookies.sessionid;
  let user = registered_users.find(u=>u.sessionid==sessionid);
  if(sessionid && user){
    req.user = user;
  }
};
let redirectLoggedInUserToHome = (req,res)=>{
  if(req.urlIsOneOf(['/','/login.html']) && req.user) res.redirect('/home.html');
}
let redirectLoggedOutUserToLogin = (req,res)=>{
  if(req.urlIsOneOf(urlList) && !req.user) res.redirect('/login.html');
}
let logRequest = (req,res)=>{
  let text = ['------------------------------',
    `${timeStamp()}`,
    `${req.method} ${req.url}`,
    `HEADERS=> ${toS(req.headers)}`,
    `COOKIES=> ${toS(req.cookies)}`,
    `BODY=> ${toS(req.body)}`,''].join('\n');
  fs.appendFile('request.log',text,()=>{});
  console.log(`${req.method} ${req.url}`);
}
let app = WebApp.create();

app.use(logRequest)
app.use(loadUser);
app.use(redirectLoggedInUserToHome);
app.use(redirectLoggedOutUserToLogin);

app.get('/',(req,res)=>{
  res.redirect('./home.html');
})
app.get('/todoList',(req,res)=>{
  let user = toDos.find(u=>u.userName==req.user.userName);
  res.write(JSON.stringify(user));
  res.end();
})
app.post('/viewToDo',(req,res)=>{
  res.setHeader('Set-Cookie',`title=${req.body.title}`);
  res.redirect('/aTodo');
})
app.get('/aTodo',(req,res)=>{
  let user = toDos.find(u=>u.userName==req.user.userName);
  let title = req.cookies.title;
  let todo = user.todoList.find(u=>u.title==req.cookies.title);
  let file = app.getFileContent('./aTodo.html').toString();
  file = file.replace('titletodo',todo.title);
  file = file.replace('description',todo.item);
  res.write(file);
  res.end();
})
app.get('/viewToDo',(req,res)=>{
  let file = app.getFileContent('./viewToDo.html').toString();
  res.write(file.replace('existingFile',req.cookies.msg || ""));
  res.end();
})
app.get('/login.html',(req,res)=>{
  let file = app.getFileContent('./login.html').toString();
  res.write(file.replace('Bad_login',req.cookies.message || ""));
  res.end();
})
app.get('/logout',(req,res)=>{
  res.setHeader('Set-Cookie',[`sessionid=0,Expires=${new Date(1).toUTCString()}`]);
  delete req.user.sessionid;
  res.redirect('/login.html');
});
app.post('/login.html',(req,res)=>{
  let user = registered_users.find(u=>u.userName==req.body.userName);
  if(!user) {
    res.setHeader('Set-Cookie',"message=Login Failed; Max-Age=5");
    res.redirect('/login.html');
    return;
  }
  let sessionid = new Date().getTime();
  res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
  user.sessionid = sessionid;
  res.redirect('/home.html');
});
app.get('/createToDo',(req,res)=>{
  let file = app.getFileContent('./createToDo.html').toString();
  res.write(file.replace('username',`${req.user.userName}` || ""));
  res.end();
})
app.post('/createToDo',(req,res)=>{
  let date = new Date();
  date= date.toLocaleString();
  let user = toDos.find(u=>u.userName==req.user.userName);
  if(!user)
    user = new User(req.user.userName);
  let userTodo = new ToDo(date,req.body.title,req.body.todoitem);
  if(isNotValidTodo(req,user)){
    res.setHeader('Set-Cookie',"msg=File already Exists; Max-Age=5");
    res.redirect('/viewToDo');
    return;
  }
  let userInfo =  user.todoList.unshift(userTodo);
  toDos.unshift(user);
  writeJsonFile(res,toDos);
})
// app.get('/delete',(req,res)=>{
//   let todo = toDos.filter(function(el){
//     return el.title != req.cookies.title;
//   });
//   delete req.cookies.title;
//   toDos = todo;
//   writeJsonFile(res,toDos);
// })
// app.get('/edit',(req,res)=>{
//   let file= app.getFileContent('./edit.html').toString();
//   let todo = toDos.find(function(el){
//     return el.title == req.cookies.title;
//   });
//   file=file.replace('editabletitle',todo.title);
//   file=file.replace('editabledescription',todo.comment);
//   res.write(file);
//   res.end();
// })
// app.post('/edit',(req,res)=>{
//   let date = new Date();
//   let todo = toDos.filter(function(el){
//     return el.title != req.cookies.title;
//   });
//   let comments= { date: date.toLocaleString(),
//     name:req.user.userName,
//     title:req.body.title,
//     comment:req.body.todoitem
//   }
//   todo.unshift(comments);
//   toDos=todo;
//   writeJsonFile(res,toDos);
// });
app.postUse(app.showFile);

module.exports = app;
