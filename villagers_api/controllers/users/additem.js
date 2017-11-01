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
            linked_place: Joi.string().optional(),
            start_date: Joi.date().optional(),
            end_date: Joi.date().optional()
        }
    },
    handler: async function (request, reply) {

        const credentials = request.auth.credentials;
        
        if(!request.payload.name) {
            throw Boom.badRequest("No name given");
        }
        else if(request.payload.type!="place"&&request.payload.type!="group"&&request.payload.type!="activity"&&request.payload.type!="event"){
            throw Boom.badRequest("Invalid type");
        }
        
        if(request.payload.type!="event")
        {
            if(!request.payload.start_date&&!request.payload.end_date){}
            else{       
                throw Boom.badRequest("Only event can have start and end dates")
            }
        }
        else {
            if(!request.payload.start_date) {
                throw Boom.badRequest("Event must have a start date")
            }
        }
        let returneditem;
        
        if(request.payload.type=="place") {
            //error checking
            if(!request.payload.linked_place) {}
            else {
                throw Boom.badRequest("Can't link to place")
            }
            if(!request.payload.linked_group) {}
            else {
                throw Boom.badRequest("Can't link to group")
            }
            
        }
        else if (request.payload.type=="activity") {
            //error checking
            if(!request.payload.linked_group) {}
            else {
                throw Boom.badRequest("Can't link to group")
            }
        }
        else if(request.payload.type=="group") {
            //error checking
            if(!request.payload.linked_group) {}
            else {
                throw Boom.badRequest("Can't link to group")
            }
        }
        else { //event
            //error checking
            if(!request.payload.linked_place) {
                throw Boom.badRequest("No place linked to event")
            }
        }
        returneditem = await this.db.items.insert(request.payload); 
    
        await this.db.owners.insert({item_id: returneditem.id,user_id: credentials.id});
       
        return reply(returneditem);
    }
  };