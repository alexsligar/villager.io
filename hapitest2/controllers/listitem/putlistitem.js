'use strict';

const Joi = require('joi');
const Boom = require('boom');

module.exports = {
    description: 'Put list item',
    tags: ['api', 'user'],
    handler: async function (request, reply) {
        await this.db.listitems.update(request.payload);
        return reply("list item updated");
    }
  };