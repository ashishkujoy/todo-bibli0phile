const DefaultHandler = require('./defaultHandler.js');
const fs = require('fs');
class GetLoginHandler extends DefaultHandler{
  constructor(loginPagePath) {
    super();
    this.loginPagePath = loginPagePath;
  }

  execute(req,res){
    let file = fs.readFileSync(this.loginPagePath,'utf8');
    res.set('Content-Type','text/html')
    res.send(file.replace('Bad_login',req.cookies.message || ""));
  }
  
}

module.exports = GetLoginHandler;
