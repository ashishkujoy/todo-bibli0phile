const DefaultHandler = require('./DefaultHandler.js');

class LoginHandler extends DefaultHandler{
  constructor() {
    super();
    this.allUrl = ['/', '/home.html', '/logout', '/viewToDo', '/todoList', '/aTodo', '/createToDo', '/delete', '/edit'];
    // this.users = [{userName:"pallabi"}];
  }
  getValid(url){
    return this.allUrl.includes(url);
  }
  // getUser(user){
  //   return user;
  // }
  execute(req,res){
    if(this.getValid(req.url) && !(req.user)) {
      res.redirect('/login');
      res.end();
    }
  }
}
module.exports = LoginHandler;
