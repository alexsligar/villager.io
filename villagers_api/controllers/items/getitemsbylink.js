const Joi = require('joi');
const Boom = require('boom');
const server = require('../../server');
const Schema = require('../../lib/schema');
const swagger = Schema.generate(['404']);

module.exports = {
    description: 'Returns all items linked to id',
    tags: ['api', 'public'],
    auth: false,
    validate: {
        params: {
            id: Joi.number().required()
        }
    },
    handler: async function (request, reply) {
        var founditems = await this.db.items.get_by_link({ id: request.params.id });
        if (!founditems[0]) {
            throw Boom.notFound();
        }
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