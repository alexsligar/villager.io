'use strict';

// const Joi = require('joi');
// const Boom = require('boom');
// const server = require('../../server');
const Schema = require('../../lib/schema');
const swagger = Schema.generate(['404']);

module.exports = {
    description: 'Returns all items created within time period given.',
    tags: ['api', 'items', 'public'],
    handler: async function (request, reply) {

        const { days } = request.params;
        const from_date = new Date();
        from_date.setDate(from_date.getDate() - days);

        const founditems = await this.db.items.date_query({ from_date });

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
