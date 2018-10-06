---
title: Loop through an array in JavaScript

date: 2018-10-05T05:42:00.000Z
cover: /assets/8.jpg
category: javascript
tags:
- javascript
- arrays
- iteration
---

# Iterating arrays in Javascript

For a long time, in the era of ECMAScript 3 (1999 - 2008), the `for..in`
statement was very often misused to _iterate_ over array objects, this
statement is really meant to _enumerate_ object properties, no question why
[many][1] [people][2] reported _strange_ behaviors. For a newbie or a
foreigner of the Javascript world, coming from other languages, the `for-in`
statement might look just _good_ but it shouldn't be used for this.

The simplest way I long suggested was to use a plain sequential `for` loop:

```javascript
let array = ["Hello","World"];
for (let i = 0; i < array.length; i++) {
    console.log(array[i]);
}
```

And this was the most common way to iterate array objects, of course you can
also use any other sequential loop like `while`, `do..while`, etc...

## Enter ECMAScript 5 `forEach`

 The ECMAScript 5 Specification (ES5 for short) introduced a lot of very helpful
 array methods, one of them, the
 [Array.prototype.forEach](http://es5.github.io/#x15.4.4.18) and it gives us a
 very short way to iterate over an array:

```javascript
array.forEach(function (item) {
    console.log(item);
});
```

Being almost 9 years as the time of writing that the ES5 spec. was released (Dec. 2009),
it [has been implemented by almost all][3] modern engines in the desktop,
server and mobile environments, so it's safe to use them.

And with the ES6 arrow function syntax, it's even more succinct:

```javascript
array.forEach(item => console.log(item));
```

Very short and sweet.

Arrow functions are also being [widely implemented][4], unless you plan to support
very old platforms (e.g. IE11) you are also safe to go.

The `forEach` method accepts two parameters, the first a callback function,
and the second one an optional _thisArg_, which in case provided, will set
the `this` value of the callback function _if possible_ (e.g. it not possible
to bind the `this` value of arrow functions).

The callback function passed to `forEach` will actually receive 3 arguments
when called for each element and they are:

- The current element
- The index of the element
- A reference to the array object being iterated

For example, the following:

```javascript
var colors = ['red', 'green', 'blue'];

colors.forEach(function (c, i, array) {
  console.log(c, i, array);1
});
```

Will log:

```text
red   0 Array(3) [ "red", "green", "blue" ]
green 1 Array(3) [ "red", "green", "blue" ]
blue  2 Array(3) [ "red", "green", "blue" ]
```

However there are some differences with a sequential loop, for instance, the
`forEach` method lacks the ability to stop its execution at an arbitrary
point, thing that we can easily do with the `break` statement. Also you
cannot return from the enclosing function if you wanted, since the return
value of the callback is simply ignored.

Another difference is that if we have an _sparse array_, non existent
elements are skipped by the `forEach` method:

```javascript
var array = [1, , , , 2];
array.forEach((el, i) => console.log(el, i));

// Will log:
// 1  0
// 2  4
```

_Sparse arrays_ or arrays with _holes_ are by definition, cases in which some
of the index properties are missing from the object itself, and there is no
continuos sequence from `0` to `length - 1`.

## Enter ECMAScript 6 `for-of`

The ES6 standard introduces the concept of iterable objects and defined a new
construct for traversing data, the `for...of` statement.

Iterables and generators are a big piece of ES6 that deserve to have its own
article.

Array objects are by definition built-in iterables in ES6, so you can use
this statement on them:

```javascript
let colors = ['red', 'green', 'blue'];
for (const color of colors){
  console.log(color);
}
```

Since it's a ES6 statement, we can use more of its features, like `let` and
`const` bindings.

The `for-of` statement is also [widely implemented][5] in mature platforms, so
you can use it if you don't plan to target old engines.

## Why not use `for-in` ?

Coming back to the `for-in` statement, it should be avoided to _iterate_
arrays because as I said earlier, this statement is really meant to
_enumerate_ object properties.

It can give unexpected results if you use it to _iterate_ over arrays
because:

- The order of _enumeration_ is not guaranteed by the specification, the
  array indexes may not be visited in numeric order.
- Inherited properties are also enumerated.

The second point can give you a lot of problems, for example, if
the `Array.prototype` object is extended to include a method there, that
property will be also enumerated.

For example:

```javascript
// Don't do this!
Array.prototype.test = "inherited!";
var array = ['a', 'b', 'c'];
array.prop = 'prop';

for (var i in array) {
  console.log(array[i]);
}
```

The above code will log, "a", "b", "c" "prop" and "inherited!".

That was a big problem in the past, particularly if you used some library
that relied heavily on native prototypes augmentation (such as early versions
of _MooTools_ for example).

The for-in statement as I said before is there to enumerate object
properties, for example:

```javascript
var obj = {
  "a": 1,
  "b": 2,
  "c": 3
};

for (var prop in obj) {
  if (obj.hasOwnProperty(prop)) { 
    // or if (Object.prototype.hasOwnProperty.call(obj,prop)) for safety...
    console.log("prop: " + prop + " value: " + obj[prop])
  }
}
```

In the above example the `hasOwnProperty` method allows you to enumerate only
own properties, that's it, only the properties that the object physically
has, no inherited properties.

Now with ECMAScript 5 we have the `Object.keys` method to get the enumerable
own properties.

## Conclusions

If you can target ES6, use the `for-of` statement, otherwise use the
`Array.prototype.forEach` method, but if you want to have flow control on the
iteration you want to use a traditional `for` loop.

Here are the pros and cons of each one of them:

### `for-of`

- Pros
  - Clean and easy to read.
  - Can use `let` and `const` ES6 bindings, this eliminates [possible closure
    problems](6) when working with functions within loops.
  - Can use flow control statements like `break`, `continue` and
    [`labels`][7] to potentially manage complex nested looping.
  - Can return from the enclosing function.
  - Can iterate over _array like_ objects, like the `arguments` object, `strings`, `Map`s, other built-in iterables and [custom iterators][8].
- Cons
  - Requires you to be able to target ES6

### `Array.prototype.forEach`

- Pros
  - Clean and easy to read.
  - Provides the element index if needed without needing to keep track of
    incrementing a variable.
- Cons
  - Cannot have complete control of its flow since we cannot use `break`,
    `continue` or `labels`.
  - Cannot return from the enclosing function.

### `for` or any traditional sequential loop

- Pros
  - Works on every platform.
  - Can be [potentially the fastest way][9] if performance is critical.
  - Can use flow control statements like `break`, `continue` and `labels`.
  - Can return from the enclosing function.
- Cons
  - Some might consider it less "elegant" and harder to read.
  - Need to keep track and increment the index variable.

And remember, enumeration is not iteration!

Recommended read:

- [Enumeration VS Iteration][10]

[1]: https://stackoverflow.com/questions/1885317/strange-behavior-in-javascript-enhanced-for-in-loop/
[2]: https://stackoverflow.com/questions/3010840/loop-through-an-array-in-javascript
[3]: http://kangax.github.io/compat-table/es5/#test-Array_methods
[4]: http://kangax.github.io/compat-table/es6/#test-arrow_functions
[5]: http://kangax.github.io/compat-table/es6/#test-for..of_loops
[6]: https://stackoverflow.com/questions/750486/javascript-closure-inside-loops-simple-practical-example
[7]: https://codeburst.io/javascript-the-label-statement-a391cef4c556
[8]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
[9]: http://jsben.ch/0rzoU
[10]: http://web.archive.org/web/20101213150231/http://dhtmlkitchen.com/?category=/JavaScript/&date=2007/10/21/&entry=Iteration-Enumeration-Primitives-and-Objects