'use strict';

const Schema = require('../../lib/schema');

const swagger = Schema.generate(['404']);

module.exports = {
    description: 'list tags',
    tags: ['api', 'tags'],
    auth: false,
    handler: async function (request, reply) {

        const listTags = await this.db.tags.find();

        return reply({ data: listTags });
    },
    plugins: {
        'hapi-swagger': swagger
    }
};
