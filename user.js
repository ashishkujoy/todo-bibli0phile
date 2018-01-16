const Todo = require('./todo.js');
class User {
  constructor(name){
    this.userName= name;
    this.allTodo={};
    this.todoNo = 0;
  }
  getTodo(){
    return this.allTodo;
  }
  getSingleTodo(todoId){
    return this.allTodo[todoId];
  }
  addTodo(title,description) {
    let todo = new Todo(this.todoNo,title,description);
    this.allTodo[this.todoNo] = todo;
    this.todoNo++;
  }
  deleteTodo(todoId) {
    delete this.allTodo[todoId];
    this.todoNo--;
  }
  addTodoItem(todoId,item){
    let todo=this.allTodo[todoId];
    return todo.addItem(item);
  }
  editTodoTitle(todoId,newTitle){
    this.allTodo[todoId].editTitle(newTitle);
  }
  editTodoDescription(todoId,newDescription) {
    this.allTodo[todoId].editDescription(newDescription);
  }
  removeTodoItem(todoId,itemNo){
    this.allTodo[todoId].removeItem(itemNo);
  }
  editTodoItem(todoId,itemNo,newItem){
    this.allTodo[todoId].editItem(itemNo,newItem);
  }
  getTodoItemStatus(todoId,itemNo){
    return this.allTodo[todoId].getItemStatus(itemNo);
  }
  markTodoItemAsDone(todoId,itemNo){
    this.allTodo[todoId].markItemAsDone(itemNo);
  }
  markTodoItemAsUndone(todoId,itemNo){
    this.allTodo[todoId].markItemAsUndone(itemNo);
  }
}

module.exports = User;
