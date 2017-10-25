'use strict';

const Joi = require('joi');
const Boom = require('boom');

module.exports = {
    description: 'Add item',
    tags: ['api', 'users'],
    handler: async function (request, reply) {
        let founduser = await this.db.lists.findOne({id: request.params.id});
        if(!founduser)
        {
            throw Boom.notFound("User not found");
        }
        if(!request.payload.name)
        {
            throw Boom.badRequest("No name provided");
        }
        
        await this.db.lists.insert(request.payload);
        return reply("list inserted");
    }
  };