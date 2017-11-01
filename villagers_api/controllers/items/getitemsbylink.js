'use strict';
const Joi = require('joi');
const Boom = require('boom');
const server = require('../../server');

module.exports = {
    description: 'Returns all items',
    tags: ['api', 'users','public'],
   auth:false,
    handler: async function (request, reply) {
        
        
        var founditems = await this.db.items.get_by_link({id: request.params.id});
        if (!founditems[0]) {
            throw Boom.notFound();
        }   
                
        return reply(founditems);        
    }
  };