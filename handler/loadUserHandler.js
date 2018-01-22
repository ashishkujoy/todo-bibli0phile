const UserHandler = require('./userHandler.js');

class LoadUserHandler extends UserHandler{
  constructor() {
    super();
  }
  getSessionID(req){
    return req.cookies.sessionid;
  }
  getUser(req){
    return this.getRegisteredUser().find(u=>{
      return u.session.includes(+this.getSessionID(req));
    });
  }
  execute(req){
    if(this.getSessionID(req) && this.getUser(req)){
      req.user=this.getUser(req);
    }
  }
}
module.exports = LoadUserHandler;
