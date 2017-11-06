'use strict';

const Joi = require('joi');
const Boom = require('boom');
const Schema = require('../../lib/schema');
const swagger = Schema.generate();

module.exports = {
    description: 'Update item',
    tags: ['api', 'users'],
    validate: {
        payload: {
            name: Joi.string().required(),
            location: Joi.string().required(),
            type: Joi.any().valid("activity","place","event","group"),
            linked_group: Joi.string().optional(),
            linked_place: Joi.string().optional(),
            start_date: Joi.date().optional(),
            end_date: Joi.date().optional()
        }
    },
    handler: async function (request, reply) {
        const credentials = request.auth.credentials;
        if(credentials.role!="admin"||credentials.role!="mod"){
            let owners= await this.db.owners.validate({item_id: request.params.id, user_id:credentials.id});
            if(!owners){
                throw Boom.unauthorized("Not permitted to edit item");
            }
        }
        let item = await this.db.items.findOne({id: request.params.id});
        
        if(!item){
            throw Boom.notFound("Item not found");
        }
        item = request.payload;

        if(request.payload.type!="place"&&request.payload.type!="group"&&request.payload.type!="activity"&&request.payload.type!="event"){
            throw Boom.badrequest("Invalid type");
        }
        
        if(request.payload.type!="event")
        {
            if(!request.payload.start_date&&!request.payload.end_date){}
            else{       
                throw Boom.badrequest("Only event can have start and end dates")
            }
        }
        else {
            if(!request.payload.start_date) {
                throw Boom.badrequest("Event must have a start date")
            }
        }
        let returneditem;
        
        if(request.payload.type=="place") {
            //error checking
            if(!request.payload.linked_place) {}
            else {
                throw Boom.badrequest("Can't link to place")
            }
            if(!request.payload.linked_group) {}
            else {
                throw Boom.badrequest("Can't link to group")
            }
            
        }
        else if (request.payload.type=="activity") {
            //error checking
            if(!request.payload.linked_group) {}
            else {
                throw Boom.badrequest("Can't link to group")
            }
        }
        else if(request.payload.type=="group") {
            //error checking
            if(!request.payload.linked_group) {}
            else {
                throw Boom.badrequest("Can't link to group")
            }
        }
        else { //event
            //error checking
            if(!request.payload.linked_place) {
                throw Boom.badrequest("No place linked to event")
            }
        }

       returneditem = await this.db.items.updateOne({id: request.params.id}, item); 
    
       
        return reply(returneditem);
    }, 
    plugins: {
        'hapi-swagger': swagger
    }
  };