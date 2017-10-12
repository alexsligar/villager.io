'use strict';

const Joi = require('joi');
const Boom = require('boom');

module.exports = {
    description: 'Add user',
    tags: ['api', 'admin'],
    handler: async function (request, reply) {
        await this.db.users.insert(request.payload);
        const userid = await this.db.users.findOne({username: request.payload.username});
        await this.db.lists.insert({id: userid.id, name: 'Stared', owner: userid.id});
        return reply(userid);
    }
  };