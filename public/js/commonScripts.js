const sendAjaxRequest = function(method,url,callBack,reqBody){
  var ajax = new XMLHttpRequest();
  ajax.onload=callBack;
  ajax.open(method,url);
  ajax.send(reqBody||'');
}

