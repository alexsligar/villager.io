'use strict';
const Knex = require('knex');
module.exports={
    handler: ( request, reply ) => {

        //reply('hello rob');
        const getOperation = Knex( 'items' )         
        .where({})
        .select('name','location','itemid')
        .then( ( results ) => {
            if( !results || results.length === 0 ) {
                reply( {
                    error: true,
                    errMessage: 'non found',
                } );
            }
            else{
                reply({
                    dataCount: results.length,
                    data: results,
                });
            }
        })
        .catch(( err ) => {
            reply( 'Error:'+err );
        });
    }}