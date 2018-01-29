const DefaultHandler = require('./defaultHandler.js');
class GetLoginHandler extends DefaultHandler{
  constructor(loginPagePath) {
    super();
    this.loginPagePath = loginPagePath;
  }

  execute(req,res){
    let file = req.app.fs.readFileSync(this.loginPagePath,'utf8');
    res.set('Content-Type','text/html')
    res.send(file.replace('Bad_login',req.cookies.message || ""));
  }

}

module.exports = GetLoginHandler;
