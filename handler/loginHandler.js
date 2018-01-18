const DefaultHandler = require('./DefaultHandler.js');

class LoginHandler extends DefaultHandler{
  constructor() {
    super();
    this.allUrl = ['/', '/home.html', '/logout', '/viewToDo', '/todoList', '/aTodo', '/createToDo', '/delete', '/edit','/singletodo'];
  }
  getValid(url){
    return this.allUrl.includes(url);
  }
  execute(req,res){
    if(this.getValid(req.url) && !(req.user)) {
      res.redirect('/login');
      res.end();
    }
  }
}
module.exports = LoginHandler;
