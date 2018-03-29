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
        payload: Schema.updateitem,
        headers: Joi.object({
            'authorization': Joi.string().required()
        }).unknown()
    },
    handler: async function (request, reply) {

        const tags = request.payload.tags;
        const linked_items = request.payload.linked_items;

        const credentials = request.auth.credentials;
        const temp = request.payload;

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

        if (temp.location) {
            item.location = temp.location;
        }
        if (temp.start_date) {
            item.start_date = temp.start_date;
        }
        if (temp.end_date) {
            item.end_date = temp.end_date;
        }
        if (temp.type){
            item.type = temp.type;
        }
        if (temp.name) {
            item.name = temp.name;
        }

        if (item.type !== 'event') {
            if (item.start_date || item.end_date) {
                throw Boom.badRequest('Only event can have start and end dates');
            }
        }

        let placeLinked = false;

        if (linked_items) {
            await forEach(linked_items, async (linkedItem) => {

                const foundItem = await this.db.items.findOne({ id: linkedItem });

                if (!foundItem) {
                    throw Boom.notFound('Attempting to link item that does not exist');
                }

                if (foundItem.type === 'place') {
                    placeLinked = true;
                }

                if (item.type === 'place') {
                //error checking
                    if (placeLinked) {
                        throw Boom.badRequest('Can\'t link place to place');
                    }

                    if (foundItem.type === 'group') {
                        throw Boom.badRequest('Can\'t link place to group');
                    }
                }

                if (item.type === 'activity') {
                //error checking
                    if (foundItem.type === 'group') {
                        throw Boom.badRequest('Can\'t link activity to group');
                    }
                }

                if (item.type === 'group') {
                //error checking
                    if (foundItem.type === 'group') {
                        throw Boom.badRequest('Can\'t link group to group');
                    }
                }
            }
            );

            if (item.type === 'event') {
            //error checking
                if (!placeLinked) {
                    throw Boom.badRequest('No place linked to event');
                }
            }
        }

        await this.db.items.updateOne({ id: request.params.id }, item);

        const returnedItem = await this.db.items.byid({ id: request.params.id });        

        if (tags) {
            var seenDuplicate = false,
            testObject = {};

            tags.map(function(item) {
                var itemPropertyName = item;
                if (itemPropertyName in testObject) {
                    throw Boom.badRequest('Duplicate tags');
                }
                else {
                testObject[itemPropertyName] = item;
                }
            });
        }
        if (linked_items) {
            var seenDuplicate2 = false,
            testObject2 = {};

            linked_items.map(function(item) {
                var itemPropertyName2 = item;
                if (itemPropertyName2 in testObject) {
                    throw Boom.badRequest('Duplicate link');
                }
                else {
                testObject[itemPropertyName2] = item;
                }
            });
        }

        if (tags) {
            await this.db.item_tags.destroy({ item_id: returnedItem.id });
            
            await forEach(tags, async (tag) => {

                const check_tags = await this.db.tags.findOne({ name: tag });
                if (!check_tags) {
                    throw Boom.badRequest(`Tag ${tag} does not exist`);
                }
                await this.db.item_tags.insert({ item_id: returnedItem.id, tag_name: tag });
            });
        }
        

        if (linked_items) {
            await this.db.linked_items.destroy({ item_id: returnedItem.id });
            
            await forEach(linked_items, async (link_item) => {
                // FIX THIS. Needs to update links, instead of toggling existence
                // Could end up deleting place required from event
                const check_link = await this.db.items.findOne({ id: link_item });
                if (!check_link) {
                    throw Boom.badRequest(`Attempting to link item that does not exist`);
                }

                const found_link = await this.db.items.findOne({ id: link_item });
                if (found_link) {
                    await this.db.linked_items.insert({ item_id: returnedItem.id, linked_item_id: link_item });
                }
            });
        }

        const returned_links = await this.db.linked_items.getlinks({ id: returnedItem.id });
        const returned_tags = await this.db.tags.gettags({ id: returnedItem.id });
        returnedItem.linked_items = returned_links.linked_items;
        returnedItem.tags = returned_tags.tags;
        return reply({ data: returnedItem });
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
