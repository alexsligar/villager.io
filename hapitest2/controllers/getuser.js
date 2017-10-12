'use strict';

const Joi = require('joi');
const Boom = require('boom');

module.exports = {
    description: 'Returns a user by id',
    tags: ['api', 'users'],
    handler: async function (request, reply) {
        var founduser = await this.db.users.findOne({id: request.params.id},['id','username', 'name']);
        if (!founduser) {
            founduser={error: "User not found"};
        }
        return reply(founduser);
    }
  };