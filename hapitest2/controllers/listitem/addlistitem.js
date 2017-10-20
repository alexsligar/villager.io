'use strict';

const Joi = require('joi');
const Boom = require('boom');

module.exports = {
    description: 'Add list item',
    tags: ['api', 'users'],
    handler: async function (request, reply) {
        await this.db.listitems.insert(request.payload);
        return reply("item inserted in the list");
    }
  };