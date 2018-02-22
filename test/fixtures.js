'use strict';

const Faker = require('faker');

// Ex
const Server = require('../server');
exports.server = Server.server;
exports.db = Server.db;


// Build and export a fake user
exports.user = function (attrs, id) {

    const defaults = {
        username: Faker.internet.userName(),
        firstName: Faker.name.firstName(),
        lastName: Faker.name.lastName(),
        email: Faker.internet.email()
    };

    if (id !== false) {
        defaults.id = Faker.random.uuid();
    }

    return Object.assign(defaults, attrs);
};

// Build and export a fake event
exports.event = function (attrs, id) {

    const defaults = {
        name: Faker.lorem.word(),
        location: Faker.address.streetAddress(),
        type: 'Event',
        start_date: Faker.date.past(),
        end_date: Faker.date.future()
    };

    return Object.assign(defaults, attrs);
};
