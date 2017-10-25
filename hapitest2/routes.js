'use strict';
const Controllers = require('keyfob').load({ path: './controllers', fn: require });

module.exports = [
//Authentication    
    //{ method: 'POST', path: '/login', config: Controllers.auth.login},
    //{ method: 'POST', path: '/logout', config: Controllers.auth.logout},
{ method: 'POST', path: '/create_account', config: Controllers.auth.adduser},    

//items
{ method: 'GET', path: '/items', config: Controllers.items.getitems},//for testing
    
//users
{ method: 'GET', path: '/users', config: Controllers.users.getusers }, //for testing
{ method: 'GET', path: '/users/{id}',config: Controllers.users.getuser},
{ method: 'GET', path: '/users/{username}/lists',config: Controllers.users.getuserslists},
{ method: 'POST', path: '/users/{id}/lists', config: Controllers.users.addlist},
{ method: 'POST', path: '/users/{id}/items', config: Controllers.users.additem},


//lists
{ method: 'GET', path: '/lists/{id}', config: Controllers.lists.getlistsbyid },
{ method: 'GET', path: '/lists', config: Controllers.lists.getlists}, //for testing
{ method: 'POST', path: '/lists/{id}/listitems', config: Controllers.listitems.addlistitem},

];