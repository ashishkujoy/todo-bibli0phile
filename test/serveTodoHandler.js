const ServeTodoHandler = require('../handler/serveTodoHandler.js');
const assert = require('chai').assert;
const Response = require('./customResponse.js');
let serverTodoHandler = new ServeTodoHandler();
let res;
beforeEach(function(){
  res = new Response();
})
describe('serverTodoHandler',function(){
  describe('getAction',function(){
    it('should give name of action to be taken based on url',function(){
      let actual = serverTodoHandler.getAction('/editTodo-09');
      let expected = '/editTodo';
      assert.equal(actual,expected);
    })
  })
  describe('getID',function(){
    it('should extract the id of todo from the url',function(){
      let actual = serverTodoHandler.getID('/editTodo-9');
      let expected = '9';
      assert.equal(actual,expected);
    })
  })
  describe('execute',function(){
    it('should redirect to aTodo.html',function(){
      let req = {url:'/todoId-23'};
      serverTodoHandler.execute(req,res);
      assert.equal(res.statusCode,302)
      assert.equal(res.location,'/todo.html');
      assert.ok(res.finished);
    })
    it('should not redirect to aTodo.html and should not end response',function(){
      let req = {url:'/todoItem-45'};
      serverTodoHandler.execute(req,res);
      assert.isNotOk(res.finished);      

    })
  })
})