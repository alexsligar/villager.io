'use strict';

const Joi = require('joi');
const Boom = require('boom');

const Schema = require('../../lib/schema');
const swagger = Schema.generate();

module.exports = {
    description: 'Returns a user by username',
    tags: ['api', 'users'],
    auth: false,
    handler: async function (request, reply) {
        let user = await this.db.users.findOne({username: request.params.username});
        if(!user)
        {
            throw Boom.notFound;
        }
        var founduser = await this.db.users.findOne({id: user.id},['username', 'name','bio']);
       
        if(!founduser) {
            throw Boom.notFound();
        }

        return reply(founduser);
    }
  };