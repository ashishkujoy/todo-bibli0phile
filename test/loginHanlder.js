let LoginHandler = require('../handler/loginHandler.js');
let assert = require('chai').assert;
const Response = require('./customResponse.js');
const allUrl = ['/', '/home.html', '/logout', '/viewToDo', '/todoList', '/aTodo', '/createToDo', '/delete', '/edit','/singletodo']
let loginHandler = new LoginHandler(allUrl);
let res;
beforeEach(function(){
  res = new Response();
})
describe('LoginHandler',function(){
  describe('#execute',function(){
    it('should redirect to /login',function(){
      let req = {url:'/home.html'};
      loginHandler.execute(req,res);
      assert.ok(res.finished);
      assert.equal(res.statusCode,302);
      assert.equal(res.location,'/login');
    })
    it('should not redirect to /login',function(){
      let req = {url:'/home.html',userName:'badman'};
      loginHandler.execute(req,res);
      assert.isNotOk(res.finished);
      assert.equal(res.statusCode,200);
      assert.notEqual(res.location,'/login');
    })
  })
})
