
    'use strict';
    
    const Joi = require('joi');
    const uuid = require('uuid').v4;
    
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

    const code_lookup = {
      '404': {
        description: 'Not found',
        schema: notFound
      },
      '409': {
        description: 'Conflict',
        schema: conflict
      }
    };
    
    exports.generate = (codes) => {
    
      const responses = {};
      if (!codes) {
        codes = ['401', '404', '409'];
      }
    
      codes.forEach((code) => {
    
        responses[code] = code_lookup[code];
      });
    
      return { responses };
    };
   
    const user = Joi.object({
      name: Joi.string(),
      username: Joi.string(),
      bio: Joi.string().allow(null),
      email: Joi.string().allow(null),
      password: Joi.string()
    }).label('user');
    
    const item =Joi.object({
      name: Joi.string(),
      location: Joi.string(),
      type: Joi.string(),
      linkedgroup: Joi.string(),
      linkedplace: Joi.string(),
      staredNum: Joi.number(),
      listNum: Joi.number()
    }).label('item');

    const list =Joi.object({
      name: Joi.string(),
      owner: Joi.string(),
      description: Joi.string(),
    }).label('list');

    const publicUser =Joi.object({
      name: Joi.string().example('Person McPerson'),
      username: Joi.string().example('zerocool').allow(null),
      bio: Joi.string().example('I am a person').allow(null)      
    }).label('publicUser');
    
   
 