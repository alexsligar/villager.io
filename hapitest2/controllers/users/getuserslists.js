'use strict';

const Joi = require('joi');
const Boom = require('boom');

const Schema = require('../../lib/schema');
const swagger = Schema.generate();

module.exports = {
    description: 'Returns all users lists',
    tags: ['api', 'admin'],
    handler: async function (request, reply) {
        var founduser = await this.db.lists.find({owner: request.params.id},["name","description"]);
        if(!founduser) {
            throw Boom.notFound();
        }
        return reply(founduser);
    }
  };