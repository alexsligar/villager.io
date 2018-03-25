'use strict';

const Joi = require('joi');
//const Boom = require('boom');
// const server = require('../../server');
const Schema = require('../../lib/schema');
const swagger = Schema.generate(['404']);

module.exports = {
    description: 'Returns all items created within time period given.',
    tags: ['api', 'public'],
    auth: false,
    validate: {
        params: {
            days: Joi.number().required()
        }
    },
    handler: async function (request, reply) {

        const { days } = request.params;
        const fromDate = new Date();
        fromDate.setDate(fromDate.getDate() - days);

        const foundItems = await this.db.items.date_query({ fromDate });

        /* Add pagination here */
        return reply({ data: foundItems });
    },
    /*response: {
        status: {
            200: Schema.items_response
        }
    },*/
    plugins: {
        'hapi-swagger': swagger
    }
};
