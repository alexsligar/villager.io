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
  '400':{
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
  name: Joi.string().optional().example('total not a robot'),
  username: Joi.string().required().example('seriously'),
  password: Joi.string().required().example('I am'),
  email: Joi.string().required().example('real@email'),
  role: Joi.any().valid("mod","user","admin"),
  bio: Joi.string().optional().example('I am a real person')
});
const private_user = Joi.object({
  id: Joi.string().guid().example(uuid()),
  name: Joi.string().optional().example('total not a robot'),
  username: Joi.string().required().example('seriously'),
  password: Joi.string().required().example('I am'),
  role: Joi.any().valid("mod","user","admin"),
  email: Joi.string().required().example('real@email'),
  bio: Joi.string().optional().example('I am a real person').allow(null)
});

const users = Joi.array().items(public_user).label('PublicUsers');

exports.user_response = Joi.object({
  data: public_user
}).label('UserResponse');

exports.users_response = Joi.object({
  data: users
}).unknown().label('UsersResponse');

const item = Joi.object({
  id: Joi.number().example(3),
  name: Joi.string().required().example("name name"),
  location: Joi.string().required().example("2710 Crimson Way, Richland, WA 99354"),
  type: Joi.any().valid("event","place","activity","group"),
  linked_group: Joi.string().optional().example('2'),
  linked_place: Joi.string().optional().example('1'),
  start_date: Joi.date().optional(),
  end_date: Joi.date().optional()
})
const items = Joi.array().items(item).label('items');

exports.users_response = Joi.object({
  data: item
}).unknown().label('ItemResponse');

exports.users_response = Joi.object({
  data: items
}).unknown().label('ItemsResponse');

const list = Joi.object({
  name: Joi.string().required().example('mon nom est'),
  description: Joi.string().required().example('description described descriptively')
});

const lists = Joi.array().items(list).label('lists');

exports.list_response = Joi.object({
  data: list
}).label('ListResponse');

exports.lists_response = Joi.object({
  data: lists
}).label('ListsResponse');

