'use strict';

//const JWT = require('jsonwebtoken');
//const Config = require('getconfig');
const Joi = require('joi');
const Boom = require('boom');
const Schema = require('../../lib/schema');
const swagger = Schema.generate(['404', '409']);

module.exports = {
    description: 'update user',
    tags: ['api', 'users'],
    validate: {
        payload: {
            name: Joi.string().optional().example('totally not a robot'),
            username: Joi.string().optional().example('seriously'),
            email: Joi.string().optional().example('real@email'),
            bio: Joi.string().optional().example('seriously i am not a robot'),
            password: Joi.string().optional().example('password')
        }
    },
    handler: async function (request, reply) {

        const credentials = request.auth.credentials;
        let user = await this.db.users.findOne({ username: credentials.username });

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
        //might have to logout user if they change password
        await this.db.users.updateOne({ id: credentials.id }, user);
        user = await this.db.users.findOne({ id: credentials.id });
        return reply({ data: { user } });
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
