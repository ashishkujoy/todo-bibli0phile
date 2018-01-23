class Response {
  constructor(){
    this.text = '';
    this.statusCode = 200;
    this.headers = {};
    this.finished = false;
    this.location = '';
  }

  end(){
    this.finished = true;
  }

  write(text){
    this.text = text;
  }

  setHeader(key,value){
    this.headers[key]=value;
  }

  redirect(location){
    this.statusCode = 302;
    this.location = location;
    this.end();
  }
}
module.exports = Response;
