'use strict';

const Joi = require('joi');
const Boom = require('boom');

const Schema = require('../../lib/schema');
const swagger = Schema.generate();

module.exports = {
    description: 'Returns a user by id',
    tags: ['api', 'users'],
    handler: async function (request, reply) {
        var founduser = await this.db.users.findOne({id: request.params.id},['id','username', 'name']);
        var out = await this.db.items.countingstars({id: 1});
        console.log(out.count)
        if(!founduser) {
            throw Boom.notFound();
        }

        return reply(founduser);
    }
  };