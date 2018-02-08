'use strict';
const Joi = require('joi');
const Boom = require('boom');
const server = require('../../server');
const Schema = require('../../lib/schema');
const swagger = Schema.generate(['404']);

module.exports = {
    description: 'Returns item by id',
    tags: ['api', 'public'],
    auth: false,
    validate: {
        params: {
            id: Joi.number().required()
        }
    },
    handler: async function (request, reply) {

        let founditems = await this.db.items.byid({id: request.params.id});
        if (!founditems) {
            throw Boom.notFound();
        }

        let countstars = await this.db.items.countingstars({ id: founditems.id });
        let countlist = await this.db.items.countinglists({ id: founditems.id });
        founditems['starred_number'] = Number(countstars.count);
        founditems['list_number'] = Number(countlist.count);

        return reply({ data: founditems });
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