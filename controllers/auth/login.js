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
        const find_user = await this.db.users.findOne({ username: request.payload.username,password: request.payload.password },['id']);
        
    if (find_user) {
        
        find_user.timestamp = new Date();
        //console.log(find_user);

        const token = JWT.sign({ ...find_user}, Config.auth.secret, Config.auth.options);
        return reply({data: {token: token}});
    }
    // },
    // response: {
    //   status: {
    //     200: Schema.login_response
    //   }
  }, 
    plugins: {
        'hapi-swagger': swagger
    }
  };