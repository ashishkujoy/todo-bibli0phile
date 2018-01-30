/* eslint-disable */
const sendAjaxRequest = function(method,url,callBack,reqBody){
  let ajax = new XMLHttpRequest();
  ajax.onload=callBack;
  ajax.open(method,url);
  if(reqBody){
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    return ajax.send(reqBody)
  }
  ajax.send();
}

const getElement = function(selector){
  return document.querySelector(selector);
}

const updateInnerHTML = (selector,html)=>{
  document.querySelector(selector).innerHTML = html;
}

const getInnerText = function(id){
  let element = document.querySelector(`#${id}`);
  return element.innerText;
}

const createInputElement = function(type,value,id){
  let input = document.createElement('input');
  input.type = type;
  input.value = value||'';
  input.id = id||'';
  input.className = 'input';
  return input;
}

const createButton = function(innerText,id,onclickFunc){
  let button = document.createElement('button');
  button.id = id||"";
  button.innerText = innerText;
  button.onclick = onclickFunc;
  return button;
}
