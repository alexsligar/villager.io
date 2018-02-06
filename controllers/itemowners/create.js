'use strict';

const Joi = require('joi');
const Boom = require('boom');
const Schema = require('../../lib/schema');
const swagger = Schema.generate();

module.exports = {
  description: 'Add owner x item relation',
  tags: ['api', 'itemowners'],
  validate: {
      payload: Schema.itemowners,
      headers: Joi.object({
          'authorization': Joi.string().required()
      }).unknown()
  },
  handler: async function (request, reply) {

    const credentials = request.auth.credentials;

// -------------------- Variables --------------------------------------------- //
    let { user_id, item_id } = request.payload;
    let user = null, item = null, itemowner = null;

// -------------------- Checks if payload exists in Tables -------------------- //
    // Searches users table by id
    user = await this.db.users.findOne({ id: user_id });
    // Searches items table by id
    item = await this.db.items.findOne({ id: item_id });

    /**
     * Checks if user/item exists in their table and throws an error if they do not.
     */
    if (!user && !item) {
      throw Boom.conflict("User and item does not exist!");
    } else if (!user) {
      throw Boom.conflict("User does not exist!");
    } else if (!item) {
      throw Boom.conflict("Item does not exist!");
    }

// -------------------- Checks if owner/item relation already exists in table -- //
    // Searches item_owners table by user_id and item_id
    itemowner = await this.db.item_owners.findOne({ user_id, item_id });

    /**
     * Checks if user/item relation exists in table and throws an error if they do.
     * Otherwise, inserts relation into table
     */
    if (itemowner) {
      throw Boom.conflict("User is already an owner of that item!");
    } else {
      await this.db.item_owners.insert({ user_id, item_id });
    }

    return reply({ data: request.payload });
  },

  // response: {
  //   status: {
  //     200: Schema.item_response
  //   }
  // },

  plugins: {
    'hapi-swagger': swagger
  }
};