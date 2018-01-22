const assert = require('chai').assert;
const TodoItem = require('../src/todoItem.js');

let todoItem;
beforeEach(()=>todoItem = new TodoItem(1,'this is an item'));

describe('todoItem',function(){
  describe('getItem',function(){
    it('should give the description of the todo item',function(){
      assert.equal(todoItem.getItem(),'this is an item');
    })
  })
  describe('edit item',function(){
    it('should change the description of the todo item',function(){
      todoItem.editItem('it has been edited')
      assert.equal(todoItem.getItem(),'it has been edited');
    })
  })
  describe('markAsDone',function(){
    it('it should set todoItem status as done/true',function(){
      todoItem.markAsDone();
      assert.ok(todoItem.status);
    })
  })
  describe('markAsUndone',function(){
    it('it should set todoItem status as undone/false',function(){
      todoItem.markAsDone();
      assert.ok(todoItem.status);
      todoItem.markAsUndone();
      assert.isNotOk(todoItem.status);
    })
  })
  describe('getId',function(){
    it('should give the id of the todoItem',function(){
      let actual = todoItem.getId();
      assert.equal(actual,1);
    })
  })
  describe('changeStatus',function(){
    it('should reverse the status of the todoItem',function(){
      assert.isNotOk(todoItem.status);
      todoItem.changeStatus();
      assert.ok(todoItem.status);
      todoItem.changeStatus();
      assert.isNotOk(todoItem.status);
    })
  })
})