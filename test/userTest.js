const chai = require('chai');
const assert = chai.assert;
const User = require('../src/user.js');
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
      assert.deepEqual(user,{ userName: 'pallabi',allTodo: {},todoNo: 1 })
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
})
