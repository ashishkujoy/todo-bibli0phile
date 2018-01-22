const UserHandler = require('./userHandler.js');

class PostLoginHandler extends UserHandler{
  constructor() {
    super();
  }
  getUser(req){
    return this.getRegisteredUser().find(u=>u.userName==req.body.userName)
  }
  execute(req,res){
    debugger;
    if(!this.getUser(req)) {
      res.setHeader('Set-Cookie',"message=Login Failed; Max-Age=5");
      res.redirect('/login');
      return;
    }
    let sessionid = new Date().getTime();
    res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
    this.getUser(req).session.push(sessionid);
    res.redirect('/home.html');
  }
 }
module.exports = PostLoginHandler;
