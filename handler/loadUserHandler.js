const UserHandler = require('./userHandler.js');

class LoadUserHandler extends UserHandler{
  constructor() {
    super();
  }

  getSessionID(req){
    return req.cookies.sessionid;
  }

  execute(req,res,next){
    let sessionManager = req.app.sessionManager;
    let sessionid = this.getSessionID(req);
    if(sessionManager.isLoggedin(sessionid)){
      req.userName=sessionManager.getUserName(sessionid);
    }
    next()
  }

}
module.exports = LoadUserHandler;
