'use strict';

const JWT = require('jsonwebtoken');
const Config = require('getconfig');
const Joi = require('joi');
const Boom = require('boom');
const Schema = require('../../lib/schema');
const swagger = Schema.generate(['404', '409']);

module.exports = {
    description: 'update user',
    tags: ['api', 'users'],
    validate: {
        payload: {
            name: Joi.string().optional(),
            username: Joi.string().optional(),
            password: Joi.string().optional(),
            email: Joi.string().optional(),
            bio: Joi.string().optional()
        }
    },
    handler: async function (request, reply) {

        const credentials = request.auth.credentials;
        let user = await this.db.users.findOne({ id: credentials.id });

        if (!user) {
            throw Boom.notFound('User not found');
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

        await this.db.users.updateOne({ id: credentials.id }, user);
        user = await this.db.users.findOne({ id: credentials.id });
        const token = JWT.sign( JSON.stringify(user) , Config.auth.secret, Config.auth.options);
        return reply({ data: { user, token } });
    },
    response: {
        status: {
            200: Schema.user_update_repsonse
        }
    },
    plugins: {
        'hapi-swagger': swagger
    }
};
