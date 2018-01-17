const DefaultHandler = require('./defaultHandler.js');

class ServeTodoHandler extends DefaultHandler{
  constructor() {
    super();
  }
  getAction(url){
    return url.split('-').shift();
  }
  getID(url){
    return url.split('-').pop();
  }
  execute(req,res){
    if(this.getAction(req.url)=='/todoId'){
      res.setHeader('Set-Cookie',`todoId=${this.getID(req.url)}`)
      res.redirect('/aTodo.html');
    }
  }
}
module.exports = ServeTodoHandler;
