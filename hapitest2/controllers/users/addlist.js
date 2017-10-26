'use strict';

const Joi = require('joi');
const Boom = require('boom');

module.exports = {
    description: 'Add item',
    tags: ['api', 'users'],
    validate: {
        payload: {
            name: Joi.string().required(),
            owner: Joi.string().giud().required(),
            description: Joi.string().required()
        }
    },
    handler: async function (request, reply) {
       let credentials= request.auth.credentials;
        if(!request.payload.name)
        {
            throw Boom.badRequest("No name provided");
        }
        let list=request.payload;
        list['owner']= credentials.id;
        await this.db.lists.insert(list);
        return reply("list inserted");
    }
  };