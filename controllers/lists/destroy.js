'use strict';

const Joi = require('joi');
const Boom = require('boom');
const Schema = require('../../lib/schema');
const swagger = Schema.generate(['400']);

module.exports = {
    description: 'Delete list',
    tags: ['api', 'lists'],
    validate: {
        params: {
            id: Joi.string().guid().required(),
            headers: Joi.object({ 'authorization': Joi.string().required() }).unknown()
        }
    },
    handler: async function (request, reply) {

        const credentials = request.auth.credentials;
        const list = await this.db.lists.findOne({ id: request.params.id });
        let listItems = [];

        if (!list) {
            throw Boom.notFound('List was not found.');
        }

        if (credentials.id !== list.owner && credentials.role !== 'admin') {
            throw Boom.unauthorized('Unauthorized to delete list.');
        }

        listItems = await this.db.list_items.by_list_id({ id: list.id });

        if (listItems.length > 0) {
            throw Boom.conflict('List is not empty.');
        }

        await this.db.lists.destroy({ id: list.id });
        return reply();
    },
    plugins: {
        'hapi-swagger': swagger
    }
};
