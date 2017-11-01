'use strict';

const Joi = require('joi');
const Boom = require('boom');

module.exports = {
    description: 'Returns all lists',
    tags: ['api', 'admin'],
    handler: async function (request, reply) {
        var foundlists = await this.db.lists.getall();
        if (!foundlists[0]) {
            throw Boom.notFound();
        }
        return reply(foundlists);
    }
  };