'use strict';
const Boom = require('boom');
const knexfile = require('../knexfile.js');
const knex = require('knex')(knexfile);

module.exports = {
    handler: (request, reply)=>{
        const postOperation = knex('items')
        .insert(request.payload)
        .then(( results ) => {
                reply("Event added");
        })
        .catch(( err ) => {
            console.log(err);
            reply( err );
        });
    } 
};
  