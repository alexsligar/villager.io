'use strict';

const Joi = require('joi');
//const Boom = require('boom');

module.exports = {
    description: 'Returns all users',
    tags: ['api', 'admin'],
    handler: async function (request, reply) {
        var founduser = await this.db.users.getall();
        if (!founduser) {
            founduser={error: "No users found"};
        }
        return reply(founduser);
    }
  };