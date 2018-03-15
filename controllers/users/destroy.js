'use strict';
const Joi = require('joi');
const Boom = require('boom');
// const Server = require('../../server');
const Schema = require('../../lib/schema');
const swagger = Schema.generate(['404']);

module.exports = {
    description: 'Deletes user from table',
    tags: ['api', 'mod'],
    handler: async function (request, reply) {

        // -------------------- Variables --------------------------------------------- //
        const credentials = request.auth.credentials;
        const user = await this.db.users.findOne({ username: request.params.username },['id']);
        // -------------------- Checks if user exists in table ------------------- //

        if (!user) {
            throw Boom.notFound();
        }
        if (credentials.role === 'admin' || credentials.id === user.id) {
            await this.db.users.destroy({ id: user.id });
        }
        else {
            throw Boom.unauthorized('The user is not permitted to delete this user!');
        }
        return reply(null).code(204);
    },
    response: {
        status: {
            204: Joi.only(null).label('Null')
        }
    },
    plugins: {
        'hapi-swagger': swagger
    }
};
