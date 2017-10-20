'use strict';

const Joi = require('joi');
const Boom = require('boom');

module.exports = {
    description: 'Returns list by id',
    tags: ['api', 'users'],
    handler: async function (request, reply) {
        var foundlist = await this.db.listitems.findOne({listid: request.params.id});
        if (!foundlist) {
            throw Boom.notFound();
        }
        return reply(foundlist);
    }
  };