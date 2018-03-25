'use strict';

const Joi = require('joi');
const Boom = require('boom');
// const server = require('../../server');
const Schema = require('../../lib/schema');
const swagger = Schema.generate(['404','401']);

module.exports = {
    description: 'Deletes owner/item relation from table',
    tags: ['api', 'mod'],
    validate: {
        payload: Schema.itemowner,
        headers: Joi.object({ 'authorization': Joi.string().required() }).unknown()
    },
    handler: async function (request, reply) {

        // -------------------- Variables --------------------------------------------- //
        const { item_id, username } = request.payload;
        const credentials = request.auth.credentials;
        if (credentials.role === 'user') {
            throw Boom.unauthorized('Not permitted use this feature');
        }
        // -------------------- Checks if relation exists in Tables ------------------- //
        const relation = await this.db.item_owners.findOne({ username, item_id });

        /**
         * If relation does not exist, throw an error.
         * Else, remove relation from the table and output a message.
         */
        if (!relation) {
            throw Boom.notFound();
        }
        else {
            await this.db.item_owners.destroy({ username, item_id });
            return reply(null).code(204);
        }
    },
    response: {
        status: {
            204: Joi.only(null).label('Null')
        }
    },
    plugins: {
        'hapi-swagger': swagger
    }
};
