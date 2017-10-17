'use strict';

const Joi = require('joi');
const Boom = require('boom');

module.exports = {
    description: 'Put lists',
    tags: ['api', 'user'],
    handler: async function (request, reply) {
        await this.db.lsits.updateOne(request.payload);
        return reply("list description updated in the list");
    }
  };