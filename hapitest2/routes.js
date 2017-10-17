'use strict';
const Controllers = require('keyfob').load({ path: './controllers', fn: require });

module.exports = [
  

{ method: 'GET', path: '/items', config: Controllers.getitems},
{ method: 'POST', path: '/item', config: Controllers.additem},
{ method: 'PUT', path: '/item', config: Controllers.putitem},
{ method: 'GET', path: '/item/{id}', config: Controllers.getitems},
//{ method: 'DELETE', path: '/item/{id}', config: Controllers.delitem},

{ method: 'GET', path: '/users', config: Controllers.getusers },
{ method: 'POST', path: '/user', config: Controllers.adduser},    
{ method: 'GET', path: '/user/{id}',config: Controllers.getuser},
//{ method: 'GET', path: '/user/{id}/lists',config: Controllers.getuserlists},
//{ method: 'GET', path: '/user/{id}/items',config: Controllers.getuseritems},
//{ method: 'PUT', path: '/user/{id}', config: Controllers.putuser},
//{ method: 'DELETE', path: '/user/{id}', config: Controllers.deluser},

{ method: 'GET', path: '/lists', config: Controllers.getlists},
{ method: 'POST', path: '/list', config: Controllers.addlist},
{ method: 'PUT', path: '/list', config: Controllers.putlist},
{ method: 'GET', path: '/list/{id}', config: Controllers.getlistsbyid },
//{ method: 'DELETE', path: '/list/{id}', config: Controllers.dellist},

{ method: 'POST', path: '/listitem', config: Controllers.addlistitem},
{ method: 'PUT', path: '/listitem', config: Controllers.putlistitem},
//{ method: 'DELETE', path: '/listitem/{id}', config: Controllers.dellistitem},
//{ method: 'GET', path: '/listitem/{id}', config: Controllers.getlistitem}

];