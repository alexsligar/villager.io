'use strict';

const Joi = require('joi');
const Boom = require('boom');
const Schema = require('../../lib/schema');
const swagger = Schema.generate();

module.exports = {
    description: 'Add item',
    tags: ['api', 'users'],
    validate: {
        payload: {
            name: Joi.string().required(),
            location: Joi.string().required(),
            type: Joi.string().required(),
            linked_group: Joi.string().optional(),
            linked_place: Joi.string().optional()
        }
    },
    handler: async function (request, reply) {

        const credentials = request.auth.credentials;
        
        if(!request.payload.name)
        {
            throw Boom.badRequest("No name given");
        }
        else if(request.payload.type!="place"&&request.payload.type!="group"&&request.payload.type!="activity"&&request.payload.type!="event"){
            throw Boom.badRequest("Invalid type");
        }
        
        let item = request.payload;
        
        let returneditem = await this.db.items.insert(item);
    
        await this.db.owners.insert({item_id: returneditem.id,user_id: credentials.id});
       
        return reply(item);
    }
  };