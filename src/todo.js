const TodoItem = require('./todoItem.js');

class Todo {
  constructor(id,title,description) {
    this.id = id
    this.title=title;
    this.description=description || "";
    this.items ={};
    this.itemNo = 0;
  }
  addItem(objective){
    let item = new TodoItem(this.itemNo,objective);
    this.items[this.itemNo] = item;
    this.itemNo++;
  }
  getTitle(){
    return this.title;
  }
  getDescription(){
    return this.description;
  }
  getItem(itemNo){
    return this.items[itemNo].getItem();
  }
  editTitle(newTitle){
    this.title = newTitle;
  }
  editDescription(newDescription){
    this.description = newDescription;
  }
  editItem(itemNo,newObjective){
    this.items[itemNo].editItem(newObjective);
  }
  removeItem(itemNo){
    delete this.items[itemNo];
    this.itemNo--;
  }
  markItemAsDone(itemNo){
    this.items[itemNo].markAsDone();
  }
  markItemAsUndone(itemNo){
    this.items[itemNo].markAsUndone();
  }
  getItemStatus(itemNo){
    return this.items[itemNo].status;
  }
}

module.exports = Todo;
