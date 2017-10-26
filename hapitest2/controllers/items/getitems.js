'use strict';
const Joi = require('joi');
const Boom = require('boom');
const server = require('../../server');

module.exports = {
    description: 'Returns all items',
    tags: ['api', 'admin'],
   
    handler: async function (request, reply) {
        
        if(request.auth.credentials.role=='user')
        {
            throw Boom.forbidden();
        }
        var founditems = await this.db.items.getall();
        if (!founditems[0]) {
            throw Boom.notFound();
        }   
        return reply(founditems);        
    }
  };