'use strict';

const Joi = require('joi');
const uuid = require('uuid').v4;
const badrequest = Joi.object({
  statusCode: Joi.number().valid(400).required(),
  error: Joi.string().valid('Bad Request').required(),
  message: Joi.string().example('Bad Request')
}).label('Error');

const unauthorized = Joi.object({
  statusCode: Joi.number().valid(401).required(),
  error: Joi.string().valid('Unauthorized').required(),
  message: Joi.string().example('Missing authentication')
}).label('Error');

const precondition = Joi.object({
  statusCode: Joi.number().valid(412).required(),
  error: Joi.string().valid('Precondition Failed').required(),
  message: Joi.string().example('You do not have permission to view this item')
}).label('Error');

const notFound = Joi.object({
  statusCode: Joi.number().valid(404).required(),
  error: Joi.string().valid('Not Found').required(),
  message: Joi.string().example('That item does not exist')
}).label('Error');

const conflict = Joi.object({
  statusCode: Joi.number().valid(409).required(),
  error: Joi.string().valid('Conflict').required(),
  message: Joi.string().example('Item you are trying to create already exists')
}).label('Error');

const deprecated = Joi.object({
  statusCode: Joi.number().valid(410).required(),
  error: Joi.string().valid('Gone').required(),
  message: Joi.string().example('The client you are using is out of date, please update')
}).label('Error');

const code_lookup = {
  '400': {
    description: 'Bad Request',
    schema: badrequest
  },
  '401': {
    description: 'Missing or invalid authorization',
    schema: unauthorized
  },
  '412': {
    description: 'Invalid permissions',
    schema: precondition
  },
  '404': {
    description: 'Not found',
    schema: notFound
  },
  '409': {
    description: 'Conflict',
    schema: conflict
  },
  '410': {
    description: 'Gone',
    schema: deprecated
  }
};

exports.generate = (codes) => {

  const responses = {};
  if (!codes) {
    codes = ['401', '404', '409', '400'];
  }

  codes.forEach((code) => {

    responses[code] = code_lookup[code];
  });

  return { responses };
};

const public_user = Joi.object({
  name: Joi.string().optional().example('totally not a robot'),
  username: Joi.string().required().example('seriously'),
  email: Joi.string().required().example('real@email'),
  role: Joi.any().valid("mod", "user", "admin"),
  bio: Joi.string().optional().example('I am a real person')
});
const private_user = Joi.object({
  id: Joi.string().guid().example(uuid()),
  name: Joi.string().optional().example('totally not a robot'),
  username: Joi.string().required().example('seriously'),
  password: Joi.string().required().example('I am'),
  role: Joi.any().valid("mod", "user", "admin"),
  email: Joi.string().required().example('real@email'),
  bio: Joi.string().optional().example('I am a real person').allow(null),
  logout: Joi.date().optional().allow(null),
  created_at: Joi.date().optional().allow(null),
  updated_at: Joi.date().optional().allow(null),
});

const users = Joi.array().items(public_user).label('PublicUsers');
const private_users = Joi.array().items(private_user).label('PublicUsers');
exports.user_response = Joi.object({
  data: public_user
}).label('UserResponse');

exports.users_response = Joi.object({
  data: users
}).unknown().label('UsersResponse');

exports.private_response = Joi.object({
  data: private_user
}).unknown().label('PrivateResponse');

exports.private_users_response = Joi.object({
  data: private_users
}).unknown().label('PrivateResponse');

const item = Joi.object({
  id: Joi.number().example(3),
  name: Joi.string().required().example("name name"),
  location: Joi.string().optional().example("2710 Crimson Way, Richland, WA 99354"),
  type: Joi.any().valid("event", "place", "activity", "group"),
  linked_group: Joi.number().optional().example(2).allow(null),
  linked_place: Joi.number().optional().example(2).allow(null),
  start_date: Joi.date().optional().allow(null),
  end_date: Joi.date().optional().allow(null),
  starred_number: Joi.number().optional(),
  list_number: Joi.number().optional()
})
const additems = Joi.array().items(item).label('items');
exports.additem = {
  name: Joi.string().required(),
  location: Joi.string().required(),
  type: Joi.any().valid("activity", "place", "event", "group"),
  linked_group: Joi.number().optional(),
  linked_place: Joi.number().optional(),
  start_date: Joi.date().optional(),
  end_date: Joi.date().optional()
}
const items = Joi.array().items(item).label('lists');

exports.item_response = Joi.object({
  data: item
}).unknown().label('ItemResponse');

exports.items_response = Joi.object({
  data: items
}).unknown().label('ItemsResponse');

const list = Joi.object({
  id: Joi.string().guid().example(uuid()),
  name: Joi.string().required().example('mon nom est'),
  description: Joi.string().required().example('description described descriptively').allow(null)
});

const lists = Joi.array().items(list).label('lists');

exports.list_response = Joi.object({
  data: list
}).label('ListResponse');

exports.lists_response = Joi.object({
  data: lists
}).label('ListsResponse');


exports.login_response = Joi.object({
  data: { token: [Joi.string(), Joi.number()] }
}).unknown().label('loginResponse')

const list_items = Joi.array().items(item).label('listItems')

//const favorite_list = Joi.array().items(item).label('favoriteList');

exports.get_user_response = Joi.object({
  data: { user: public_user, favorite_list: list_items }
})
exports.favorite_list_response = Joi.object({
  data: list_items
})
exports.list_items_response = Joi.object({
  data: list_items
})