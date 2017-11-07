'use strict';

const Joi = require('joi');
const Boom = require('boom');

const Schema = require('../../lib/schema');
const swagger = Schema.generate(['409']);

module.exports = {
    description: 'Add user',
    tags: ['api', 'auth'],
    auth:false,
    validate: { 
        payload: {
            name: Joi.string().optional(),
            username: Joi.string().required(),
            password: Joi.string().required(),
            email: Joi.string().required(),
            bio: Joi.string().optional()
        }
    },
    handler: async function (request, reply) {
                
        var takenUsername = await this.db.users.findOne({username: request.payload.username},['username']);
        if(takenUsername) {
            throw Boom.conflict(`Username ${takenUsername.username} already exists`);
        }

        var takenEmail = await this.db.users.findOne({email: request.payload.email},['email']);
        if(takenEmail) {
            throw Boom.conflict(`Email ${takenEmail.email} already exists`);
        }
       
        const userid =await this.db.users.insert(request.payload);

       // const userid = await this.db.users.findOne({username: request.payload.username});
        await this.db.lists.insert({id: userid.id, name: 'Starred', owner: userid.id});
        return reply({data: userid});
    // },
    // response: {
    //   status: {
    //     200: Schema.user_response
    //   }
  }, 
  plugins: {
      'hapi-swagger': swagger
  }
  };