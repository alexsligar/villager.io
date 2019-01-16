'use strict';

const Joi = require('joi');
const Boom = require('boom');
const Schema = require('../../lib/schema');

const swagger = Schema.generate();

module.exports = {
    description: 'Add a category to tag items with',
    tags: ['api', 'tags'],
    validate: {
        payload: Joi.object({ 'name': Joi.string().required() }),
        headers: Joi.object({ 'authorization': Joi.string().required() }).unknown()
    },
    handler: async function (request, reply) {

        const credentials = request.auth.credentials;
        if (credentials.role === 'user') {
            throw Boom.unauthorized();
        }

        if (await this.db.tags.findOne(request.payload)) {
            throw Boom.conflict(`Tag ${ request.payload.name } already exists`);
        }

        await this.db.tags.insert(request.payload);

        return reply({ message: 'Tag added successfully' }).code(201);
    },
    // response: {
    //     status: {
    //         200: Schema
    //     }
    // },
    plugins: {
        'hapi-swagger': swagger
    }
};
