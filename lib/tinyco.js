'use strict';

const methods = [ 'next', 'throw' ];

module.exports = function( gen, ...args ) {
  return new Promise( ( resolve, reject ) => {
    const it = gen.call( this, ...args );
    const [ yay, boo ] = methods.map( factory );

    yay();

    function factory( method ) {
      return function( res ) {
        try {
          const { done, value } = it[ method ]( res );
          done ? resolve( value ) : value.then( yay, boo );
        } catch ( err ) {
          return reject( err );
        }
      };
    }
  });
};
