'use strict';

const Joi = require('joi');
const Boom = require('boom');

module.exports = {
    description: 'Put item',
    tags: ['api', 'user'],
    handler: async function (request, reply) {
        await this.db.items.updateOne(request.payload);
        return reply("item updated in the list");
    }
  };