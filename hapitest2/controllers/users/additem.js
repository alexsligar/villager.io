'use strict';

const Joi = require('joi');
const Boom = require('boom');

module.exports = {
    description: 'Add item',
    tags: ['api', 'users'],
    handler: async function (request, reply) {
        await this.db.items.insert(request.payload);
        return reply(request.payload);
    }
  };