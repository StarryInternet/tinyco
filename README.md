# tinyco

Simple coroutines using generators

---

### Installing

```
npm install --save tinyco
```

---

### Example

```js
'use strict';

const c = require('tinyco');

function asyncAdd( a, b ) {
  return new Promise( resolve => setTimeout( () => resolve( a + b ), 100 ) );
}

c(function*() {
  let val = yield asyncAdd( 1, 2 );
  console.log( val );
});
```
