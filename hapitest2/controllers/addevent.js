'use strict';
const Boom = require('boom');
const knexfile = require('../knexfile.js');
const knex = require('knex')(knexfile);

module.exports = {
    handler: (request, reply)=>{
        const postOperation = knex('users')
        .insert(request.payload)
        .then(( results ) => {
            if(!results || results.length === 0 ) {
                
            }
            else{
                reply("Event added");
            }
        })
        .catch(( err ) => {
            console.log(err);
            reply( err );
        });
    } 
};
  