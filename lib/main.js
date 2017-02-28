const DOMNodeCollection = require('./dom_node_collection.js');

const functions = [];

window.$l = function (el) {
  if (typeof el === 'string') {
    const array = [];
    const nodeList = document.querySelectorAll(el);
    nodeList.forEach((el) => array.push(el));
    return new DOMNodeCollection(array);
  } else if (el instanceof HTMLElement){
    return new DOMNodeCollection([el]);
  } else if (typeof el === 'function') {
    if (document.readyState === "complete") {
      el();
    } else {
      functions.push(el);
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  functions.forEach(func => func());
});

window.$l.extend = function(...objects) {
  const result = {};
  objects.forEach((object) => {
    for (let key in object) {
      result[key] = object[key];
    }
  });
  return result;
};

window.$l.ajax = function (options) {
  const defaults = {
    method: 'GET',
    url: window.location.href,
    data: {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    dataType: 'jsonp',
    success: () => {},
    error: () => {}
  };

  options = window.$l.extend(defaults, options);

  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();

    req.open(options.method, options.url);
    req.setRequestHeader('Content-Type', options.contentType);
    req.onload = function () {
      if (req.status >= 200 && req.status < 300) {
        if (options.dataType === 'jsonp') {
          resolve(JSON.parse(req.response));
        } else {
          resolve(req.response);
        }
      } else {
        reject(req.response);
      }
    }
    req.onerror = () => reject(req.response);
    req.send(options.data);
  });
};
