'use strict';

const Joi = require('joi');
const Boom = require('boom');

module.exports = {
    description: 'Returns list by id',
    tags: ['api', 'users'],
    handler: async function (request, reply) {
        var foundlist = await this.db.lists.findOne({id: request.params.id});
        if (!foundlist) {
            foundlist={error: "List not found"};
        }
        return reply(foundlist);
    }
  };