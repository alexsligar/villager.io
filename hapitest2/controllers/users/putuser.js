'use strict';

const Joi = require('joi');
const Boom = require('boom');

const Schema = require('../../lib/schema');
const swagger = Schema.generate();

module.exports = {
    description: 'Put user',
    tags: ['api', 'admin'],
    handler: async function (request, reply) {
        
        await this.db.users.updateOne(request.payload);
        return reply("user has been updated");
    }
  };