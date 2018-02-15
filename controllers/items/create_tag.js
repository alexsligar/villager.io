'use strict';
const Joi = require('joi');
const Boom = require('boom');
const Schema = require('../../lib/schema');
const swagger = Schema.generate(['401', '404', '400']);

module.exports = {
    description: 'Update tag',
    tags: ['api', 'mod'],
    validate: {
        params: Joi.object({
            'name': Joi.string().required()
        }),
        headers: Joi.object({
            'authorization': Joi.string().required()
        }).unknown()
    },
    handler: async function (request, reply) {
        const credentials = request.auth.credentials;
        
        if (credentials.role == "user") {
                throw Boom.unauthorized("Not permitted to edit tags");
        }
        let tag = await this.db.tags.findOne({ name: request.params.name})
        if (tag){
            throw Boom.conflict("That tag already exists")
        }
        const user = await this.db.tag_items.insert(request.payload);

    },
    plugins: {
        'hapi-swagger': swagger
    }
};