'use strict';

const Joi = require('joi');
const Boom = require('boom');
const Schema = require('../../lib/schema');
const swagger = Schema.generate(['404']);

module.exports = {
    description: 'Returns users favorite list',
    tags: ['api', 'users', 'public'],
    auth: false,
    validate: {
        params: {
            username: Joi.string().required()
        }
    },
    auth: false,
    handler: async function (request, reply) {

        const user = await this.db.users.findOne({ username: request.params.username });
        if (!user) {
            throw Boom.notFound('user not found');
        }
        const favorite_list = await this.db.list_items.by_list_id({ id: user.id });

        if (!favorite_list[0]) {
            return reply({ data: 'User\'s favorite list is empty' }).code(404);
        }
        const links = await this.db.linked_items.getlinks({ id: favorite_list.id },['name']);
        favorite_list[0].linked_items = links.linked_item;


        return reply({ data: favorite_list });
    },
    response: {
        status: {
            200: Schema.favorite_list_response
        }
    },
    plugins: {
        'hapi-swagger': swagger
    }
};
