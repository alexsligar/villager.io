'use strict';

const Joi = require('joi');
const Boom = require('boom');
const Schema = require('../../lib/schema');
const swagger = Schema.generate();

module.exports = {
    description: 'Add item',
    tags: ['api', 'users'],
    handler: async function (request, reply) {

        if(!request.payload.name)
        {
            throw Boom.badRequest("No name given");
        }
        else if(request.payload.type!="place"&&request.payload.type!="group"&&request.payload.type!="activity"&&request.payload.type!="event"){
            throw Boom.badRequest("Invalid type");
        }
        Schema.fullitem=request.payload;
        Schema.fullitem.owner=request.params.id;
        
        await this.db.items.insert(Schema.fullitem);
       
        return reply(Schema.fullitem);
    }
  };