# fpEs
Functional Programming for EcmaScript(Javascript)

## Common FP (Compose, Curry)

Example:

```javascript

import {compose, curry} from "fpEs";

console.log(compose((x)=>x-8, (x)=>x+10, (x)=>x*10)(4)) // 42
console.log(compose((x)=>x+2, (x,y)=>x*y)(4,10)) // 42

console.log(curry((x, y, z) => x + y + z)(1,2,3)) // 6
console.log(curry((x, y, z) => x + y + z)(1)(2,3)) // 6
console.log(curry((x, y, z) => x + y + z)(1,2)(3)) // 6
console.log(curry((x, y, z) => x + y + z)(1)(2)(3)) // 6

```

## Monad

Example:

```javascript

import Monad from "fpEs";

var m;

// isPresent/isNull

m = Monad.just(1);
console.log(m.isPresent()); // true
console.log(m.isNull()); // false
m = Monad.just(null);
console.log(m.isPresent()); // false
console.log(m.isNull()); // true
m = Monad.just(undefined);
console.log(m.isPresent()); // false
console.log(m.isNull()); // true

// Or

m = Monad.just(1);
console.log(m.or(3).unwrap()); // 1
console.log(m.or(4).unwrap()); // 1
m = Monad.just(null);
console.log(m.or(3).unwrap()); // 3
console.log(m.or(4).unwrap()); // 4
m = Monad.just(undefined);
console.log(m.or(3).unwrap()); // 3
console.log(m.or(4).unwrap()); // 4

// letDo

m = Monad.just(1);
v = 0;
m.letDo(function () {
  v = 1;
});
console.log(v); // 1
m = Monad.just(null);
v = 0;
m.letDo(function () {
  v = 1;
});
console.log(v); // 0
m = Monad.just(undefined);
v = 0;
m.letDo(function () {
  v = 1;
});
console.log(v); // 0

```

## MonadIO/Rx.Observable

Example:

```javascript

import Monad from "fpEs";
import MonadIO from "fpEs";
var {asof, doM} = MonadIO;



var p = undefined;
var m = MonadIO.just(0);
var v = 0;

// sync

m = MonadIO.just(0);
v = 0;
m
.flatMap((val)=>val+1)
.flatMap((val)=>val+2)
.flatMap((val)=>val+3)
.subscribe((val)=>v=val);

console.log(v); // 6

// async

m = MonadIO.just(0);
v = 0;
p = m
.flatMap((val)=>val+1)
.flatMap((val)=>val+2)
.flatMap((val)=>val+3)
.subscribe((val)=>v=val, true); // Async: true

console.log(v); // 0
p.then(function () {
  console.log(v); // 6
});

// DoNotation

v = 0;
p = doM(function *() {
  var value = yield asof(5);
  var value2 = yield asof(11);
  var value3 = yield Monad.just(3);
  var value4 = yield MonadIO.just(3);
  return value + value2 + value3 + value4;
});

console.log(p); // 22

```

## Publisher(PubSub-like)

Example:

```javascript

import Publisher from "fpEs";

var p = new Publisher();
var v = 0;

// sync

p = new Publisher();
v = 0;
p.subscribe((i)=>v=i);
p.publish(1);

console.log(v); // 1

// async

p = new Publisher();
v = 0;

p.subscribe((i)=>v=i);
p.publish(1, true); // Async: true
console.log(v); // 0

setTimeout(()=>{
  console.log(v); // 1
},100);

// flatMap

p = new Publisher();
v = 0;

p.flatMap((x)=>x+2).flatMap((x)=>x+3).subscribe((i)=>v=i);
p.publish(1, true);
console.log(v); // 0

setTimeout(()=>{
  console.log(v); // 6
},100);

// unsubscribe

p = new Publisher();
v = 0;
var callback = (i)=>v=i;

p.subscribe(callback);
p.publish(1);
console.log(v); // 1
v = 0;
p.unsubscribe(callback);
p.publish(1);
console.log(v); // 0

```
