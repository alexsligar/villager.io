'use strict';

const Joi = require('joi');
const Boom = require('boom');

module.exports = {
    description: 'Add item',
    tags: ['api', 'users'],
    handler: async function (request, reply) {
        await this.db.lists.insert(request.payload);
        return reply("list inserted");
    }
  };