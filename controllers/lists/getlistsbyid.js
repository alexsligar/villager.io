'use strict';

const Joi = require('joi');
const Boom = require('boom');
const Schema = require('../../lib/schema');
const swagger = Schema.generate(['404']);

module.exports = {
    description: 'Returns items in list by id',
    tags: ['api', 'public'],
    validate: {
        params:{
            id: Joi.string().guid().required()
        } 
    },
    auth: false,  
    handler: async function (request, reply) {
        let exist = await this.db.lists.findOne({id: request.params.id});
        if (!exist) {
            throw Boom.notFound();
        }
        let foundlist = await this.db.list_items.by_list_id({id: request.params.id});
        
        return reply({data: foundlist});
    },
    response: {
        status: {
            200: Schema.list_items_response
        }
    },
    plugins: {
        'hapi-swagger': swagger
    }
  };