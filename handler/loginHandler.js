const DefaultHandler = require('./DefaultHandler.js');

class LoginHandler extends DefaultHandler{
  constructor(allUrl) {
    super();
    this.allUrl = allUrl;
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
