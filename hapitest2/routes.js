'use strict';
const Controllers = require('keyfob').load({ path: './controllers', fn: require });

module.exports = [
//Authentication    
//{ method: 'POST', path: '/login', config: Controllers.auth.login},
//{ method: 'POST', path: '/logout', config: Controllers.auth.logout},
{ method: 'POST', path: '/create_account', config: Controllers.auth.adduser},    

//items
{ method: 'GET', path: '/items', config: Controllers.items.getitems},//for testing
//{ method: 'GET', path: '/items/{id}', config: Controllers.items.getitem},

//users
{ method: 'GET', path: '/users', config: Controllers.users.getusers }, //for testing
{ method: 'GET', path: '/users/{id}',config: Controllers.users.getuser},
//{ method: 'PUT', path: '/users/{id}', config: Controllers.users.putuser},
//{ method: 'DELETE', path: '/users/{id}', config: Controllers.users.deluser},
{ method: 'GET', path: '/users/{username}/lists',config: Controllers.users.getuserslists},
{ method: 'POST', path: '/users/{id}/lists', config: Controllers.users.addlist},
{ method: 'PUT', path: '/users/{id}/lists/{listid}', config: Controllers.users.putlist},
//{ method: 'DELETE', path: '/users/{id}/lists/{listid}', config: Controllers.users.dellist},
{ method: 'GET', path: '/users/{username}/items',config: Controllers.users.getusersitems},
{ method: 'POST', path: '/users/{id}/items', config: Controllers.users.additem},
{ method: 'PUT', path: '/users/{id}/items/{itemid}', config: Controllers.users.putitem},
//{ method: 'DELETE', path: '/users/{id}/items/{itemid}', config: Controllers.users.delitem},

//lists
{ method: 'GET', path: '/lists/{id}', config: Controllers.lists.getlistsbyid },
{ method: 'GET', path: '/lists', config: Controllers.lists.getlists}, //for testing
];