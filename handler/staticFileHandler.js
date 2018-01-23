const fs = require('fs');
const DefaultHandler = require('./defaultHandler.js');

const getContentType = function(filePath){
  let fileExtension = filePath.slice(filePath.lastIndexOf('.'));
  let contentTypes = {
    '.html':'text/html',
    '.css':'text/css',
    '.js':'text/javascript'
  }
  return contentTypes[fileExtension];
}

class StaticFileHandler extends DefaultHandler{
  constructor(root) {
    super();
    this.root = root;
  }

  getFilePath(url){
    return `./${this.root}${url}`;
  }

  execute(req,res){
    let filePath = this.getFilePath(req.url)
    if(fs.existsSync(filePath)){
      let fileContent = fs.readFileSync(filePath);
      res.setHeader('Content-type',`${getContentType(filePath)}`);
      res.write(fileContent);
      res.end();
    }
  }
  
}
module.exports = StaticFileHandler;
