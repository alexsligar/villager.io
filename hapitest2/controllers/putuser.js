'use strict';

const Joi = require('joi');
const Boom = require('boom');

module.exports = {
    description: 'Put user',
    tags: ['api', 'admin'],
    handler: async function (request, reply) {
        
        await this.db.users.updateOne(request.payload);
        return reply("user has been updated");
    }
  };