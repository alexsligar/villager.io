'use strict';

const Joi = require('joi');
const Boom = require('boom');

module.exports = {
    description: 'Add event',
    tags: ['api', 'user'],
    handler: async function (request, reply) {
        await this.db.items.insert(request.payload);
        return reply("item inserted in the list");
    }
  };