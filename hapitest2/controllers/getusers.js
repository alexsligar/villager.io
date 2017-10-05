'use strict';
const Boom = require('boom');
//const knex = require('knex');
const query = require('keyfob').load({ path: './query' });


const knexfile = require('../knexfile.js');
const knex = require('knex')(knexfile);

module.exports = {
    handler: (request, reply)=>{
        const getOperation = knex.raw(query.get_users.toString())
        .then( ( results ) => {
            if( !results || results.length === 0 ) {
                reply( {
                    error: true,
                    errMessage: 'non found',
                } );
            }
            else{
                reply(results.rows);
            }
        })
        .catch(( err ) => {
            reply( err );
        });
    } 
};
  