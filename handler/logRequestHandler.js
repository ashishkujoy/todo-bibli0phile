const DefaultHandler = require('./defaultHandler.js');
const timeStamp = require('../time.js').timeStamp;
const toS = o=>JSON.stringify(o,null,2);

class LogRequestHandler extends DefaultHandler {
  constructor() {
    super();
  }

  execute(req,res,next){
    let text = ['------------------------------',
      `${timeStamp()}`,
      `${req.method} ${req.url}`,
      `HEADERS=> ${toS(req.headers)}`,
      `COOKIES=> ${toS(req.cookies)}`,
      `BODY=> ${toS(req.body)}`,''].join('\n');
    req.app.fs.appendFile('request.log',text,()=>{});
    console.log(`${req.method} ${req.url}`);
    next()
  }

}
module.exports = LogRequestHandler;
