let fs = require('fs');
const timeStamp = require('./time.js').timeStamp;
const WebApp = require('./webapp');
let registered_users = [{userName:'pallabi'}];
let toS = o=>JSON.stringify(o,null,2);
let toDos = fs.readFileSync('./data/todoList.json');
toDos = JSON.parse(toDos);


let loadUser = (req,res)=>{
  let sessionid = req.cookies.sessionid;
  let user = registered_users.find(u=>u.sessionid==sessionid);
  if(sessionid && user){
    req.user = user;
  }
};


let app = WebApp.create();

let redirectLoggedInUserToHome = (req,res)=>{
  if(req.urlIsOneOf(['/','/login.html']) && req.user) res.redirect('/home.html');
}

let redirectLoggedOutUserToLogin = (req,res)=>{
  if(req.urlIsOneOf(['/home.html','/logout','/viewToDo','/todoList']) && !req.user) res.redirect('/login.html');
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

app.use(logRequest)
app.use(loadUser);
app.use(redirectLoggedInUserToHome);
app.use(redirectLoggedOutUserToLogin);

app.get('/',(req,res)=>{
  res.redirect('./home.html');
})
app.get('/todoList',(req,res)=>{
  res.write(JSON.stringify(toDos));
  res.end();
})
app.post('/viewToDo',(req,res)=>{
  res.setHeader('Set-Cookie',`title=${req.body.title}`);
  res.redirect('/aTodo');
})
app.get('/aTodo',(req,res)=>{
  let title = req.cookies.title;
  let todo = toDos.find(u=>u.title==req.cookies.title);
  let file = app.getFileContent('./aTodo.html').toString();
  file = file.replace('titletodo',todo.title);
  file = file.replace('description',todo.comment)
  res.write(file);
  res.end();
})
app.get('/viewToDo',(req,res)=>{
  res.write(app.getFileContent('./viewToDo.html'));
  res.end();
})
app.get('/login.html',(req,res)=>{
  res.setHeader('Content-Type','text/html');
  let file = app.getFileContent('./login.html').toString();
  file = file.replace('Bad_login',req.cookies.message || "")
  res.write(file);
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
  file = file.replace('username',`${req.user.userName}` || "");
  res.write(file);
  res.end();
})
app.post('/createToDo',(req,res)=>{
  let date = new Date();
  let comments= { date: date.toLocaleString(),
    name:req.user.userName,
    title:req.body.title,
    comment:req.body.todoitem
  }
  toDos.unshift(comments);
  fs.writeFile('./data/todoList.json',JSON.stringify(toDos,null,2));
  res.redirect('/viewToDo');
  res.end();
})
app.get('/delete',(req,res)=>{
  console.log(req.cookies.title);
  let todo = toDos.filter(function(el){
    return el.title != req.cookies.title;
  });
  toDos = todo;
  fs.writeFile('./data/todoList.json',JSON.stringify(toDos,null,2));
  res.redirect('/viewToDo');
  res.end();
})

app.postUse(app.showFile);

module.exports = app;
