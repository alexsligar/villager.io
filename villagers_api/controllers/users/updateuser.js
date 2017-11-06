'use strict';

const Joi = require('joi');
const Boom = require('boom');

const Schema = require('../../lib/schema');
const swagger = Schema.generate();

module.exports = {
    description: 'update user',
    tags: ['api', 'admin'],
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
        const credentials = request.auth.credentials;        
        var takenUsername = await this.db.users.findOne({username: request.payload.username},['username']);
        if(takenUsername) {
            throw Boom.conflict(`Username ${takenUsername.username} already exists`);
        }

        var takenEmail = await this.db.users.findOne({email: request.payload.email},['email']);
        if(takenEmail) {
            throw Boom.conflict(`Email ${takenEmail.email} already exists`);
        }
        const user =await this.db.users.findOne(credentials.id);
        if(!user){
            throw Boom.notFound("User not found");
        }
        
        user=await this.db.user.updateOne(user.id , user);
        return reply(user);
    }
  };