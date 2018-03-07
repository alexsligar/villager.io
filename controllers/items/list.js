'use strict';
// const Joi = require('joi');
const { forEach } = require('p-iteration');
const Boom = require('boom');
// const server = require('../../server');
const Schema = require('../../lib/schema');
const swagger = Schema.generate(['404']);

module.exports = {
    description: 'Returns all items',
    tags: ['api', 'items', 'public'],
    auth: false,
    handler: async function (request, reply) {

        const founditems = await this.db.items.getall();
        if (!founditems[0]) {
            throw Boom.notFound();
        }
        await forEach(founditems, async (item) => {

            const links = await this.db.links.getlinks({ id: item.id },['name']);
            item.linked_items = links.linked_item;
        });
       
         /* Add pagination */
        return reply({ data: founditems });
    },
    response: {
        status: {
            200: Schema.items_response
        }
    },
    plugins: {
        'hapi-swagger': swagger
    }
};
