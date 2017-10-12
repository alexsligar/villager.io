'use strict';

const Joi = require('joi');
const Boom = require('boom');

module.exports = {
    description: 'Returns all items',
    tags: ['api', 'admin'],
    handler: async function (request, reply) {
        var foundlitems = await this.db.items.find();
        if (!foundlitems) {
            foundlitems={error: "No items found"};
        }
        return reply(foundlitems);
    }
  };