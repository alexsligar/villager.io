'use strict';
const Controllers = require('keyfob').load({ path: './controllers', fn: require });

module.exports = [
//{ method: 'POST', path: '/login', config: Controllers.auth.login},
//{ method: 'POST', path: '/logout', config: Controllers.auth.logout},
//{ method: 'POST', path: '/user/available', config: Controllers.auth.login},

{ method: 'POST', path: '/auth/create_account', config: Controllers.auth.adduser},    

{ method: 'GET', path: '/items', config: Controllers.items.getitems},
{ method: 'POST', path: '/items', config: Controllers.items.additem},
{ method: 'PUT', path: '/items', config: Controllers.items.putitem},
//{ method: 'DELETE', path: '/items/{id}', config: Controllers.items.delitem},

{ method: 'GET', path: '/users', config: Controllers.users.getusers },
{ method: 'GET', path: '/users/{id}',config: Controllers.users.getuser},
{ method: 'GET', path: '/users/{id}/lists',config: Controllers.users.getuserslists},
{ method: 'GET', path: '/users/{id}/items',config: Controllers.users.getusersitems},
//{ method: 'PUT', path: '/users/{id}', config: Controllers.users.putuser},
//{ method: 'DELETE', path: '/users/{id}', config: Controllers.users.deluser},

{ method: 'GET', path: '/lists', config: Controllers.lists.getlists},
{ method: 'POST', path: '/lists', config: Controllers.lists.addlist},
{ method: 'PUT', path: '/lists/{id}', config: Controllers.lists.putlist},
{ method: 'GET', path: '/lists/{id}', config: Controllers.lists.getlistsbyid },
//{ method: 'DELETE', path: '/lists/{id}', config: Controllers.lists.dellist},

{ method: 'POST', path: '/listitems', config: Controllers.listitem.addlistitem},
//{ method: 'PUT', path: '/listitems', config: Controllers.listitem.putlistitem},
//{ method: 'DELETE', path: '/listitems/{id}', config: Controllers.listitem.dellistitem},
//{ method: 'GET', path: '/listitems/{id}', config: Controllers.listitem.getlistitem}
];