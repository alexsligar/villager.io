'use strict';

const Joi = require('joi');
const Boom = require('boom');
const Schema = require('../../lib/schema');
const swagger = Schema.generate(['404']);

module.exports = {
    description: 'Returns all lists',
    tags: ['api', 'lists', 'public'],
    auth: false,
    handler: async function (request, reply) {

        const foundlists = await this.db.lists.getall();

        if (!foundlists[0]) {
            throw Boom.notFound();
        }

        return reply({ data: foundlists });
    },
    response: {
        status: {
            200: {
                data: Joi.array().items(
                    Joi.object({
                        id: Joi.string().guid().required().example('269fffd8-a550-4871-8af2-db6eda3d6fb4'),
                        name: Joi.string().required().example('Best Restaurants'),
                        owner: Joi.string().guid().required().example('8865b22c-a732-4381-9ba6-e9bc32fc9b99'), 
                        description: Joi.string().example('null').allow(null),
                        items: Joi.array().items()
                    })
                )
            }
        }
    },
    plugins: {
        'hapi-swagger': swagger
    }
};
