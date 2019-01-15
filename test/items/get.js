'use strict';

const Fixtures = require('../fixtures');
const Faker = require('faker');

const Server = Fixtures.server;
const db = Fixtures.db;

const { after, before, describe, it } = exports.lab = require('lab').script();
const { expect } = require('code');


describe('GET /items/id', () => {

    let server;
    let place = Fixtures.place();
    let query;

    before(async () => {

        server = await Server;
        place = await db.items.insert(place);
        query = {
            method: 'GET',
            url: `/items/${place.id}`
        };
    });

    after(async () => {

        await db.items.destroy();
    });

    it('Get Item', async () => {

        const response = await server.inject(query);
        expect(response.statusCode).to.equal(200);
        expect(response.result.data.id).to.equal(place.id);
    });

    it('Get Item - Does not exist', async () => {

        const notExist = Faker.random.uuid();
        const newQuery = {
            method: 'GET',
            url: `/items/${notExist}`
        };
        const response = await server.inject(newQuery);
        expect(response.statusCode).to.equal(404);
    });
});
