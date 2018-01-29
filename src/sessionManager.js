const defaultIDGenerator = function(){
  return new Date().getTime();
}


class SessionManager{
  constructor(idGenerator){
    this.sessions ={};
    this.idGenerator = idGenerator || defaultIDGenerator();
  }

  getSessionID(){
    return this.idGenerator();
  }

  createSession(userName){
    let sessionid = this.getSessionID();
    this.sessions[sessionid]=userName;
    return sessionid;
  }

  deleteSession(sessionid){
    delete this.sessions[sessionid];
  }

  isLoggedin(sessionid){
    return sessionid in this.sessions;
  }

  getUserName(sessionid){
    return this.sessions[sessionid];
  }
}
module.exports = SessionManager;
