'use strict';
const Boom = require('boom');
const query = require('keyfob').load({ path: './query' });
const knexfile = require('../knexfile.js');
const knex = require('knex')(knexfile);

module.exports = {
    handler: (request, reply)=>{
        const getOperation = knex('lists')//knex.raw(query.get_lists_byid.toString())
        .where("owner",request.params.id)
        .then( ( results ) => {
            if( !results || results.length === 0 ) {
                reply( {
                    error: true,
                    errMessage: 'non found',
                } );
            }
            else{
                reply(results);
            }
        })
        .catch(( err ) => {
            reply( err );
        });
    } 
};
  