'use strict';

const assert = require('assert');
const tinyco = require('../lib/tinyco');

describe( 'tinyco', () => {

  it( 'should be a function', () => {
    assert.equal( typeof tinyco, 'function' );
  });

  it( 'should yield for promises', done => {
    const p1 = () => Promise.resolve( 1 );
    const p2 = () => Promise.resolve( 2 );
    let val1;
    let val2;

    tinyco(function*() {
      val1 = yield p1();
      val2 = yield p2();
    })
    .then( () => {
      assert.equal( val1, 1, 'got bad value for first yield' );
      assert.equal( val2, 2, 'got bad value for second yield' );
      done();
    });
  });

  it( 'should resolve with return values', done => {
    const p = () => Promise.resolve( 1 );

    tinyco(function*() {
      let val = yield p();
      return val;
    })
    .then( val => {
      assert.equal( val, 1 );
      done();
    });
  });

  it( 'should reject when yielded promises reject', done => {
    const err = new Error();
    const p = () => Promise.reject( err );

    tinyco(function*() {
      let val = yield p();
      return val;
    })
    .catch( e => {
      assert.equal( e, err );
      done();
    });
  });

  it( 'should reject on thrown errors', done => {
    const err = new Error();

    tinyco(function*() {
      throw err;
    })
    .catch( e => {
      assert.equal( e, err );
      done();
    });
  });

  it( 'should not reject when yielded promise rejections are caught', done => {
    const err = new Error();
    const p = () => Promise.reject( err );

    tinyco(function*() {
      try {
        yield p();
      } catch ( e ) {
        return 1;
      }
    })
    .then( val => {
      assert.equal( val, 1 );
      done();
    });
  });

});
