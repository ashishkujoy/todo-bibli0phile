let getTextBox = function(boxSpaceId) {
  let boxSpace = document.getElementById(boxSpaceId);
  let box = document.createElement('textarea');
  let newLine =document.createElement('br');
  box.name = 'item';
  box.rows = '2';
  box.cols = '80';
  boxSpace.appendChild(box);
  boxSpace.appendChild(newLine);
};
