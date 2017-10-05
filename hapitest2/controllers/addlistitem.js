'use strict';
const Boom = require('boom');
const knexfile = require('../knexfile.js');
const knex = require('knex')(knexfile);

module.exports = {
    handler: (request, reply)=>{
        const postOperation = knex('listitem')
        .insert(request.payload)
        .then(( results ) => {
            reply("list item added");
        })
        .catch(( err ) => {
            console.log(err);
            reply( err );
        });
    } 
};
  