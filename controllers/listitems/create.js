'use strict';

const Joi = require('joi');
const Boom = require('boom');
const Schema = require('../../lib/schema');
const swagger = Schema.generate(['403','404']);
module.exports = {
    description: 'Add list item',
    tags: ['api', 'users'],
    validate: {
        payload: {
            item_id: Joi.number().required(),
            list_id: Joi.string().guid().required(),
            order: Joi.string().required()
        },
        headers: Joi.object({
            'authorization': Joi.string().required()
        }).unknown()
    },
    handler: async function (request, reply) {
        const credentials = request.auth.credentials;
        let foundlist = await this.db.lists.findOne({ id: request.payload.list_id });
        let founditem = await this.db.items.byid({ id: request.payload.item_id });

        if (!founditem) {
            throw Boom.notFound("Item not found");
        }
        if (!foundlist) {
            throw Boom.notFound("List not found");
        }
        if (foundlist.owner != credentials.id) {
            console.log(foundlist.owner +"--"+credentials.id)
            throw Boom.forbidden();
        }

        await this.db.list_items.insert(request.payload);
        return reply({ message: "item inserted into list" });
    }
};