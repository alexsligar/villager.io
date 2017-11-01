'use strict';

const JWT = require('jsonwebtoken');
const Boom = require('boom');

module.exports = {
    description: 'logout user',
    tags: ['api', 'auth'],
    handler: async function (request, reply) {
      
          const user = request.auth.credentials;
          const logout = new Date();
      
          await this.db.users.updateOne({ id: user.id }, { logout });
      
          return reply(null).code(204);
      }
      
  };