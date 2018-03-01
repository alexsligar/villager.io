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
        name: Faker.name.firstName(),
        email: Faker.internet.email(),
        password: Faker.internet.password()
    };

    return Object.assign(defaults, attrs);
};

// Build and export a fake event
exports.event = function (attrs, id) {

    const defaults = {
        name: Faker.lorem.word(),
        location: Faker.address.streetAddress(),
        type: 'event',
        start_date: Faker.date.past(),
        end_date: Faker.date.future()
    };
    return Object.assign(defaults, attrs);
};

// Build and export a fake activity
exports.activity = function (attrs, id) {

    const defaults = {
        name: Faker.lorem.word(),
        location: Faker.address.streetAddress(),
        type: 'activity',
        start_date: Faker.date.past(),
        end_date: Faker.date.future()
    };
    return Object.assign(defaults, attrs);
};

// Build and export a fake place
exports.place = function (attrs, id) {

    const defaults = {
        name: Faker.lorem.word(),
        location: Faker.address.streetAddress(),
        type: 'place',
        start_date: Faker.date.past(),
        end_date: Faker.date.future()
    };
    return Object.assign(defaults, attrs);
};
// Build and export a fake group
exports.group = function (attrs, id) {

    const defaults = {
        name: Faker.lorem.word(),
        location: Faker.address.streetAddress(),
        type: 'group'
    };
    return Object.assign(defaults, attrs);
};

// Build and export a fake list
exports.list = function (attrs, id) {

    const defaults = {
        name: Faker.lorem.word(),
        description: Faker.lorem.words()
    };
    return Object.assign(defaults, attrs);
};

// Build and export a fake tag
exports.tag = function (attrs, id) {

    const defaults = {
        name: Faker.lorem.word()
    };
    return Object.assign(defaults, attrs);
};

