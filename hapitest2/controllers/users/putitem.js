'use strict';

const Joi = require('joi');
const Boom = require('boom');

module.exports = {
    description: 'Put item',
    tags: ['api', 'users'],
    handler: async function (request, reply) {
        await this.db.items.updateOne(request.params.listid,request.payload);
        return reply("item updated");
    }
  };