'use strict';

const Joi = require('joi');
const Boom = require('boom');

module.exports = {
    description: 'Returns items in list by id',
    tags: ['api', 'users'],
    validate: {
        params:{
            id: Joi.string().guid().required()
        } 
    },
    auth: false,  
    handler: async function (request, reply) {
        var foundlist = await this.db.list_items.find({listid: request.params.id});
        if (!foundlist[0]) {
            throw Boom.notFound();
        }
        return reply(foundlist);
    }
  };