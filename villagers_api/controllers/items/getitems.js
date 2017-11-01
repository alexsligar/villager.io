'use strict';
const Joi = require('joi');
const Boom = require('boom');
const server = require('../../server');

module.exports = {
    description: 'Returns all items',
    tags: ['api', 'users','public'],
   
    handler: async function (request, reply) {
        
        
        var founditems = await this.db.items.getall();
        if (!founditems[0]) {
            throw Boom.notFound();
        }   
        return reply(founditems);        
    }
  };