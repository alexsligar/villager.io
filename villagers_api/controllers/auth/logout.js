'use strict';
const Joi = require('joi');
const JWT = require('jsonwebtoken');
const Boom = require('boom');

const Schema = require('../../lib/schema');
const swagger = Schema.generate(['401']);

module.exports = {
    description: 'logout user',
    tags: ['api', 'auth'],
    validate: {
      headers: Joi.object({
          'authorization': Joi.string().required()
      }).unknown()
  },
    handler: async function (request, reply) {
      
          const user = request.auth.credentials;
          const logout = new Date();
      
          await this.db.users.updateOne({ id: user.id }, { logout });
      
          return reply(null).code(204);
      },
      response: {
        status: {
          204: Joi.only(null).label('Null')
        }
    }, 
    plugins: {
        'hapi-swagger': swagger
    }
  };