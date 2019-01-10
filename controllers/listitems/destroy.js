'use strict';

const Joi = require('joi');
const Boom = require('boom');
// const Schema = require('../../lib/schema');
// const swagger = Schema.generate(['403','404']);

module.exports = {
    description: 'Add list item',
    tags: ['api', 'lists'],
    validate: {
        payload: { item_id: Joi.number().required(), list_id: Joi.string().guid().required() },
        headers: Joi.object({ 'authorization': Joi.string().required() }).unknown()
    },
    handler: async function (request, reply) {

        const credentials = request.auth.credentials;
        const { list_id, item_id } = request.payload;
        const foundlist = await this.db.lists.findOne({ id: list_id });
        const founditem = await this.db.items.findOne({ id: item_id });

        if (!founditem) {
            throw Boom.notFound('Item not found');
        }

        if (!foundlist) {
            throw Boom.notFound('List not found');
        }

        if (foundlist.owner !== credentials.username) {
            throw Boom.unauthorized();
        }

        const foundlistitem = await this.db.list_items.findOne({ item_id, list_id });

        await this.db.list_items.destroy({ id: foundlistitem.id });
        return reply({ message: 'Item deleted from list' });
    }
};
