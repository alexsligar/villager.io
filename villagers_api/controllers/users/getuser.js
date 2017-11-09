'use strict';

const Joi = require('joi');
const Boom = require('boom');

const Schema = require('../../lib/schema');
const swagger = Schema.generate(['404']);

module.exports = {
    description: 'Returns a user by username',
    tags: ['api','public'],
    auth: false,
    validate: {
        params: {
            username: Joi.string().required()
        }
    },
    handler: async function (request, reply) {
       let user = await this.db.users.get_public_by_username({username: request.params.username});
       
        if(!user) {
            throw Boom.notFound();
        }
        
        let favorite_list = await this.db.list_items.by_list_id({id: user.id});
        delete user.id;
        return reply({data: {user, favorite_list}});
    },
    response: {
        status: {
            200: Schema.get_user_response
        }
    },
    plugins: {
        'hapi-swagger': swagger
    }
  };