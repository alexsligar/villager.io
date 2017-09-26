'use strict';
const Controllers = require('keyfob').load({ path: './controllers', fn: require });

module.exports = [
  
{ method: 'GET', path: '/items', config: Controllers.getitems }
// { method: 'GET', path: '/users', config: Controllers.getusers },
// { method: 'GET', path: '/lists', config: Controllers.getlists }

];