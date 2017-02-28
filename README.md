# jDOM

jDOM is a lightweight JavaScript library to manage DOM manipulation, AJAX requests and event handling using the native DOM API. It is inspired by the jQuery library.

[Demo](#)

## Getting Started

To get started using jDOM, download and unzip the `lib.zip` file and run the command `webpack lib/main.js jdom.js` in the terminal. Then, include the webpack output file `jdom.js` in your source code.

## API

[Core](#core)  

- [`$j()`](#j)  
- [`$j.ajax()`](#jajax)

[DOM Manipulation and Traversal](#dom-manipulation-and-traversal)

- [`addClass()`](#addclass)
- [`append()`](#append)
- [`attr()`](#attr)
- [`children()`](#children)
- [`each()`](#each)
- [`empty()`](#empty)
- [`find()`](#find)
- [`html()`](#html)
- [`parent()`](#parent)
- [`remove()`](#remove)
- [`removeClass()`](#removeclass)

[Event Handlers](#event-handlers)

- [`off()`](#off)
- [`on()`](#on)

## Core

### `$j()`

The global variable `$j` references a versatile function that provides a wrapper for all functions in the jDOM library. There are three main ways to use the `$j` function.

1. CSS Selectors
2. HTMLElements
3. Callbacks

#### CSS Selectors

The `$j` function can be used to select HTML elements from the DOM by receiving an argument of a CSS selector string. For example:

```javascript
  $j('div'); // returns a DOMNodeCollection of all div elements
  $('.row'); // returns a DOMNodeCollection of all elements with the row class
```

#### HTMLElements

The `$j` function also accepts an instance of an HTMLElement which it will convert into an instance of a DOMNodeCollection, providing it with access to the DOM traversal and event handling methods.


#### Callbacks

The `$j` function can be used to register callbacks before the HTML document has fully loaded and parsed. Any callbacks passed to the `$j` function as arguments will be executed upon the `DOMContentLoaded` event.

### `$j.ajax()`

The `$j.ajax` function can be used to make asynchronous HTTP request (Ajax request). The `$j.ajax` method takes in an options object that allows for customizing the parameters of the request including: the HTTP `method` of the request, the request `url`, any `data` to send up with the request, `dataType`, `contentType`, and any `success` or `error` callbacks to be executed appropriately.

```javascript
  const defaults = {
    method: 'GET',
    url: window.location.href,
    data: {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    dataType: 'jsonp',
    success: () => {},
    error: () => {}
  };
```
The `$j.ajax` function makes an XMLHttpRequest using the parameters supplied and returns a JavaScript `Promise` object which can be used to chain additional success or error callbacks using `then` or `catch`.

## DOM Manipulation and Traversal

The `$j` function can be used to convert an HTMLElement or several HTML elements (using a CSS selector) into a `DOMNodeCollection` object. Any instance of `DOMNodeCollection` has the following methods available for DOM manipulation and traversal.

### `addClass()`

Takes a CSS class string as an argument an adds it to the class of each `HTMLElement` in the `DOMNodeCollection`. Duplicate classes are ignored.

### `append()`

Takes in either an instance of a `DOMNodeCollection`, an `HTMLElement`, or a string as an argument.

If given a `DOMNodeCollection`, it iterates over each element in the `DOMNodeCollection`, appending the element to each `HTMLElement` in the original `DOMNodeCollection`.

If given an `HTMLElement`, it appends the element to each `HTMLElement` in the `DOMNodeCollection`.

If given a string, it appends the string to the innerHTML of each `HTMLElement` innerHTML in the `DOMNodeCollection`.

### `attr()`

Takes in either one or two arguments, an `attributeName` and a `value`. If provided only an `attributeName`, it gets the value of the given attribute. If provided both, it sets the value of the given attribute.

### `children()`

Returns a new `DOMNodeCollection` object containing all of the direct child elements of all of the HTMLElements in the `DOMNodeCollection`.

### `each()`

Takes in a callback and iterates over each HTMLElement in the `DOMNodeCollection`, executing the callback.

### `empty()`

Empties the innerHTML of all HTMLElements in the `DOMNodeCollection`.

### `find()`

Takes in a CSS selector string and returns a `DOMNodeCollection` of all descendant nodes matching the selector.

### `html()`

Reads the innerHTML of each element in the `DOMNodeCollection` if no argument is given, or if provided an optional string as argument, sets the innerHTML of each element in the `DOMNodeCollection`.

### `parent()`

Returns a new `DOMNodeCollection` containing all of the parent nodes of each `HTMLElement` in the `DOMNodeCollection`.

### `remove()`

Removes each `HTMLElement` in the `DOMNodeCollection` from the DOM.

### `removeClass()`

Takes in a CSS class string and removes it from each `HTMLElement` in the `DOMNodeCollection`.

## Event Handlers

### `off()`

Takes in a `DOM Event` and a callback and removes the event listener from each HTMLElement in the `DOMNodeCollection`.

### `on()`

Takes in a `DOM Event` and a callback and adds an event listener to each HTMLElement in the `DOMNodeCollection`.
