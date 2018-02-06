'use strict';
const Joi = require('joi');
const Boom = require('boom');
const server = require('../../server');
const Schema = require('../../lib/schema');
const swagger = Schema.generate(['404']);

module.exports = {
  description: 'Returns table of item owners',
  tags: ['api', 'public'],
  auth: false,
  handler: async function (request, reply) {

    // Searches item_owners table for item
    let founditems = await this.db.item_owners.find();
    
    if (!founditems) {
        throw Boom.notFound();
    }

    return reply({ data: founditems });
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