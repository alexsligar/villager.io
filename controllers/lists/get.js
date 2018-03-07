'use strict';

const Joi = require('joi');
const { forEach } = require('p-iteration');
const Boom = require('boom');
const Schema = require('../../lib/schema');
const swagger = Schema.generate(['404']);

module.exports = {
    description: 'Returns items in list by id',
    tags: ['api', 'lists', 'public'],
    validate: {
        params:{
            id: Joi.string().guid().required()
        }
    },
    auth: false,
    handler: async function (request, reply) {

        const user = await this.db.lists.findOne({ id: request.params.id });
        if (!user) {
            throw Boom.notFound('user not found');
        }
        const foundlist = await this.db.list_items.by_list_id({ id: user.id });

        if (!foundlist[0]) {
            return reply('List is empty').code(404);
        }
        await forEach(foundlist, async (item) => {

            const links = await this.db.links.getlinks({ id: item.id },['name']);
            item.linked_items = links.linked_item;
        });
        
        return reply({ data: foundlist });
    },
    response: {
        status: {
            200: Schema.list_items_response
        }
    },
    plugins: {
        'hapi-swagger': swagger
    }
};
