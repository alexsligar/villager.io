'use strict';

const Fixtures = require('../fixtures');
const Server = Fixtures.server;
const db = Fixtures.db;

const { after, before, describe, it } = exports.lab = require('lab').script();
const { expect } = require('code');


describe('GET /items/id', () => {

    let server;
    const event = Fixtures.event();
    let newEvent;

    before(async () => {

        server = await Server;

        newEvent = await Promise.all([
            db.items.insert(event)
        ]);
    });

    after(async () => {

        await Promise.all([
            db.items.destroy({ id: newEvent[0].id })
        ]);
    });

    it('Get Item', async () => {

        const query = {
            method: 'GET',
            url:    `/items/${newEvent[0].id}`
        };
        const response = await server.inject(query);
        expect(response.statusCode).to.equal(200);
    });

    it('Get Item - Does not exist', async () => {

        const notExist = newEvent[0].id + 100;

        const query = {
            method: 'GET',
            url: `/items/${notExist}`
        };
        const response = await server.inject(query);
        expect(response.statusCode).to.equal(404);
    });
});
