'use strict';

const Config = require('getconfig');
const Hapi = require('hapi');
const Muckraker = require('muckraker');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pkg = require('./package.json');


const server = new Hapi.Server(Config.hapi);
const db = new Muckraker(Config.db);

if (process.env.NODE_ENV === 'production') {
  Config.connection.public.port = process.env.PORT;
}

server.connection(Config.connection.public);
server.bind({db});
exports.db = db;
///exports.server=server.register( require( 'hapi-auth-jwt2' ) );
exports.server = server.register([
  Inert,
  Vision,
   {
  'register': require('hapi-swagger'),
  'options': {
    grouping: 'tags',
      info: {
      title: Pkg.description,
      version: Pkg.version,
      license: {
        name: Pkg.license
      }
    },
    tags: [
      { name: 'public', description: 'Routes that do not require authentication' }
    ]
  }
}, {
  register: require('hapi-auth-jwt2')
}])
server.route(require('./routes'));

server.start();

 server.connections.forEach((connection) => {
    
        console.log(`${connection.info.uri}`);
    });