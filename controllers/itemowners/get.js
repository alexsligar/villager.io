'use strict';
const Joi = require('joi');
const Boom = require('boom');
const server = require('../../server');
const Schema = require('../../lib/schema');
const swagger = Schema.generate(['404']);

module.exports = {
  description: 'Returns entity containing an owner/item relation',
  tags: ['api', 'public'],
  auth: false,
  handler: async function (request, reply) {

    let { id } = request.params;

    let relation = await this.db.item_owners.findOne({id});
    
    if (!relation) {
        throw Boom.notFound();
    }

    return reply({ data: relation });
  },
  // response: {
  //     status: {
  //         200: Schema.items_response
  //     }
  // },
  plugins: {
      'hapi-swagger': swagger
  }
};