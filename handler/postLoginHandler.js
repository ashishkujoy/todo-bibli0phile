const DefaultHandler = require('./defaultHandler.js');

class PostLoginHandler extends DefaultHandler{
  constructor() {
    super();
  }
  getUser(req){
    return this.getRegisteredUser().find(u=>u.userName==req.body.userName)
  }
  execute(req,res){
    if(!this.getUser(req)) {
      res.setHeader('Set-Cookie',"message=Login Failed; Max-Age=5");
      res.redirect('/login');
      return;
    }
    let sessionid = new Date().getTime();
    res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
    this.getUser(req).sessionid = sessionid;
    res.redirect('/home.html');
  }
 }
module.exports = PostLoginHandler;
