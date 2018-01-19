// let registered_users = [{userName:'pallabi'},{userName:'sayima'}];
const fs = require('fs');
const registered_users = JSON.parse(fs.readFileSync('./data/user.json'));
class UserHandler {
  constructor(fs) {
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
