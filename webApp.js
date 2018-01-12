const qs = require('querystring');
const fs = require('fs');
let contentTypes = {
  '.jpg': 'image/jpg',
  '.pdf': 'application/pdf',
  '.gif':'image/gif',
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.txt': 'text/plain',
  '.json':'application/json'
}


const isFile = function(filePath){
  return fs.existsSync(filePath);
}

let getFileContent = function(filePath) {
  return fs.readFileSync(filePath);
}

let showFile = (req,res)=>{
  let filePath = `public${req.url}`
  if(req.method === 'GET' && isFile(filePath)){
    let fileEx = filePath.slice(filePath.lastIndexOf("."));
    res.setHeader('content-type',contentTypes[fileEx]);
    res.write(getFileContent(filePath));
    res.end();
  }
}


const toKeyValue = kv=>{
    let parts = kv.split('=');
    return {key:parts[0].trim(),value:parts[1].trim()};
};
const accumulate = (o,kv)=> {
  o[kv.key] = kv.value;
  return o;
};
const parseBody = text=> qs.parse(text) || {};
const parseCookies = text=> {
  try {
    return text && text.split(';').map(toKeyValue).reduce(accumulate,{}) || {};
  }catch(e){
    return {};
  }
}

let redirect = function(path){
  console.log(`redirecting to ${path}`);
  this.statusCode = 302;
  this.setHeader('location',path);
  this.end();
};
let invoke = function(req,res){
  let handler = this._handlers[req.method][req.url];
  if(!handler){
    return;
  }
  handler(req,res);
}
let urlIsOneOf = function(urls){
  return urls.includes(this.url);
}

const initialize = function(){
  this._handlers = {GET:{},POST:{}};
  this._preprocess = [];
  this._postprocess = [];
};
const get = function(url,handler){
  this._handlers.GET[url] = handler;
}
const post = function(url,handler){
  this._handlers.POST[url] = handler;
};
const use = function(handler){
  this._preprocess.push(handler);
};
const postUse = function(handler){
  this._postprocess.push(handler);
};

const main = function(req,res){
  res.redirect = redirect.bind(res);
  req.urlIsOneOf = urlIsOneOf.bind(req);
  req.cookies = parseCookies(req.headers.cookie||'');
  let content="";
  req.on('data',data=>content+=data.toString())
  req.on('end',()=>{
    req.body = parseBody(content);
    content="";
    this._preprocess.forEach(middleware=>{
      if(res.finished)
        return;
      middleware(req,res);
    });
    if(res.finished)
      return;
    invoke.call(this,req,res);
    this._postprocess.forEach(postprocessor=>{
      if(res.finished)
        return;
      postprocessor(req,res);
    });
    if(!res.finished){
      res.statusCode = 404;
      res.write('File not found!');
      res.end();
    }
  });
};

let create = ()=>{
  let rh = (req,res)=>{
    main.call(rh,req,res)
  };
  initialize.call(rh);
  rh.get = get;
  rh.post = post;
  rh.use = use;
  rh.postUse = postUse;
  rh.showFile=showFile;
  rh.getFileContent = getFileContent;
  return rh;
}
exports.create = create;
