'use strict';

const JWT = require('jsonwebtoken');
const Schema = require('../../lib/schema');
const Joi = require('joi');
const Boom = require('boom');
const swagger = Schema.generate();
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
    handler: async function (request, reply) {
        let user = await this.db.users.findOne({username: request.payload.username});
        if(!user||request.payload.password!=user.password)
        {
            throw Boom.forbidden("Incorrect username or password")
        }
        const token = JWT.sign( JSON.stringify(user) , Config.auth.secret, Config.auth.options);
        return reply({token: token});
    }
  };