# uproto - User defined prototype system

uproto implements class inheritance for ES4 on basis of prototype. In addition, uproto supports namespaces, class registry and class import.

## Getting Started

```shell
$ npm install --save uproto
```

## Overview
### Example

Here is an example:

```js
var uproto = require('uproto');

//switch to namespace test
uproto.namespace('test');

//define a base object class extends from Object
uproto.createClass('Object', Object, {});

//use the base object class
var BaseObject = uproto.import('test.Object');

//switch to namespce test.exception
uproto.namespace('test.exception');

//define a base Exception class
var Exception = uproto.createClass('Exception', BaseObject, {
    init: function(code, message) {
        this.code = code;
        this.message = message;
    },
    toString: function() {
        return '[' + this.code + ' : ' + this.message + ']';
    }
});

//define test.exception.InputException extends from test.exception.Exception
var InputException = uproto.createClass('InputException', Exception);
var e = new InputException(1, "email invalid.");
console.log('' + e);
```