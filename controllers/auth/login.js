'use strict';

const JWT = require('jsonwebtoken');
const Joi = require('joi');
const Boom = require('boom');
const Schema = require('../../lib/schema');
const swagger = Schema.generate(['401']);
const Config = require('getconfig');

module.exports = {
    description: 'Login user',
    tags: ['api', 'auth'],
    auth: false,
    validate: {
        payload: {
            username: Joi.string().required(),
            password: Joi.string().required()
        }
    },
    handler: async function (request, reply){

        const find_user = await this.db.users.findOne({ username: request.payload.username, password: request.payload.password }, ['id']);
        if (!find_user) {
            throw Boom.unauthorized('Username or password is invalid');
        }
        else {
            find_user.timestamp = new Date();
            const token = JWT.sign({ ...find_user }, Config.auth.secret, Config.auth.options);
            return reply({ data: { token } });
        }
    },
    response: {
        status: {
            200: Joi.object({ data:{ token: [Joi.string().example('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZmMGMzOGNiLTY1YzItNGRkMi1hMmU0LWJhNjBhYmM0NjBlMSIsInRpbWVzdGFtcCI6IjIwMTgtMDItMjZUMjM6NTQ6MTUuNDU1WiIsImlhdCI6MTUxOTY4OTI1NX0.3qXMbtdRYrC4Tlh14ykyOtt3B8RmtM9t3rVlIs7rysM'), Joi.number()] } })
        }
    },
    plugins: {
        'hapi-swagger': swagger
    }
};
