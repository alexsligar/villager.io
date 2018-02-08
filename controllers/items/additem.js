'use strict';

const Joi = require('joi');
const Boom = require('boom');
const Schema = require('../../lib/schema');
const swagger = Schema.generate();

module.exports = {
    description: 'Add item',
    tags: ['api', 'items'],
    validate: {
        payload: Schema.additem,
        headers: Joi.object({
            'authorization': Joi.string().required()
        }).unknown()
    },
    handler: async function (request, reply) {

      const credentials = request.auth.credentials;

      let payload = request.payload;

      let inTable = await this.db.items.find({name: payload.name});

      if (inTable.length > 0) {
          throw Boom.conflict(`Item ${inTable} already exists`);
      }

      if (!request.payload.name) {
        throw Boom.badRequest("No name given");
      } else if (request.payload.type != "place" && request.payload.type != "group" && request.payload.type != "activity" && request.payload.type != "event") {
        throw Boom.badRequest("Invalid type");
      }

      if (request.payload.start_date && request.payload.end_date) throw Boom.badRequest("Only event can have start and end dates");

      switch(request.payload.type) {
        case "event":
          if (!request.payload.start_date) throw Boom.badRequest("Event must have a start date");
          break;
        
        case "place":
          if (request.payload.linked_place)  throw Boom.badRequest("Can't link to place");
          if (request.payload.linked_group)  throw Boom.badRequest("Can't link to group");
          break;

        case "activity":
          if (request.payload.linked_group) throw Boom.badRequest("Can't link to group");

          break;

        case "group":
          if (request.payload.linked_group) throw Boom.badRequest("Can't link to group");

          break;
      }

    let returneditem = await this.db.items.insert(payload);

    await this.db.item_owners.insert({ item_id: returneditem.id, username: credentials.username });

    return reply({ data: returneditem });
  },

  response: {
    status: {
      200: Schema.item_response
    }
  },

  plugins: {
    'hapi-swagger': swagger
  }
};