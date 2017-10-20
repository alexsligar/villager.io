'use strict';

const Joi = require('joi');
const Boom = require('boom');

module.exports = {
    description: 'Returns all items',
    tags: ['api', 'admin'],
    handler: async function (request, reply) {
        var foundlitems = await this.db.items.find();
        if (!foundlitems) {
            throw Boom.notFound();
        }
        return reply(request.payload);        
    }
  };