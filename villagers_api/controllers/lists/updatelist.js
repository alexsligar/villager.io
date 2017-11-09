'use strict';

const Joi = require('joi');
const Boom = require('boom');
const Schema = require('../../lib/schema');
const swagger = Schema.generate(['400','400']);

module.exports = {
    description: 'Add list',
    tags: ['api', 'users'],
    validate: {
        payload: {
            name: Joi.string().required(),
            description: Joi.string().required()
        },
        params:{
            id: Joi.string().guid()
        }
    },
    handler: async function (request, reply) {
       let credentials= request.auth.credentials;
       if(credentials.role!="admin"||credentials.role!="mod"){
            let foundlist= await this.db.lists.findOne({id: request.params.id});
        
            if(foundlist.owner!=credentials.id){
                throw Boom.unauthorized("Not permitted to edit item")            
            }
        }

        if(!request.payload.name)
        {
            throw Boom.badRequest("No name provided");
        }
        let list=request.payload;
        await this.db.lists.updateOne({id: request.params.id},list);
        let returnlist= await this.db.lists.byid({id: request.params.id})
        return reply({data: returnlist});
    },
    response: {
        status: {
            200: Schema.list_response
        }
    },
    plugins: {
        'hapi-swagger': swagger
    }
  };