'use strict';
const Controllers = require('keyfob').load({ path: './controllers', fn: require });

module.exports = [
  
{ method: 'GET', path: '/get_all_events', config: Controllers.getitems },
{ method: 'GET', path: '/get_all_users', config: Controllers.getusers },
{ method: 'GET', path: '/get_all_lists', config: Controllers.getlists },

{ method: 'POST', path: '/add_user', config: Controllers.adduser},
// { method: 'POST', path: '/add_list_item', config: Controllers.adduser},
{ method: 'POST', path: '/add_event', config: Controllers.adduser},
// { method: 'POST', path: '/add_', config: Controllers.adduser}

];