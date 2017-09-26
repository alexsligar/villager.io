'use strict';
const Knex = require('knex');

module.exports={
    handler: ( request, reply ) => {
        const getOperation = Knex( 'users' )
        .select( )
        .then(( results ) => {
            if( !results || results.length === 0 ) {
                reply( {
                    error: true,
                    errMessage: 'non found',
                } );
            }
            reply({
                dataCount: results.length,
                data: results,
            });
        }).catch( ( err ) => {
            reply( 'Error:'+err );
        } );
    }
}