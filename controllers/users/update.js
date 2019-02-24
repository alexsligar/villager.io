'use strict';

const Boom = require('boom');
const Schema = require('../../lib/responseSchema');
const RequestSchema = require('../../lib/requestSchema');
const Bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');
const Config = require('getconfig');

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

        const updatedUser = request.payload;
        let reissueToken = false;
        if (updatedUser.username && updatedUser.username !== user.username) {
            const usernameExists = await this.db.users.byusername({ username: updatedUser.username });
            if (usernameExists) {
                throw Boom.conflict(`Username ${ updatedUser.username } already exists`);
            }

            reissueToken = true;
        }

        if (updatedUser.email && updatedUser.email !== user.email ) {
            const emailExists = await this.db.users.byEmail({ email: updatedUser.email });
            if (emailExists) {
                throw Boom.conflict(`Email ${ updatedUser.email } already exists`);
            }
        }

        if (updatedUser.password) {
            const match = await Bcrypt.compare(updatedUser.oldPassword, user.password);
            if (!match) {
                throw Boom.unauthorized('Old password invalid');
            }

            updatedUser.password = await Bcrypt.hash(user.password, 10);
            reissueToken = true;
        }

        user = await this.db.users.updateOne({ id: credentials.id }, updatedUser);
        delete user.password;
        if (reissueToken) {
            const token = Jwt.sign(
                { id: user.id, username: user.username, timestamp: new Date() },
                Config.auth.secret,
                Config.auth.options
            );
            return reply({ data: { user, token } });
        }

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
