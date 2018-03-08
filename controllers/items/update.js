'use strict';
const { forEach } = require('p-iteration');
const Joi = require('joi');
const Boom = require('boom');
const Schema = require('../../lib/schema');
const swagger = Schema.generate(['401', '404', '400']);

module.exports = {
    description: 'Update item',
    tags: ['api', 'items'],
    validate: {
        params: {
            id: Joi.number().required()
        },
        //payload: Schema.additem,
        headers: Joi.object({
            'authorization': Joi.string().required()
        }).unknown()
    },
    handler: async function (request, reply) {

        const credentials = request.auth.credentials;
        const tags = request.payload.tags;
        const linked_items = request.payload.linked_items;

        if (credentials.role === 'user') {
            const item_owners = await this.db.item_owners.validate({ item_id: request.params.id, username: credentials.username });
            if (!item_owners) {
                throw Boom.unauthorized('Not permitted to edit item');
            }
        }
        const item = await this.db.items.findOne({ id: request.params.id });

        if (!item) {
            throw Boom.notFound('Item not found');
        }

        item = request.payload;

        if (item.type !== 'event') {
            if (item.start_date || item.end_date) {
                throw Boom.badrequest('Only event can have start and end dates');
            }
        }
        else {
            if (!item.start_date) {
                throw Boom.badrequest('Event must have at least a start date');
            }
        }
        // why is this the way that it is
        if (item.type === 'place') {
            //error checking
            if (item.linked_place) {
                throw Boom.badrequest('Can\'t link to place');
            }

            if (item.linked_group) {
                throw Boom.badrequest('Can\'t link to group');
            }

        }
        else if (item.type === 'activity') {
            //error checking
            if (item.linked_group) {
                throw Boom.badrequest('Can\'t link to group');
            }
        }
        else if (item.type === 'group') {
            //error checking
            if (item.linked_group) {
                throw Boom.badrequest('Can\'t link to group');
            }
        }
        else { //event
            //error checking
            if (!item.linked_place) {
                throw Boom.badrequest('No place linked to event');
            }
        }

        await this.db.items.updateOne({ id: request.params.id }, item);
        const returneditem = await this.db.items.byid({ id: request.params.id });
        await forEach(tags, async (tag) => {

            const found_tag = await this.db.item_tags.findOne({ item_id: returneditem.id, tag_name: tag.name });
            if (found_tag) {
                await this.db.item_tags.destroy({ item_id: returneditem.id, tag_name: tag.name });
            }
            else {
                await this.db.item_tags.insert({ item_id: returneditem.id, tag_name: tag.name });
            }
        });
        await forEach(linked_items, async (link_item) => {

            const found_link = await this.db.links.findOne({ item_id: returneditem.id, linked_item_id: link_item.id });
            if (found_link) {
                await this.db.links.destroy({ item_id: returneditem.id, linked_item_id: link_item.id });
            }
            else {
                await this.db.links.insert({ item_id: returneditem.id, linked_item_id: link_item.id });
            }
        });

        const founditems = await this.db.items.byid({ id: returneditem.id });
        const links = await this.db.links.getlinks({ id: founditems.id },['name']);
        returneditem.linked_items = links.linked_item;

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
