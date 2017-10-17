'use strict';
const Controllers = require('keyfob').load({ path: './controllers', fn: require });

module.exports = [
  

{ method: 'GET', path: '/items', config: Controllers.items.getitems},
{ method: 'POST', path: '/item', config: Controllers.items.additem},
{ method: 'PUT', path: '/item', config: Controllers.items.putitem},
{ method: 'GET', path: '/item/{id}', config: Controllers.items.getitems},
//{ method: 'DELETE', path: '/item/{id}', config: Controllers.items.delitem},

{ method: 'GET', path: '/users', config: Controllers.users.getusers },
{ method: 'POST', path: '/user', config: Controllers.users.adduser},    
{ method: 'GET', path: '/user/{id}',config: Controllers.users.getuser},
//{ method: 'GET', path: '/user/{id}/lists',config: Controllers.users.getuserlists},
//{ method: 'GET', path: '/user/{id}/items',config: Controllers.users.getuseritems},
//{ method: 'PUT', path: '/user/{id}', config: Controllers.users.putuser},
//{ method: 'DELETE', path: '/user/{id}', config: Controllers.users.deluser},

{ method: 'GET', path: '/lists', config: Controllers.lists.getlists},
{ method: 'POST', path: '/list', config: Controllers.lists.addlist},
{ method: 'PUT', path: '/list/{id}', config: Controllers.lists.putlist},
{ method: 'GET', path: '/list/{id}', config: Controllers.lists.getlistsbyid },
//{ method: 'DELETE', path: '/list/{id}', config: Controllers.lists.dellist},

{ method: 'POST', path: '/listitem', config: Controllers.listitem.addlistitem},
{ method: 'PUT', path: '/listitem', config: Controllers.listitem.putlistitem},
//{ method: 'DELETE', path: '/listitem/{id}', config: Controllers.listitem.dellistitem},
//{ method: 'GET', path: '/listitem/{id}', config: Controllers.listitem.getlistitem}

];