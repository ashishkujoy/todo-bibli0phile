const chai = require('chai');
const assert = chai.assert;
const User = require('../user.js');
describe('user',()=>{
  describe('#addTodo',()=>{
    it('adding new todo should be added to user allTodo',()=>{
      let user = new User('pallabi');
      user.addTodo('home','washing clothes');
      let expected = { userName: 'pallabi',allTodo:{ '0':{ id: 0,
        title: 'home',description: 'washing clothes',items: {},
        itemNo: 0 } }, todoNo: 1 }
      assert.deepEqual(user,expected);
      user.addTodo('home','sleepng');
      expected= {userName: 'pallabi',allTodo:
   { '0': {id: 0,title: 'home',description: 'washing clothes',
        items: {},itemNo: 0 },
     '1': {id: 1,title: 'home',description: 'sleepng',items: {},
        itemNo: 0 } },todoNo: 2 }
    assert.deepEqual(user,expected);
    })
  })
  describe('#getTodo',()=>{
    it('getTodo should return all the user todos',()=>{
      let user = new User('pallabi');
      assert.deepEqual({},user.getTodo());
      user.addTodo('home','washing clothes');
      let expected = { '0': {id: 0,title: 'home',description: 'washing clothes',items: {},itemNo: 0 } };
      assert.deepEqual(expected,user.getTodo());
    })
  })
  describe('#getSingleTodo',()=>{
    it('it should return a particular todo baased on todoId',()=>{
      let user = new User('pallabi');
      user.addTodo('home','washing clothes');
      user.addTodo('home','sleepng');
      assert.deepEqual(user.getSingleTodo('0'),{id: 0,title: 'home',description: 'washing clothes',items: {},itemNo: 0 });
      assert.deepEqual(user.getSingleTodo('1'),{id: 1,title: 'home',description: 'sleepng',items: {},itemNo: 0 })
    })
  })
  describe('#deleteTodo',()=>{
    it('deleting a Todo should remove the todo from user todos',()=>{
      let user = new User('pallabi');
      user.addTodo('home','washing clothes');
      user.deleteTodo('0');
      assert.deepEqual(user,{ userName: 'pallabi',allTodo: {},todoNo: 0 })
    })
  })
  describe('#addTodoItem',()=>{
    it('this should add item on particular todo',()=>{
      let user = new User('pallabi');
      user.addTodo('home','washing clothes');
      user.addTodoItem('0','buy washing powder');
      let expected = { '0':{ id: 0, objective: 'buy washing powder', _isDone: false } }
      assert.deepEqual(user.allTodo['0'].items,expected);
    })
  })
  describe('#editTodoTitle',()=>{
    it('this should replace the old title with new one',()=>{
      let user = new User('pallabi');
      user.addTodo('home','washing clothes');
      user.editTodoTitle('0','homeWork');
      let expected = {userName: 'pallabi',allTodo:
   { '0': {id: 0,title: 'homeWork',description: 'washing clothes',items: {},
        itemNo: 0 } },todoNo: 1 };
        assert.deepEqual(user,expected);
    })
  })
  describe('#editTodoDescription',()=>{
    it('should replace old description with new one',()=>{
      let user = new User('pallabi');
      user.addTodo('home','washing clothes');
      user.editTodoDescription('0','sleeping');
      let expected ={userName: 'pallabi',allTodo:
   { '0': {id: 0,title: 'home',description: 'sleeping',items: {},
        itemNo: 0 } },todoNo: 1 };
        assert.deepEqual(user,expected);
    })
  })
  describe('#editTodoItem',()=>{
    it('should replace old item with new one',()=>{
      let user = new User('pallabi');
      user.addTodo('home','washing clothes');
      user.addTodoItem('0','buy washing powder');
      user.addTodoItem('0','wash clothes');
      assert.deepEqual(user.allTodo['0'].items,{ '0':{ id: 0, objective: 'buy washing powder', _isDone: false },
  '1':{ id: 1, objective: 'wash clothes', _isDone: false } });
      user.editTodoItem('0','0','wake up');
      assert.deepEqual(user.allTodo['0'].items,{ '0':{ id: 0, objective: 'wake up', _isDone: false },
  '1':{ id: 1, objective: 'wash clothes', _isDone: false } });
    })
  })
  describe('#removeTodoItem',()=>{
    it('should remove particular todo item',()=>{
      let user = new User('pallabi');
      user.addTodo('home','washing clothes');
      user.addTodoItem('0','buy washing powder');
      user.addTodoItem('0','wash clothes');
      user.removeTodoItem('0','1');
      assert.deepEqual(user.allTodo['0'].items,{ '0':{ id: 0, objective: 'buy washing powder', _isDone: false }});
    })
  })
  describe('#getTodoItemStatus',()=>{
    it('should return the present status of particular item',()=>{
      let user = new User('pallabi');
      user.addTodo('home','washing clothes');
      user.addTodoItem('0','buy washing powder');
      assert.isNotOk(user.getTodoItemStatus('0','0'));
    })
  })
  describe('#markTodoItemAsDone',()=>{
    let user = new User('pallabi');
    user.addTodo('home','washing clothes');
    user.addTodoItem('0','buy washing powder');
  })
})
