const fs = require('fs');
const DefaultHandler = require('./defaultHandler.js');

class StaticFileHandler extends DefaultHandler{
  constructor(root) {
    super();
    this.root = root;
  }
  getFilePath(url){
    return `./${this.root}${url}`;
  }
  execute(req,res){
    if(fs.existsSync(this.getFilePath(req.url))){
      let fileContent = fs.readFileSync(this.getFilePath(req.url));
      res.write(fileContent);
      res.end();
    }
  }
}
module.exports = StaticFileHandler;
