const DefaultHandler = require('./defaultHandler.js');

class LoadUserHandler extends DefaultHandler{
  constructor() {
    super();
  }
  getSessionID(req){
    return req.cookies.sessionid;
  }
  getUser(req){
    return this.getRegisteredUser().find(u=>{
      return u.sessionid==this.getSessionID(req);
    });
  }
  execute(req){
    if(this.getSessionID(req) && this.getUser(req)){
      req.user=this.getUser(req);
    }
  }
}
module.exports = LoadUserHandler;
