'use strict';

const Joi = require('joi');
const Boom = require('boom');
const Schema = require('../../lib/schema');
const swagger = Schema.generate(['404']);

module.exports = {
    description: 'Returns users favorite list',
    tags: ['api', 'public'],
    auth: false,
    validate: {
        params: {
            username: Joi.string().required()
        }
    },
    auth: false,  
    handler: async function (request, reply) {
        let user = await this.db.users.findOne({username: request.params.username});
        if (!user) {
            throw Boom.notFound("user not found");
        }
        let foundlist = await this.db.list_items.by_list_id({id: user.id});
        if(!foundlist[0]){
            return reply("User's favorite list is empty").code(404)//code to return 404?? 204? 
        }
        else{
           return reply({data: foundlist}); 
        }
        
    },
    response: {
        status: {
            200: Schema.favorite_list_response
        }
    },
    plugins: {
        'hapi-swagger': swagger
    }
  };