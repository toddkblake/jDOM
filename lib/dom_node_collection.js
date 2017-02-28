class DOMNodeCollection {
  constructor(array) {
    this.HTMLElements = array;
  }

  addClass(className) {
    this.HTMLElements.forEach(el => el.classList.add(className));
  }

  append(object) {
    if (object instanceof DOMNodeCollection) {
      object.HTMLElements.forEach(el => this.append(el));
    } else if (object instanceof HTMLElement) {
      this.HTMLElements.forEach(el => el.appendChild(object));
    } else {
      this.HTMLElements.forEach(el => el.innerHTML += object);
    }
  }

  attr(attributeName, value) {
    if (value) {
      this.HTMLElements.forEach((el) => {
        el.setAttribute(attributeName, value);
      });
    } else {
      this.HTMLElements[0].getAttribute(attributeName);
    }
  }

  children() {
    const children = [];
    this.HTMLElements.forEach((el) => {
      const elChildren = el.children;

      for (let i = 0; i < elChildren.length; i++) {
        const childEl = elChildren[i];
        children.push(childEl);
      }
    });

    return new DOMNodeCollection(children);
  }

  empty() {
    this.HTMLElements.forEach(el => el.innerHTML = "");
  }

  find(selector) {
    let results = [];
    this.HTMLElements.forEach((el) => {
      const nodeList = el.querySelectorAll(selector);
      nodeList.forEach(el => results.push(el));
    });

    return new DOMNodeCollection(results);
  }

  html(string) {
    if (string) {
      this.HTMLElements.forEach(el => el.innerHTML = string);
    } else {
      return this.HTMLElements[0].innerHTML;
    }
  }

  off(eventType, callback) {
    if (!callback) callback = this.callback;
    this.HTMLElements.forEach((el) => {
      el.removeEventListener(eventType, callback);
    });
  }

  on(eventType, callback) {
    this.HTMLElements.forEach((el) => {
      this.callback = callback;
      el.addEventListener(eventType, callback);
    });
  }

  parent() {
    const parents = [];
    this.HTMLElements.forEach((el) => {
      parents.push(el.parentNode);
    });

    return new DOMNodeCollection(parents);
  }

  remove(selector) {
    this.HTMLElements.forEach((el, i) => {
      el.remove();
      this.HTMLElements.splice(i, 1);
    });
  }

  removeClass(className) {
    this.HTMLElements.forEach((el) => {
      if (el.classList.contains(className)) {
        el.classList.remove(className);
      }
    });
  }
}

module.exports = DOMNodeCollection;
