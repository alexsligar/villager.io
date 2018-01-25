'use strict';

const Joi = require('joi');
const Boom = require('boom');

const Schema = require('../../lib/schema');
const swagger = Schema.generate();

module.exports = {
    description: 'Returns all users',
    tags: ['api', 'admin'],
    validate: {
        headers: Joi.object({
            'authorization': Joi.string().required()
        }).unknown()
    },
    
    handler: async function (request, reply) {

        if(request.auth.credentials.role=='user')
        {
            throw Boom.unauthorized();
        }

        var founduser = await this.db.users.find();
        if(!founduser) {
            throw Boom.notFound();
        }
        return reply({data: founduser});
    },
    response: {
        status: {
            200: Schema.private_users_response
        }
    },
    plugins: {
        'hapi-swagger': swagger
    }
  };