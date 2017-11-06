'use strict';
const Joi = require('joi');
const Boom = require('boom');
const server = require('../../server');
const Schema = require('../../lib/schema');
const swagger = Schema.generate(['404']);

module.exports = {
    description: 'Returns all items',
    tags: ['api', 'users','public'],
   auth:false,
    handler: async function (request, reply) {
        
        
        var founditems = await this.db.items.byid({id: request.params.id});
        if (!founditems) {
            throw Boom.notFound();
        }   
        let countstars= await this.db.items.countingstars({id: founditems.id});
        let countlist= await this.db.items.countinglists({id: founditems.id});
        founditems['starred_number'] =countstars.count;
        founditems['list_number']=countlist.count;
        
        return reply(founditems);        
    }, 
    plugins: {
        'hapi-swagger': swagger
    }
  };