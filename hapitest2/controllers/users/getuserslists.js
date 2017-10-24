'use strict';

const Joi = require('joi');
const Boom = require('boom');

const Schema = require('../../lib/schema');
const swagger = Schema.generate();

module.exports = {
    description: 'Returns all users lists',
    tags: ['api', 'users'],
    handler: async function (request, reply) {
        let id = await this.db.users.findone({username: request.params.username},["id"]);
        var founduser = await this.db.lists.find({owner: id},["name","description"]);
        if(!founduser) {
            throw Boom.notFound();
        }
        return reply(founduser);
    }
  };