'use strict';

const JWT = require('jsonwebtoken');
const Boom = require('boom');

module.exports = {
    description: 'logout user',
    tags: ['api', 'user'],
   

        handler: function(request, reply) {
            
          //  request.auth.session.clear();
            return reply('user logged out');
        }
      
  };