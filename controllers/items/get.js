'use strict';

const Joi = require('joi');
const Boom = require('boom');
// const server = require('../../server');
const Schema = require('../../lib/schema');

const swagger = Schema.generate(['404']);

module.exports = {
    description: 'Returns item by id',
    tags: ['api', 'items' ,'public'],
    auth: false,
    validate: {
        params: {
            id: Joi.number().required()
        }
    },
    handler: async function (request, reply) {

        const foundItems = await this.db.items.byid({ id: request.params.id });

        if (!foundItems) {
            throw Boom.notFound();
        }

        // const starsCount = await this.db.items.countingstars({ id: foundItems.id });
        // const listCount = await this.db.items.countinglists({ id: foundItems.id });

        // foundItems.starred_number = Number(starsCount.count);
        // foundItems.list_number = Number(listCount.count);

        const links = await this.db.linked_items.getlinks({ id: foundItems.id },['name']);
        foundItems.linked_items = links.linked_item;

        return reply({ data: foundItems });
    },
    // response: {
    //     status: {
    //         200: Schema.item_response
    //     }
    // },
    plugins: {
        'hapi-swagger': swagger
    }
};
