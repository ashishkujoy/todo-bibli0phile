class TodoItem {
  constructor(id,objective) {
    this.id = id;
    this.objective = objective;
    this._isDone = false;
  }

  getItem(){
    return this.objective;
  }

  editItem(newObjective){
    this.objective = newObjective;
  }

  markAsDone(){
    this._isDone = true;
  }

  markAsUndone(){
    this._isDone = false;
  }
  
  get status(){
    return this._isDone;
  }
  
  getId(){
    return this.id;
  }
  
  changeStatus(){
    this._isDone = !this._isDone;
  }
  
}

module.exports = TodoItem;
