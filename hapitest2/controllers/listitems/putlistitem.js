'use strict';

const Joi = require('joi');
const Boom = require('boom');

module.exports = {
    description: 'Put list item',
    tags: ['api', 'users'],
    handler: async function (request, reply) {
        let foundlist = await this.db.lists.find(request.payload.listid);
        let founditem = await this.db.lists.find(request.payload.itemid);
        if(!founditem){
            throw Boom.notFound("Item not found");
        }
        if(!foundlist){
            throw Boom.notFound("List not found");
        }
        await this.db.listitems.update(request.payload);
        return reply("list item updated");
    }
  };