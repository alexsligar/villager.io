'use strict';
const Boom = require('boom');
const knexfile = require('../knexfile.js');
const knex = require('knex')(knexfile);
// const swagger = Schema.generate();

module.exports = {
    description: 'Create a user',
    tags: ['api', 'user'],
    handler: (request, reply)=>{
        const postOperation = knex('users')
        .insert(request.payload)
        .then(( results ) => {        
            reply("User added");
        })
        .catch(( err ) => {
            console.log(err);
            reply( err );
        });
     }//, 
    // Plugins:{
    //     'hapi-swagger': swagger
    // } 
};
  