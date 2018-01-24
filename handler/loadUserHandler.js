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
      return u.session.includes(Number(this.getSessionID(req)));
    });
  }

  execute(req,res,next){
    if(this.getSessionID(req) && this.getUser(req)){
      req.user=this.getUser(req);
    }
    next()
  }

}
module.exports = LoadUserHandler;
