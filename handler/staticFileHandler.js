const fs = require('fs');
const DefaultHandler = require('./defaultHandler.js');

class StaticFileHandler extends DefaultHandler{
  constructor(root) {
    super();
    this.root = root;
  }
  getFilePath(req){
    return `./${this.root}${req.url}`;
  }
  execute(req,res){
    if(fs.existsSync(this.getFilePath())){
      let fileContent = fs.readFileSync(this.getFilePath());
      res.write(fileContent);
      res.end();
    }
  }
}
module.exports = StaticFileHandler;
