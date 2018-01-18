const DefaultHandler = require('./defaultHandler.js');
const fs = require('fs');
class GetLoginHandler extends DefaultHandler{
  constructor() {
    super();
  }
  execute(req,res){
    let file = fs.readFileSync('./public/login.html').toString();
    res.write(file.replace('Bad_login',req.cookies.message || ""));
    res.end();
  }
}

module.exports = GetLoginHandler;
