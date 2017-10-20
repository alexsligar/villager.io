'use strict';

const Joi = require('joi');
const Boom = require('boom');
const swagger = Schema.generate();



module.exports = {
    description: 'Returns all items',
    tags: ['api', 'admin'],
    handler: async function (request, reply) {
        var foundlitems = await this.db.items.find();
        if (!foundlitems) {
            throw Boom.notFound();
        }

        let star = await this.db.items.countingstars({id: 1});
        swagger.fullitem=request.payload;
        swagger.fullitem.starednum=star;
        return reply(request.payload);        
    }
  };