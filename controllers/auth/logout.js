'use strict';

const Joi = require('joi');
const Schema = require('../../lib/schema');
// const Config = require('getconfig');
const swagger = Schema.generate(['401']);

module.exports = {
    description: 'Log out',
    tags: ['api', 'auth'],
    handler: async function (request, reply) {

        const user = request.auth.credentials;
        
        const logout = new Date();

        await this.db.users.updateOne({ id: user.id }, { logout });

        return reply(null).code(204);
    },
    response: {
        status: {
            204: Joi.only(null).label('Null')
        }
    },
    plugins: {
        'hapi-swagger': swagger
    }
};
