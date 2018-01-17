const DefaultHandler = require('./defaultHandler.js');

class CustomHandler extends DefaultHandler {
  constructor() {
    super();
    this.allHandlers =[];
  }
  addHandler(handler){
    this.allHandlers.push(handler);
  }
  execute(req,res){
    this.allHandlers.forEach(handler=>execute(req,res));
  }
}
