'use strict';

const Joi = require('joi');
const Boom = require('boom');

const Schema = require('../../lib/schema');
const swagger = Schema.generate();

module.exports = {
    description: 'Returns users items',
    tags: ['api', 'users'],
    handler: async function (request, reply) {
        let id = await this.db.users.findone({username: request.params.username},["id"]);        
        var founduser = await this.db.items.find({owner: id},["name","location","type","linkedgroup","linkedplace"]);
        if(!founduser) {
            throw Boom.notFound();
        }
        return reply(founduser);
    }
  };