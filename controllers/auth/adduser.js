'use strict';

const uuid = require('uuid').v4;
const Joi = require('joi');
const Boom = require('boom');
const Schema = require('../../lib/schema');

const swagger = Schema.generate(['409']);

module.exports = {
    description: 'Create a new user',
    tags: ['api', 'auth'],
    auth: false,
    validate: {
        payload: {
            name: Joi.string().optional().example('totally not a robot').allow(null),
            username: Joi.string().required().example('seriously'),
            email: Joi.string().required().example('real@email'),
            bio: Joi.string().optional().example('I am a real person').allow(null),
            password: Joi.string().required().example('password')
        }
    },
    handler: async function (request, reply) {

        const takenUsername = await this.db.users.findOne({ username: request.payload.username }, ['username']);
        if (takenUsername) {
            throw Boom.conflict(`Username ${takenUsername.username} already exists`);
        }

        const takenEmail = await this.db.users.findOne({ email: request.payload.email }, ['email']);
        if (takenEmail) {
            throw Boom.conflict(`Email ${takenEmail.email} already exists`);
        }

        const user = await this.db.users.insert(request.payload);
        return reply({ data: user });
    },
    response: {
        status: {
            200: Joi.object({
                data: {
                    id: Joi.string().guid().example(uuid()),
                    name: Joi.string().optional().example('totally not a robot'),
                    username: Joi.string().required().example('seriously'),
                    password: Joi.string().required().example('I am'),
                    role: Joi.any().valid('mod', 'user', 'admin'),
                    email: Joi.string().required().example('real@email'),
                    bio: Joi.string().optional().example('I am a real person').allow(null),
                    logout: Joi.date().timestamp().allow(null),
                    created_at: Joi.date().timestamp(),
                    updated_at: Joi.date().timestamp()
                }
            })
        }
    },
    plugins: {
        'hapi-swagger': swagger
    }
};
