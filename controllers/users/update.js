'use strict';

const Boom = require('boom');
const Schema = require('../../lib/responseSchema');
const RequestSchema = require('../../lib/requestSchema');
const Bcrypt = require('bcrypt');

const swagger = Schema.generate(['401', '404', '409']);

module.exports = {
    description: 'update user',
    tags: ['api', 'users'],
    validate: {
        payload: RequestSchema.userUpdatePayload,
        headers: RequestSchema.tokenRequired
    },
    handler: async function (request, reply) {

        const credentials = request.auth.credentials;
        let user = await this.db.users.findOne({ username: request.params.username });

        if (!user) {
            throw Boom.notFound('User not found');
        }

        if (user.id !== credentials.id) {
            throw Boom.unauthorized('User is not permitted to edit this account');
        }

        user = request.payload;
        if (user.username) {
            const takenUsername = await this.db.users.findOne({ username: user.username }, ['username']);
            if (takenUsername) {
                throw Boom.conflict(`Username ${ takenUsername.username } already exists`);
            }
        }

        if (user.email) {
            const takenEmail = await this.db.users.findOne({ email: user.email }, ['email']);
            if (takenEmail) {
                throw Boom.conflict(`Email ${ takenEmail.email } already exists`);
            }
        }

        if (user.password) {
            user.password = await Bcrypt.hash(user.password, 10);
        }

        //might have to logout user if they change password
        user = await this.db.users.updateOne({ id: credentials.id }, user);
        delete user.password;
        return reply({ data: { user } });
    },
    response: {
        status: {
            200: Schema.user_update_response
        }
    },
    plugins: {
        'hapi-swagger': swagger
    }
};
