'use strict';

const Joi = require('joi');
const Boom = require('boom');

const Schema = require('../../lib/schema');
const swagger = Schema.generate(['409']);

module.exports = {
    description: 'Add user',
    tags: ['api', 'auth'],
    auth: false,
    validate: {
        payload: {
            name: Joi.string().optional(),
            username: Joi.string().required(),
            password: Joi.string().required(),
            email: Joi.string().required(),
            bio: Joi.string().optional()
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
        delete user.created_at;
        delete user.updated_at;
        delete user.logout;
        //const users = Joi.array().items(public_user).label('PublicUsers');

        // const user = await this.db.users.findOne({username: request.payload.username});
        await this.db.lists.insert({ id: user.id, name: 'Starred', owner: user.id });
        return reply({ data: user });
    },
    response: {
        status: {
            200: Schema.private_response
        }
    },
    plugins: {
        'hapi-swagger': swagger
    }
};
