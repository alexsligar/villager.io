'use strict';

const Joi = require('joi');
const Boom = require('boom');

module.exports = {
    description: 'Returns items in list by id',
    tags: ['api', 'users'],
    validate: {
        params:{
            id: Joi.string().guid().required()
        } 
    },
    auth: false,  
    handler: async function (request, reply) {
        let user = await this.db.user.findOne({id: request.params.id});
        if (!user) {
            throw Boom.notFound();
        }
        let foundlist = await this.db.list_items.by_list_id({id: user.id});
        if(!foundlist[0]){
            return reply("User's favorite list is empty").code(204)//code to return 404?? 204? 
        }
        else{
           return reply(foundlist); 
        }
        
    }
  };