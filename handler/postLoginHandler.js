const UserHandler = require('./userHandler.js');

class PostLoginHandler extends UserHandler{
  constructor() {
    super();
  }

  getUserName(req){
    let user= this.getRegisteredUser().find(u=>u.userName==req.body.userName);
    if(user) return user.userName;
  }

  execute(req,res){
    let userName = this.getUserName(req);
    if(!userName) {
      res.setHeader('Set-Cookie',"message=Login Failed; Max-Age=5");
      res.redirect('/login');
      return;
    }
    let sessionid = req.app.sessionManager.createSession(userName);
    res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
    res.redirect('/viewTodo.html');
  }

 }
module.exports = PostLoginHandler;
