'use strict';
const Schema = require('../../lib/schema');
const Joi = require('joi');
const Boom = require('boom');
const swagger = Schema.generate();
const server = require('../../server');


module.exports = {
    description: 'Returns all items',
    tags: ['api', 'admin'],
    handler: async function (request, reply) {
        var founditems = await this.db.items.find();
        if (!founditems) {
            throw Boom.notFound();
        }   
        return reply(founditems);        
    }
  };