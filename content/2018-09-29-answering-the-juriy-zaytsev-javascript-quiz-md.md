---
title: Answering the Juriy Zaytsev JavaScript Quiz
date: 2010-02-10T03:42:00.000Z
cover: /assets/2.jpg
slug: 2010/02/answering-the-juriy-zaytsev-javascript-quiz
category: javascript
tags:
  - javascript
  - ecmascript
  - quiz
---
Juriy Zaytsev (aka kangax) made a really nice [JavaScript quiz](http://perfectionkills.com/javascript-quiz/), which covers a lot of interesting subjects such as scoping, function expressions, variable and function declarations, references, order of evaluation, object instantiation and more.

I’ve had a great time answering those questions, and I would like to share my answers with a brief explanation.

## #1
```js
    (function(){
      return typeof arguments;
    })();
```

It will return `"object"`, because [arguments](http://web.archive.org/web/20101109023605/http://bclary.com/2004/11/07/#a-10.1.8) is just that, a simple object.

## #2
```js
    var f = function g(){ return 23; };
    typeof g();
```

The answer is `Error`.

A `ReferenceError` will be generated, because the name (`Identifier`) of a `FunctionExpression` can be referenced only from inside its `FunctionBody`, to allow the function to make recursive calls. Unlike with a `FunctionDeclaration` the `Identifier` of a `FunctionExpression` doesn’t affect the enclosing scope.

There are a lot of misconceptions about the differences between function expressions and function definitions, I would highly recommend the following article also written by kangax:

[Named function expressions demystified](http://perfectionkills.com/named-function-expressions-demystified/)

Note: In the Microsoft JScript implementation there is a bug, a serious deviation from the ECMA specification, where identifiers of function expressions leak to its enclosing scope.


## #3

```js
    (function(x){
      delete x;
      return x;
    })(1);
```

The answer is `1`, because argument identifiers are created as properties of the Variable Object, (the Activation Object in the case of Function Code), following the rules of a [variable instantiation](http://web.archive.org/web/20101109023605/http://bclary.com/2004/11/07/#a-10.1.3) for the [Function Code](http://web.archive.org/web/20101109023605/http://bclary.com/2004/11/07/#a-10.2.3) execution context, those properties are created with the `{ DontDelete }` attribute, so they can’t be deleted.

## #4

```js
    var y = 1, x = y = typeof x;
    x;
```

The answer is `"undefined"`, because the Variable statement at parse time will define the variables (they will be “hoisted” to its enclosing scope, and initialized with the undefined value), then in execution time and due the right-to-left associativity of the [`AssignmentOperator`](http://web.archive.org/web/20101109023605/http://bclary.com/2004/11/07/#a-11.13) the first assignment will be done (`y = 1;`) then, the second assignment: (`y = typeof x;`) that will return `"undefined"` and this is the value that will be used in the very last one: (`x = "undefined";`).

That it’s easier to realize if we reorder the statements:

```js
var y, x; // initialized with undefined
y = 1;
y = typeof x; // x is undefined, so "undefined" is returned
x = y; // "undefined"
x;
```

## #5

```js
    (function f(f){
      return typeof f();
    })(function(){ return 1; });
```

This one plays with the identifier names inside the scope of the function.

The answer is `"number"`, because the `FunctionExpression` Identifier (the function name) is bound to the scope chain, but later is overwritten by the value of the f argument.


## #6

```js
    var foo = {
      bar: function() { return this.baz; },
      baz: 1
    };
    (function(){
      return typeof arguments[0]();
    })(foo.bar);
```

The answer is `"undefined"`, because the `foo.bar` function is executed with the `this` value pointing to the `arguments` object of the second function.

Remember that the function context (the this value) can be set implicitly, depending on how a function is invoked, e.g.:

```js
foo(); // a simple function call, this will point to the global object
(function () { })();

obj.method(); // this == obj inside method
obj['method']();
```

In this question the `[]` property accessor is used on the arguments object, causing the context change, we are executing the foo.bar function as if it were a "method" of the arguments object.


## #7

```js
    var foo = {
      bar: function(){ return this.baz; },
      baz: 1
    }
    typeof (f = foo.bar)();
```

The answer is `"undefined"`.

This case is similar to the previous one, because the assignment operator will simply return a reference to foo.bar, causing that when we invoke the function, the context point to the Global object.

## #8

```js
    var f = (function f(){ return "1"; }, function g(){ return 2; })();
    typeof f;
```

The answer is `"number"`, because the [Comma Operator](http://web.archive.org/web/20101109023605/http://bclary.com/2004/11/07/#a-11.14), will return the value of the second operand, in this case a reference to the g function, that will be invoked and f will contain the returned 2 number literal.

For example:

```js

  (1,2) == 2; // true

```


## #9

```js
    var x = 1;
    if (function f(){}) {
      x += typeof f;
    }
    x;
```

The answer is `"1undefined"`, because the condition expression of the if statement is a Function Expression, it will evaluate to true and the if block will be executed, but the f identifier it's not available.

Inside the if statement, the typeof operator returns a String ("undefined" since f doesn't exist), and that causes the String concatenation when the += operator is used.

The following can help to realize it:

```js
    var x = 1;
    if (true) {
      x += typeof f; // f is not defined
    }
    x; // "1undefined"
```

Note: In JScript implementations due the [bug](https://groups.google.com/forum/#!msg/comp.lang.javascript/qt_UPJW6wcg/6LwEsAOLUFsJ) I mentioned early, the result of this code will be "1function" which is not correct.



## #10

```js
    var x = [typeof x, typeof y][1];
    typeof typeof x;
```

The answer is `"string"`.

The first statement is just trying to confuse you, because as you know, the `typeof` operator will return always a `String` value, so you can figure out why `typeof typeof anything;` will return always "string" also.


## #11

```js
    (function(foo){
      return typeof foo.bar;
    })({ foo: { bar: 1 } });
```

The answer is `"undefined"`, because as the foo argument, we are passing this object: `{ foo: { bar: 1 } }`.

`foo.bar` doesn't exist, the bar property is actually accessible by `foo.foo.bar`.


## #12

```js
    (function f(){
      function f(){ return 1; }
      return f();
      function f(){ return 2; }
    })();
```

The answer is `2`, because [Function Declarations](http://web.archive.org/web/20101109023605/http://bclary.com/2004/11/07/#a-13) are "hoisted" at parse time, the second `f` function will replace the first one, even if the second is defined after the `return` statement.


## #13

```js
    function f(){ return f; }
    new f() instanceof f;
```

The answer is `false` because the actual object that is instance of `f`, is the `this` value within the constructor, and returning a non-primitive from a constructor, causes that this object with the right `[[Prototype]]` property (this) to be lost.

So basically, f is not an instance of f, since:

```js
    new f() == f; // true
```

We can check that behavior by looking how the [[[Construct]]](http://web.archive.org/web/20101109023605/http://bclary.com/2004/11/07/#a-13.2.2) internal operation works.


## #14

```js
    with (function(x, undefined){}) length;
```

The answer is `2`, because the `with` statement augments the scope chain with the properties of the passed object, in this case a function.

The length property of functions objects contains the number of expected arguments, in this case two arguments.

Note: `undefined` has no special meaning, is just another identifier, in this example is used as an argument in the `FormalParameterList`. 
