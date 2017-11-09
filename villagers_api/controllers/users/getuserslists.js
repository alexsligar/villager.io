'use strict';

const Joi = require('joi');
const Boom = require('boom');

const Schema = require('../../lib/schema');
const swagger = Schema.generate();

module.exports = {
    description: 'Returns users lists',
    tags: ['api', 'public'],
    auth: false,
    validate: {
        params: {
            username: Joi.string().required()
        }
    },
    handler: async function (request, reply) {
        let user = await this.db.users.findOne({username: request.params.username});
        if(!user){
            throw Boom.notFound();
        }
        var userlists = await this.db.lists.find({owner: user.id},["name","description"]);
        if(!userlists) {
            throw Boom.notFound();
        }
        return reply({data: userlists});
    },
    response: {
        status: {
            200: Schema.lists_response
        }
    },
    plugins: {
        'hapi-swagger': swagger
    }
    
  };