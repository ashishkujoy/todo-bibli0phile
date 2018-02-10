const getElement = function(selector) {
  return document.querySelector(selector);
}

const setInnerHtml = function(selector,html) {
  getElement(selector).innerHTML = html;
}

const appendToInnerHtml = function(selector,html) {
  getElement(selector).innerHTML+=html;
}

const restoreVisibility = function(selector) {
  let element = getElement(selector);
  element.classList.remove("hidden");
}

const hideElement = function(selector) {
  let element = getElement(selector);
  element.classList.add("hidden");
}

const setOnClickFunction = function(selector,callBack) {
  getElement(selector).onclick = callBack;
}

const createElement = function(elementTag) {
  return document.createElement(elementTag);
}

const createButton = function(value,onclickFunction) {
  let button = createElement('input').type = 'button';
  button.value = value;
  button.onclick = onclickFunction;
  return button;
}

const isEmpty = function(inputElement) {
  return inputElement.value.trim()=="";
}
