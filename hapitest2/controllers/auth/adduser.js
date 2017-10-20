'use strict';

const Joi = require('joi');
const Boom = require('boom');

const Schema = require('../../lib/schema');
const swagger = Schema.generate();

module.exports = {
    description: 'Add user',
    tags: ['api', 'admin'],
    handler: async function (request, reply) {
        if(!request.payload.password) {
            throw Boom.badRequest(`A password is required`);
        }

        if(!request.payload.username) {
            throw Boom.badRequest(`A Username is required`);
        }
        
        var takenUsername = await this.db.users.findOne({username: request.payload.username},['username']);
        if(takenUsername) {
            throw Boom.conflict(`Username ${takenUsername.username} already exists`);
        }

        var takenEmail = await this.db.users.findOne({email: request.payload.email},['email']);
        if(takenEmail) {
            throw Boom.conflict(`Email ${takenEmail.email} already exists`);
        }
        Schema.full_users=request.payload;
        
        await this.db.users.insert(Schema.full_users);

        const userid = await this.db.users.findOne({username: request.payload.username});
        await this.db.lists.insert({id: userid.id, name: 'Stared', owner: userid.id});
        return reply(userid);
    }
  };