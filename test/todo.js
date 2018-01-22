const assert = require('chai').assert;
const Todo = require('../src/todo.js');
const TodoItem = require('../src/todoItem.js');

let todo;
beforeEach(function(){
  todo = new Todo(1,'testing','this is description');
})

describe('Todo',function(){
  describe('addItem',function(){
    it('should add a item to the todo',function(){
      todo.addItem('testing item');
      let actual = todo.items;
      let expected = {0:new TodoItem(0,'testing item')};
      assert.deepEqual(actual,expected);
    })
  })
  describe('getALlItems',function(){
    it('should give all items of the todo',function(){
      assert.deepEqual(todo.getAllItems(),[]);
      todo.addItem('testing1');
      let expected = [new TodoItem(0,'testing1')];
      assert.deepEqual(todo.getAllItems(),expected);
      todo.addItem('testing2');
      expected.push(new TodoItem(1,'testing2'));
      assert.deepEqual(todo.getAllItems(),expected);
    })
  })
  describe('getTitle',function(){
    it('should return the title of the todo',function(){
      assert.equal(todo.getTitle(),'testing');
    })
  })
  describe('getDescription',function(){
    it('should return the description of the todo',function(){
      assert.equal(todo.getDescription(),'this is description');
    })
  })
  describe('editTitle',function(){
    it('should set given title as title of the todo',function(){
      assert.equal(todo.getTitle(),'testing');
      todo.editTitle('testing edit title');
      assert.equal(todo.getTitle(),'testing edit title');
    })
  })
  describe('editDescription',function(){
    it('should set given description as description of the todo',function(){
      assert.equal(todo.getDescription(),'this is description');
      todo.editDescription('testing edit description');
      assert.equal(todo.getDescription(),'testing edit description');
    })
  })
  describe('getItem',function(){
    it('should return undefined if their is no item in todo with given item id',function(){
      assert.isUndefined(todo.getItem(100));
      assert.isUndefined(todo.getItem(-100));
    })
    it('should give the item of given id if it is present in it',function(){
      let itemId=todo.addItem('item1');
      assert.deepEqual(todo.getItem(itemId),new TodoItem(itemId,'item1'));
      todo.addItem('item2');
      assert.deepEqual(todo.getItem(1),new TodoItem(1,'item2'));
    })
  })
  describe('editItem',function(){
    it('should change the title of item of todo',function(){
      let itemId=todo.addItem('item1');
      assert.deepEqual(todo.getItem(itemId),new TodoItem(itemId,'item1'));
      todo.editItem(itemId,'item edited');
      assert.deepEqual(todo.getItem(itemId),new TodoItem(itemId,'item edited'));
    })
  })
  describe('removeItem',function(){
    it('should delete the item of given id from the todo',function(){
      let itemId=todo.addItem('item1');
      assert.deepEqual(todo.getItem(itemId),new TodoItem(itemId,'item1'));
      todo.removeItem(itemId);
      assert.isUndefined(todo.getItem(itemId));
    })
  })
  describe('markItemAsDone',function(){
    it('should mark a item of todo as done',function(){
      let itemId=todo.addItem('item1');
      assert.isNotOk(todo.getItem(itemId).status);
      todo.markItemAsDone(itemId);
      assert.ok(todo.getItem(itemId).status);
    })
  })
  describe('markItemAsUndone',function(){
    it('should mark a item of todo as undone',function(){
      let itemId=todo.addItem('item1');
      assert.isNotOk(todo.getItem(itemId).status);
      todo.markItemAsDone(itemId);
      assert.ok(todo.getItem(itemId).status);
      todo.markItemAsUndone(itemId);
      assert.isNotOk(todo.getItem(itemId).status);
    })
  })
  describe('getItemStatus',function(){
    it('should give the status of a specified item',function(){
      let itemId=todo.addItem('item1');
      assert.isNotOk(todo.getItemStatus(itemId));
      todo.markItemAsDone(itemId);
      assert.ok(todo.getItemStatus(itemId));
    })
  })
  describe('changeItemStatus',function(){
    it('should change the status of item of specified id',function(){
      let itemId1=todo.addItem('item1');
      let itemId2=todo.addItem('item2');
      assert.isNotOk(todo.getItemStatus(itemId1));
      todo.changeItemStatus(itemId1);
      assert.ok(todo.getItemStatus(itemId1));
      todo.changeItemStatus(itemId2);
      assert.ok(todo.getItemStatus(itemId2));
    })
  })
})