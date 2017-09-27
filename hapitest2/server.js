'use strict';

const Config = require('./config');
const Hapi = require('hapi');
const Muckraker = require('muckraker');


const server = new Hapi.Server(Config.hapi);
const db = new Muckraker(Config.db);

if (process.env.NODE_ENV === 'production') {
  Config.connection.public.port = process.env.PORT;
}

server.connection(Config.connection.public);
server.bind({db});
exports.db = db;
exports.server=server.register( require( 'hapi-auth-jwt2' ) );
server.route(require('./routes'));

server.start();

 server.connections.forEach((connection) => {
    
        console.log(`${connection.info.uri}`);
    });