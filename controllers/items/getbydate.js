const Joi = require('joi');
const Boom = require('boom');
const server = require('../../server');
const Schema = require('../../lib/schema');
const swagger = Schema.generate(['404']);

module.exports = {
    description: 'Returns all items created within time period given.',
    tags: ['api', 'public'],
    handler: async function (request, reply) {

      let from_date, founditems;
      let { days } = request.params;
      from_date = new Date();
      from_date.setDate(from_date.getDate() - days);
      founditems = await this.db.items.date_query({ from_date });
      return reply({ data: founditems });
    },
    response: {
      status: {
        200: Schema.items_response
      }
    },
    plugins: {
      'hapi-swagger': swagger
    }
};