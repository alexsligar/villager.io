'use strict';
const Joi = require('joi');
const Boom = require('boom');
// const server = require('../../server');
const Schema = require('../../lib/schema');
const swagger = Schema.generate(['404']);

module.exports = {
    description: 'Returns all items by tag',
    tags: ['api', 'public'],
    auth: false,
    validate: {
        params: {
            name: Joi.string().required()
        }
    },
    handler: async function (request, reply) {

        const name = request.params.name;
        const founditems = await this.db.items.getbytag({ name });
        if (!founditems[0]) {
            throw Boom.notFound();
        }

        return reply({ data: founditems });
    },
    response: {
        status: {
            200: {
                data: Joi.array().items(Joi.object({
                    name: Joi.string().required().example('Name'),
                    location: Joi.string().required().example('An address'),
                    type: Joi.any().valid('activity', 'place', 'event', 'group').example('place'),
                    start_date: Joi.date().optional().allow(null),
                    end_date: Joi.date().optional().allow(null)
                }))
            }
        }
    },
    plugins: {
        'hapi-swagger': swagger
    }
};
