const DefaultHandler = require('./defaultHandler.js');
const fs = require('fs');
const timeStamp = require('../time.js').timeStamp;
const toS = o=>JSON.stringify(o,null,2);

class LogRequestHandler extends DefaultHandler {
  constructor() {
    super();
  }

  execute(req){
    let text = ['------------------------------',
      `${timeStamp()}`,
      `${req.method} ${req.url}`,
      `HEADERS=> ${toS(req.headers)}`,
      `COOKIES=> ${toS(req.cookies)}`,
      `BODY=> ${toS(req.body)}`,''].join('\n');
    fs.appendFile('request.log',text,()=>{});
    console.log(`${req.method} ${req.url}`);
  }

}
module.exports = LogRequestHandler;
