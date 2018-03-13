'use strict';

const Joi = require('joi');
const Boom = require('boom');
const Schema = require('../../lib/schema');
const swagger = Schema.generate();

module.exports = {
    description: 'Delete tag category from use and all items',
    tags: ['api', 'mod'],
    validate: {
        payload: Joi.object({ 'name': Joi.string().required() }),
        headers: Joi.object({ 'authorization': Joi.string().required() }).unknown()
    },
    handler: async function (request, reply) {

        const credentials = request.auth.credentials;
        if (credentials.role === 'user') {
            throw Boom.unauthorized();
        }
        if (!await this.db.tags.findOne({ name: request.payload.name })) {
            throw Boom.notFound('Tag doesn\'t exist');
        }

        await this.db.tags.destroy({ name: request.payload.name });

        return reply({ message: 'Tag deleted' });
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
