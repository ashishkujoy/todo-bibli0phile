const chai = require('chai');
const assert = chai.assert;
const User = require('../src/user.js');
const Todo = require('../src/todo.js');
describe('user',()=>{
  describe('#addTodo',()=>{
    it('it should add a todo in allTodos',()=>{
      let user = new User('pallabi');
      let actual = user.addTodo('home','washing clothes');
      let expected = new Todo(0,'home','washing clothes');
      assert.deepEqual(actual,expected);
      actual=user.addTodo('home','sleepng');
      expected = new Todo(1,'home','sleepng');
      assert.deepEqual(actual,expected);
    })
  })
  describe('#getTodo',()=>{
    it('getTodo should return all the user todos',()=>{
      let user = new User('pallabi');
      assert.deepEqual({},user.getTodo());
      user.addTodo('home','washing clothes');
      let expected = {'0': new Todo(0,'home','washing clothes')};
      assert.deepEqual(expected,user.getTodo());
    })
  })
  describe('#getSingleTodo',()=>{
    it('it should return a particular todo baased on todoId',()=>{
      let user = new User('pallabi');
      user.addTodo('home','washing clothes');
      user.addTodo('home','sleeping');
      assert.deepEqual(user.getSingleTodo('0'),new Todo(0,'home','washing clothes'));
      assert.deepEqual(user.getSingleTodo('1'),new Todo(1,'home','sleeping'))
    })
  })
  describe('#deleteTodo',()=>{
    it('deleting a Todo should remove the todo from user todos',()=>{
      let user = new User('pallabi');
      user.addTodo('home','washing clothes');
      user.deleteTodo('0');
      assert.deepEqual(user,{userName: 'pallabi',allTodo: {},todoNo: 1})
    })
  })
  describe('#editTodoTitle',()=>{
    it('this should replace the old title with new one',()=>{
      let user = new User('pallabi');
      user.addTodo('home','washing clothes');
      assert.deepEqual(user.getSingleTodo(0),new Todo(0,'home','washing clothes'))
      user.editTodoTitle('0','homeWork');
      assert.deepEqual(user.getSingleTodo(0),new Todo(0,'homeWork','washing clothes'))
    })
  })
  describe('#editTodoDescription',()=>{
    it('should replace old description with new one',()=>{
      let user = new User('pallabi');
      user.addTodo('home','washing clothes');
      assert.deepEqual(user.getSingleTodo(0),new Todo(0,'home','washing clothes'));
      user.editTodoDescription('0','sleeping');
      assert.deepEqual(user.getSingleTodo(0),new Todo(0,'home','sleeping'));
    })
  })
})
