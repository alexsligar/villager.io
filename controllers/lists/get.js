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

        let list = await this.db.lists.findOne({ id: request.params.id });

        if (!list) {
            throw Boom.notFound('List was not found.');
        }
        else {
            list = await this.db.list_items.by_list_id({ id: list.id });
        }

        if (list.length < 1) {
            return reply('List is empty').code(404);
        }
       
        await forEach(list, async (item) => {

            const linked_items_var = await this.db.linked_items.getlinks({ id: item.id },['name']);
            item.linked_items = linked_items_var.linked_item;
        });

        return reply({ data: list });
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
