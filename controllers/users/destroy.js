'use strict';
// const Joi = require('joi');
const Boom = require('boom');
// const Server = require('../../server');
const Schema = require('../../lib/schema');
const swagger = Schema.generate(['404']);

module.exports = {
    description: 'Deletes user from table',
    tags: ['api', 'mod'],
    handler: async function (request, reply) {

        // -------------------- Variables --------------------------------------------- //
        const credentials = await this.db.users.findOne({ id: request.auth.credentials.id });
        const { id } = request.params;
        let user = null;
        // -------------------- Checks if user exists in table ------------------- //
        try {

            user = await this.db.users.findOne({ id });
        }
        catch (err) {
            throw Boom.notFound('Invalid input!');
        }

        if (credentials.role === 'admin' || credentials.id === id) {

            /**
             * If user does not exist, throw an error.
             * Else, remove user from the table and output a message.
             */
            if (!user) {
                throw Boom.notFound();
            }
            else {
                await this.db.users.destroy({ id });
                return reply({ message: 'User was deleted' });
            }

        }
        else {
            throw Boom.unauthorized('The user is not permitted to delete this user!');
        }

    },
    // response: {
    //     status: {
    //         200: Schema.items_response
    //     }
    // },
    plugins: {
        'hapi-swagger': swagger
    }
};
