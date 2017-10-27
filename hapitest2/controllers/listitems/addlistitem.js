'use strict';

const Joi = require('joi');
const Boom = require('boom');

module.exports = {
    description: 'Add list item',
    tags: ['api', 'users'],
    validate: {
        payload: {
            item_id: Joi.number().required(),
            list_id: Joi.string().guid().required(),
            order: Joi.string().required()
        }
    },
    handler: async function (request, reply) {
        const credentials = request.auth.credentials;

        
        let foundlist = await this.db.lists.byid(request.payload.listid);
        let founditem = await this.db.items.byid(request.payload.itemid);
        if(!founditem){
            throw Boom.notFound("Item not found");
        }
        if(!foundlist){
            throw Boom.notFound("List not found");
        }
    
        if(foundlist.owner!=credentials.id){
            throw Boom.forbidden();
        }
        await this.db.listitems.insert(request.payload);
        return reply("item inserted in the list");
    }
  };