'use strict';

const Joi = require('joi');
const Boom = require('boom');
const uuid = require('uuid').v4;

const Schema = require('../../lib/schema');
const swagger = Schema.generate();

module.exports = {
    description: 'Returns users lists',
    tags: ['api', 'public'],
    auth: false,
    validate: {
        params: {
            username: Joi.string().required()
        }
    },
    handler: async function (request, reply) {

        const user = await this.db.users.findOne({ username: request.params.username });
        if (!user) {
            throw Boom.notFound();
        }
        const userlists = await this.db.lists.getAllByOwner({ owner: user.id });
        if (!userlists) {
            throw Boom.notFound();
        }
        return reply({ data: userlists });
    },
    response: {
        status: {
            200: {
                data: Joi.array().items(Joi.object({
                    id: Joi.string().guid().example(uuid()),
                    name: Joi.string().required().example('mon nom est'),
                    description: Joi.string().required().example('description described descriptively').allow(null)
                }))
            }
        }
    },
    plugins: {
        'hapi-swagger': swagger
    }
};
