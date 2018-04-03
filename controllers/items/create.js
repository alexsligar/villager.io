'use strict';
const { forEach } = require('p-iteration');
const Joi = require('joi');
const Boom = require('boom');
const Schema = require('../../lib/schema');
const swagger = Schema.generate(['409']);

module.exports = {
    description: 'Add item',
    tags: ['api', 'items'],
    validate: {
        payload: Schema.additem,
        headers: Joi.object({
            'authorization': Joi.string().required()
        }).unknown()
    },
    handler: async function (request, reply) {

        const credentials = request.auth.credentials;
        const payload = request.payload;
        const linked_items = payload.linked_items;
        const tags = payload.tags;

        const inTable = await this.db.items.find({ name: payload.name });

        if (inTable[0]) {
            throw Boom.conflict(`Item already exists`);
        }

        if (!request.payload.name) {
            throw Boom.badRequest('No name given');
        }

        if (request.payload.type !== 'event' && (request.payload.start_date || request.payload.end_date)) {
            throw Boom.badRequest('Only event can have start and end dates');
        }

        switch (request.payload.type) {
            case 'event':
                if (!request.payload.start_date) {
                    throw Boom.badRequest('Event must have a start date');
                }
                break;

            case 'place':
                if (request.payload.linked_place) {
                    throw Boom.badRequest('Can\'t link to place');
                }
                if (request.payload.linked_group) {
                    throw Boom.badRequest('Can\'t link to group');
                }
                break;

            case 'activity':
                if (request.payload.linked_group) {
                    throw Boom.badRequest('Can\'t link to group');
                }
                break;

            case 'group':
                if (request.payload.linked_group) {
                    throw Boom.badRequest('Can\'t link to group');
                }
                break;

            default:
                throw Boom.badRequest('Invalid type');
        }

        const returneditem = await this.db.items.insert(payload);
        await this.db.item_owners.insert({ item_id: returneditem.id, username: credentials.username });
        if ( tags ){

            await forEach(tags, async (tag) => {

                await this.db.item_tags.insert({ item_id: returneditem.id, tag_name: tag.name });
            });

            returneditem.tags = tags;
        }

        if ( linked_items ){

            await forEach(linked_items, async (item) => {

                await this.db.linked_items.insert({ item_id: returneditem.id, linked_item_id: item.id });
            });

            returneditem.linked_items = linked_items;
        }

        return reply({ data: returneditem });
    },

    response: {
        status: {
            200: Schema.item_response
        }
    },

    plugins: {
        'hapi-swagger': swagger
    }
};
