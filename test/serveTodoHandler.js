const ServeTodoHandler = require('../handler/serveTodoHandler.js');
const assert = require('chai').assert;

let serverTodoHandler = new ServeTodoHandler();
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
})