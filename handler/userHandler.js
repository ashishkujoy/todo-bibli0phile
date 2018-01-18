let registered_users = [{userName:'pallabi'},{userName:'sayima'}];
class UserHandler {
  constructor() {
    this.registered_users = registered_users;
  }
  getRegisteredUser(){
    return this.registered_users;
  }
  execute(){}
  getRequestHandler(){
    return this.execute.bind(this);
  }
}

module.exports = UserHandler;
