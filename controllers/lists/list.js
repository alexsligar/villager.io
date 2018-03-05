'use strict';

// const Joi = require('joi');
const Boom = require('boom');
const Schema = require('../../lib/schema');
const swagger = Schema.generate(['404']);

module.exports = {
    description: 'Returns all lists',
    tags: ['api', 'lists', 'public'],
    auth: false,
    handler: async function (request, reply) {

        const foundlists = await this.db.lists.getall();
        if (!foundlists[0]) {
            throw Boom.notFound();
        }

        return reply({ data: foundlists });
    },
    // response: {
    //     status: {
    //         200: Schema.lists_response
    //     }
    // },
    plugins: {
        'hapi-swagger': swagger
    }
};
