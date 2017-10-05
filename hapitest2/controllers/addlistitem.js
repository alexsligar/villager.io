'use strict';
const Boom = require('boom');
const knexfile = require('../knexfile.js');
const knex = require('knex')(knexfile);
// const swagger = Schema.generate();
module.exports = {
    description: 'Add item to list',
    tags: ['api', 'user'],
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
    // , 
    // Plugins:{
    //     'hapi-swagger': swagger
    // }
};
  