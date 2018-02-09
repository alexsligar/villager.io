'use strict';
const Controllers = require('keyfob').load({ path: './controllers', fn: require });

module.exports = [
    //admin
    { method: 'PUT', path: '/admin/{username}/role', config: Controllers.admin.updaterole },
    { method: 'GET', path: '/users', config: Controllers.admin.getusers }, //for testing
    
    //Authentication    
    { method: 'POST', path: '/create_account', config: Controllers.auth.adduser },
    { method: 'POST', path: '/login', config: Controllers.auth.login },
    { method: 'GET', path: '/logout', config: Controllers.auth.logout },

    //mod
    { method: 'POST', path: '/merge', config: Controllers.admin.mergeitems },
    
    //tags
    { method: 'POST', path: '/tags', config: Controllers.tags.create },
    { method: 'DELETE', path: '/tags', config: Controllers.tags.destroy },
    

    //items
    { method: 'GET', path: '/items', config: Controllers.items.list },
    { method: 'GET', path: '/items/days/{days}', config: Controllers.items.getbydate },
    { method: 'GET', path: '/items/{id}', config: Controllers.items.get },
    { method: 'POST', path: '/items', config: Controllers.items.create },
    { method: 'PUT', path: '/items/{id}', config: Controllers.items.update },
    { method: 'DELETE', path: '/items/{id}', config: Controllers.items.destroy },

    //item_owners
    { method: 'GET', path: '/item_owners', config: Controllers.itemowners.list },
    { method: 'GET', path: '/item_owners/{id}', config: Controllers.itemowners.get },
    { method: 'POST', path: '/item_owners', config: Controllers.itemowners.create },
    { method: 'DELETE', path: '/item_owners/{id}', config: Controllers.itemowners.destroy },
    
    //users
    { method: 'GET', path: '/users/{username}', config: Controllers.users.get },
    { method: 'GET', path: '/users/{username}/favorites', config: Controllers.users.get_favorites },    
    { method: 'GET', path: '/users/{username}/lists', config: Controllers.users.get_lists },
    { method: 'PUT', path: '/users/{id}', config: Controllers.users.update },
    { method: 'DELETE', path: '/users/{id}', config: Controllers.users.destroy },
    
    //lists
    { method: 'GET', path: '/lists/{id}', config: Controllers.lists.get },
    { method: 'GET', path: '/lists', config: Controllers.lists.list },
    { method: 'POST', path: '/lists', config: Controllers.lists.create },   
    { method: 'PUT', path: '/lists/{id}', config: Controllers.lists.update },

    //list items 
    { method: 'POST', path: '/lists/listitems', config: Controllers.listitems.create },
    { method: 'DELETE', path: '/lists/listitems', config: Controllers.listitems.destroy }


];