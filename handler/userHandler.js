let registeredUsers = [{userName:'pallabi',session:[]},{userName:'sayima',session:[]}];
class UserHandler {
  constructor() {
    this.registeredUsers = registeredUsers;
  }

  getRegisteredUser(){
    return this.registeredUsers;
  }

  execute(){}

  getRequestHandler(){
    return this.execute.bind(this);
  }

}

module.exports = UserHandler;
