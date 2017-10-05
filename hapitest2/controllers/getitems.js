'use strict';
const Boom = require('boom');
const query = require('keyfob').load({ path: './query' });
const knexfile = require('../knexfile.js');
const knex = require('knex')(knexfile);
// const swagger = Schema.generate();

module.exports = {
    description: 'Returns all events',
    tags: ['api', 'admin'],
    handler: (request, reply)=>{
        const getOperation = knex.raw(query.get_items.toString())
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
    }//, 
    // Plugins:{
    //     'hapi-swagger': swagger
    // }

};
  