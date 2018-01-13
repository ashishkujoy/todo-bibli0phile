class User {
  constructor(name){
    this.userName= name;
    this.todoList=[];
  }
  addTodo(todo) {
    this.todoList.unshift(todo);
  }
}

module.exports = User;
