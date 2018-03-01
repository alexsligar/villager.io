'use strict';
const Joi = require('joi');
const Boom = require('boom');
const Schema = require('../../lib/schema');
const swagger = Schema.generate([]);

module.exports = {
    description: 'Add tag to an item',
    tags: ['api', 'mod'],
    validate: {
        params: {
            id: Joi.number().required()
        },
        payload: { name: Joi.string().required() },
        headers: Joi.object({
            'authorization': Joi.string().required()
        }).unknown()
    },
    handler: async function (request, reply) {

        const credentials = request.auth.credentials;
        const item_id = request.params.id;
        const tag_name = request.payload.name;

        if (credentials.role === 'user') {
            const item_owners = await this.db.item_owners.validate({ item_id, user_id: credentials.id });
            if (!item_owners) {
                throw Boom.unauthorized('Not permitted to edit tags on this item');
            }
            const item = await this.db.items.findOne({ id: item_id });

            if (!item) {
                throw Boom.notFound('Item not found');
            }
            const tag = await this.db.tag.findOne({ name: tag_name });
            if (!tag) {
                throw Boom.notFound('Tag does not exist');
            }
            const check_item_tag = await this.db.item_tags.findOne({ id: item_id,name: tag_name });
            if (check_item_tag) {
                throw Boom.conflict('Item already has that tag');
            }
            await this.db.item_tags.insert({ item_id, tag_name });
            return reply({ message: 'Tag Successfully added' });
        }
    },
    plugins: {
        'hapi-swagger': swagger
    }
};
