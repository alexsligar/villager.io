'use strict';

const Joi = require('joi');
const Boom = require('boom');
const Schema = require('../../lib/schema');

const swagger = Schema.generate(['401', '404', '400']);

module.exports = {
    description: 'Merge item',
    tags: ['api', 'mod'],
    validate: {
        headers: Joi.object({ 'authorization': Joi.string().required() }).unknown(),
        payload: Joi.object({ 'item_id': Joi.array().items(Joi.number()) })
    },
    handler: async function (request, reply) {

        const credentials = await this.db.users.findOne({ id: request.auth.credentials.id });
        if (credentials.role === 'user') {
            throw Boom.unauthorized('Not permitted use this feature');
        }
        //let numItems = request.payload.ids.length();

        const item_id = request.payload.item_id;

        await this.db.list_items.update({ item_id: item_id[1] },{ item_id: item_id[0] });
        await this.db.item_owners.update({ item_id: item_id[1] },{ item_id: item_id[0] });
        await this.db.item_tags.destroy({ item_id: item_id[1] });

        // console.log( await this.db.list_items.find({item_id: 2}))
        // console.log( await this.db.items.find({id: 2}))
        await this.db.items.destroy({ id: item_id[1] });

        // async function asyncForEach(array, callback) {
        //     for (let index = 0; index < array.length; index++) {
        //       await callback(array[index], index, array)
        //     }
        //   }

        // asyncForEach(item_id, async (id) => {
        //     await this.db.list_items.update(id, {item_id: item_id[0]});
        //   })

        return reply({ message: 'Items Merged' });
    },
    response: {
        status: {
            200: Schema.message_response
        }
    },
    plugins: {
        'hapi-swagger': swagger
    }
};
