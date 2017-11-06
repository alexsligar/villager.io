'use strict';

const Joi = require('joi');
const Boom = require('boom');

const Schema = require('../../lib/schema');
const swagger = Schema.generate();

module.exports = {
    description: 'Returns a user by username',
    tags: ['api', 'users','public'],
    auth: false,
    handler: async function (request, reply) {
       let user = await this.db.users.findOne({username: request.params.username},['username', 'name','bio','id']);
       
        if(!user) {
            throw Boom.notFound();
        }
        
        let favorite_list = await this.db.list_items.by_list_id({id: user.id});
        delete user.id;
        return reply({user, favorite_list});
    }
  };