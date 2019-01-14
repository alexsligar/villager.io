'use strict';

const Joi = require('joi');
//const Boom = require('boom');
// const server = require('../../server');
const Schema = require('../../lib/schema');

const swagger = Schema.generate(['404']);

module.exports = {
    description: 'Returns all items by tag',
    tags: ['api', 'items','public'],
    auth: false,
    validate: {
        params: {
            name: Joi.string().required()
        }
    },
    handler: async function (request, reply) {

        const name = request.params.name;
        const founditems = await this.db.items.getbytag({ name });

        return reply({ data: founditems });
    },
    response: {
        status: {
            200: Schema.items_by_tag_response
        }
    },
    plugins: {
        'hapi-swagger': swagger
    }
};
