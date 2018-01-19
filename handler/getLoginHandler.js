const DefaultHandler = require('./defaultHandler.js');
const fs = require('fs');
class GetLoginHandler extends DefaultHandler{
  constructor(loginPagePath) {
    super();
    this.loginPagePath = loginPagePath;
  }
  execute(req,res){
    let file = fs.readFileSync(this.loginPagePath).toString();
    res.write(file.replace('Bad_login',req.cookies.message || ""));
    res.end();
  }
}

module.exports = GetLoginHandler;
