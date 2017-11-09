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
    handler: async function (request, reply) {
        let user = await this.db.users.findOne({username: request.payload.username});
        if(!user||request.payload.password!=user.password)
        {
            throw Boom.unauthorized("Incorrect username or password")
        }
        const token= {token: JWT.sign( JSON.stringify(user) , Config.auth.secret, Config.auth.options)};
        return reply({data: token});
    },
    response: {
      status: {
        200: Schema.login_response
      }
  }, 
    plugins: {
        'hapi-swagger': swagger
    }
  };