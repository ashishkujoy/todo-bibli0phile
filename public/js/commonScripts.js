/* eslint-disable */
const sendAjaxRequest = function(method,url,callBack,reqBody){
  let ajax = new XMLHttpRequest();
  ajax.onload=callBack;
  ajax.open(method,url);
  ajax.send(reqBody||'');
}

