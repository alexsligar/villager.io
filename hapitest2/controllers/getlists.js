'use strict';
const Knex = require('knex');

module.exports={
    handler: (request,reply) => {
            const getOperation = Knex( 'lists')
            .join('items','items.itemid','=','lists.itemid')
            .join('users','users.userid','=','lists.userid')
            .select('items.name','items.location','listid')
            .orderBy('listid')
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

                reply( err );
            });

        }
    }