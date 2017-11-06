'use strict';

const Joi = require('joi');
const Boom = require('boom');

module.exports = {
    description: 'Add list',
    tags: ['api', 'users'],
    validate: {
        payload: {
            name: Joi.string().required(),
            description: Joi.string().required()
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
        let returnlist = await this.db.lists.updateOne({id: request.params.id},list);
        return reply(returnlist);
    }
  };