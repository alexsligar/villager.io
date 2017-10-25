'use strict';

const Joi = require('joi');
const Boom = require('boom');

module.exports = {
    description: 'Add list item',
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
        await this.db.listitems.insert(request.payload);
        return reply("item inserted in the list");
    }
  };