'use strict';

// const Joi = require('joi');
const Boom = require('boom');
// const server = require('../../server');
const Schema = require('../../lib/schema');
const swagger = Schema.generate(['404']);

module.exports = {
    description: 'Returns table of item owners',
    tags: ['api', 'mod'],
    auth: false,
    handler: async function (request, reply) {

        // -------------------- Variables --------------------------------------------- //
        let list = null;

        // -------------------- Searches item_owners table for item ------------------- //
        list = await this.db.item_owners.find();

        if (!list) {
            throw Boom.notFound();
        }

        return reply({ data: list });
    },
    // response: {
    //     status: {
    //         200: Schema.items_response
    //     }
    // },
    plugins: {
        'hapi-swagger': swagger
    }
};
