/* eslint-disable */
let getTextBox = function(boxSpaceId) {
  let boxSpace = document.getElementById(boxSpaceId);
  let box = document.createElement('textarea');
  let newLine =document.createElement('br');
  box.name = 'item';
  box.rows = '2';
  box.cols = '80';
  box.className = 'item_title_input';
  boxSpace.appendChild(box);
  boxSpace.appendChild(newLine);
};


const addEventListener = function(){
  let addButton = getElement('#addButton');
  addButton.onclick = function(){
    getTextBox('addItem');
  }
  let cancel = getElement('#cancel')
  cancel.onclick = function(){
    return redirectTo('viewTodo.html')
  };
};
window.onload = addEventListener;
