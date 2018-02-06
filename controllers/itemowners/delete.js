'use strict';
const Joi = require('joi');
const Boom = require('boom');
const server = require('../../server');
const Schema = require('../../lib/schema');
const swagger = Schema.generate(['404']);

module.exports = {
  description: 'Deletes owner/item relation from table',
  tags: ['api', 'public'],
  auth: false,
  handler: async function (request, reply) {

// -------------------- Variables --------------------------------------------- //
    let { id } = request.params;
    let relation = null;

// -------------------- Checks if relation exists in Tables ------------------- //
    relation = await this.db.item_owners.findOne({id});
    
    /**
     * If relation does not exist, throw an error.
     * Else, remove relation from the table and output a message.
     */
    if (!relation) {
        throw Boom.notFound();
    } else {
      await this.db.item_owners.destroy({ id });
      return reply({ message: "Relation was deleted" });
    }
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