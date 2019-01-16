'use strict';

const Joi = require('joi');
const Boom = require('boom');
const Schema = require('../../lib/responseSchema');

const swagger = Schema.generate(['400']);

module.exports = {
    description: 'Add list',
    tags: ['api', 'lists'],
    validate: {
        payload: { name: Joi.string().required(), description: Joi.string().required() },
        headers: Joi.object({ 'authorization': Joi.string().required() }).unknown()
    },
    handler: async function (request, reply) {

        const { credentials } = request.auth;
        const { payload } = request;
        const inTable = await this.db.lists.find({ name: payload.name, owner: credentials.username  });

        if (inTable.length > 0) {
            throw Boom.conflict('List of that name and owner already exists.');
        }
        else {
            payload.owner = credentials.username;
        }

        const returnlist = await this.db.lists.insert(payload);
        return reply({ data: returnlist }).code(201);
    },
    plugins: {
        'hapi-swagger': swagger
    }
};
