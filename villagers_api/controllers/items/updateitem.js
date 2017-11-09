'use strict';
const Joi = require('joi');
const Boom = require('boom');
const Schema = require('../../lib/schema');
const swagger = Schema.generate(['401', '404', '400']);

module.exports = {
    description: 'Update item',
    tags: ['api', 'users'],
    validate: {
        params: {
            id: Joi.number().required()
        },
        payload: Schema.additem,
        headers: Joi.object({
            'authorization': Joi.string().required()
        }).unknown()
    },
    handler: async function (request, reply) {
        const credentials = request.auth.credentials;
        if (credentials.role != "admin" || credentials.role != "mod") {
            let owners = await this.db.owners.validate({ item_id: request.params.id, user_id: credentials.id });
            if (!owners) {
                throw Boom.unauthorized("Not permitted to edit item");
            }
        }
        let item = await this.db.items.findOne({ id: request.params.id });

        if (!item) {
            throw Boom.notFound("Item not found");
        }
        item = request.payload;

        if (request.payload.type != "event") {
            if (!request.payload.start_date && !request.payload.end_date) { }
            else {
                throw Boom.badrequest("Only event can have start and end dates")
            }
        }
        else {
            if (!request.payload.start_date) {
                throw Boom.badrequest("Event must have a start date")
            }
        }
        if (request.payload.type == "place") {
            //error checking
            if (!request.payload.linked_place) { }
            else {
                throw Boom.badrequest("Can't link to place")
            }
            if (!request.payload.linked_group) { }
            else {
                throw Boom.badrequest("Can't link to group")
            }

        }
        else if (request.payload.type == "activity") {
            //error checking
            if (!request.payload.linked_group) { }
            else {
                throw Boom.badrequest("Can't link to group")
            }
        }
        else if (request.payload.type == "group") {
            //error checking
            if (!request.payload.linked_group) { }
            else {
                throw Boom.badrequest("Can't link to group")
            }
        }
        else { //event
            //error checking
            if (!request.payload.linked_place) {
                throw Boom.badrequest("No place linked to event")
            }
        }

        await this.db.items.updateOne({ id: request.params.id }, item);
        let returneditem = await this.db.items.byid({id: request.params.id})
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