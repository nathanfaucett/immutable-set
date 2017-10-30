Immutable Set
=======

Immutable persistent set for the browser and node.js

# Install using npm
```bash
$ npm install @nathanfaucett/immutable-set --save
```
# Install using yarn
```bash
$ yarn add @nathanfaucett/immutable-set --save
```

# Example Usage
```javascript
var ImmutableSet = require("@nathanfaucett/immutable-set");;


var a = new ImmutableSet([0, 1]),
    b = new ImmutableSet(0, 1),
    c = ImmutableSet.of([0, 1]),
    d = ImmutableSet.of(0, 1);

var a0 = a.set(2),
    a1 = a.remove(1);
```

# Docs

## Members

#### length -> Number
    returns size of Set, only available if Object.defineProperty is supported


## Static Functions

#### Set.isSet(value: Any) -> Boolean
    returns true if value is a set else false

#### Set.of(...values: Array<Any>) -> Set
    creates Set from passed values same as new Set(...values: Array<Any>)

#### Set.equal(a: Set, b: Set) -> Boolean
    compares sets by values


## Functions

#### size() -> Number
    returns size of Set

#### get(value: Any) -> Any
    returns value

#### has(value: Any) -> Boolean
    returns true if set contains value

#### set(...values: Array<Any>) -> Set
    returns new Set if value is not in Set

#### remove(...values: Array<Any>) -> Set
    returns new Set without the value

#### iterator([reverse = false: Boolean]) -> Iterator
    returns Iterator

#### toArray() -> Array<Any>
    returns Set elements in an Array

#### join([separator = " "]) -> String
    join all elements of an Set into a String

#### toString() -> String
    String representation of Set

#### equals(other: Set) -> Boolean
    compares this set to other set by values

#### every, filter, forEach, forEachRight, set, reduce, reduceRight, some
    common Array methods
