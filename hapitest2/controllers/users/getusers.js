'use strict';

const Joi = require('joi');
const Boom = require('boom');

const Schema = require('../../lib/schema');
const swagger = Schema.generate();

module.exports = {
    description: 'Returns all users',
    tags: ['api', 'admin'],
    handler: async function (request, reply) {
       // console.log(request.headers);
        //console.log(request.auth);
        

        var founduser = await this.db.users.find();
        if(!founduser) {
            throw Boom.notFound();
        }
        return reply(founduser);
    }
  };